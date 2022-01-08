import type { RowDataPacket } from 'mysql2';
import {
	channelMention,
	memberNicknameMention,
	SlashCommandBuilder
} from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { version } from '../../../package.json';
import { conn } from '../../utils';
import type { Command, Tables } from '../../types';

const command: Command = {
	category: 'Ticketing',
	data: new SlashCommandBuilder()
		.setName('archive')
		.setDescription('Archives the support ticket'),
	execute: async ({ interaction }) => {
		try {
			if (!interaction.channel!.isThread()) {
				return interaction.reply({
					content:
						'You can only use this command in a support ticket which uses threads',
					ephemeral: true
				});
			}
			if (
				!interaction.guild!.me!.permissions.has([
					'MANAGE_THREADS',
					'SEND_MESSAGES_IN_THREADS'
				])
			) {
				return interaction.reply({
					content:
						'I need the manage threads and send messages in threads permission to run this command',
					ephemeral: true
				});
			}

			const [rows] = await conn.execute(
				'SELECT * FROM TicketingManagers WHERE GuildID = ?',
				[interaction.guildId]
			);
			const record = (
				rows as RowDataPacket[]
			)[0] as Tables.TicketingManagers | null;

			if (!record || record.RoleID === '0') {
				return interaction.reply({
					content:
						'No ticketing config or available managers role could be found, cannot archive ticket',
					ephemeral: true
				});
			}

			if (
				interaction.channel.parentId === record.SupportChannel ||
				(interaction.channel.parent!.name.toLowerCase() === 'support' &&
					record.SupportChannel === '0')
			) {
				const managers = await interaction.guild!.roles.fetch(record.RoleID);
				const name = `Ticket-${interaction.user.username}`;

				if (
					name !== interaction.channel.name &&
					!managers?.members.has(interaction.user.id)
				) {
					return interaction.reply({
						content:
							'You may not archive this thread, you are not the original author nor a manager',
						ephemeral: true
					});
				}

				const embed = new MessageEmbed()
					.setColor('YELLOW')
					.setAuthor({
						name: interaction.user.tag,
						iconURL: interaction.user.displayAvatarURL({ dynamic: true })
					})
					.setTitle('Ticket Archived')
					.setDescription(
						`${memberNicknameMention(
							interaction.user.id
						)} archived the support ticket`
					)
					.setTimestamp()
					.setFooter({ text: `Version ${version}` });

				await interaction.reply({ embeds: [embed] });
				interaction.channel!.setArchived(true);

				if (record.LogsChannel !== '0') {
					embed.setDescription(
						`${memberNicknameMention(
							interaction.user.id
						)} archived a ticket! View it at ${channelMention(
							interaction.channelId
						)}`
					);
					embed.addField('Name of Ticket', interaction.channel.name);

					const logsChannel = await interaction.guild!.channels.fetch(
						record.LogsChannel
					);

					if (!logsChannel?.isText()) return;
					if (
						!logsChannel
							.permissionsFor(interaction.guild!.me!)
							.has(['SEND_MESSAGES'])
					)
						return;

					logsChannel.send({ embeds: [embed] });
				}
			} else {
				return interaction.reply({
					content: 'You may only close support tickets',
					ephemeral: true
				});
			}
		} catch (err) {
			console.error(err);
		}
	}
};

export default command;
