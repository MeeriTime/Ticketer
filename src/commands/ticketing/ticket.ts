import type { RowDataPacket } from 'mysql2';
import { SlashCommandBuilder } from '@discordjs/builders';
import { conn, handleTicketCreation } from '../../utils';
import type { Command, Tables } from '../../types';
import config from '../../otherTicketConfig';

const command: Command = {
	category: 'Ticketing',
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Creates a support ticket')
		.addStringOption((option) => {
			const opt = option
				.setName('grund')
				.setDescription('Um was geht es in dem Ticket')
				.setRequired(true);

			const choices = config.map((ticket) => ticket.ticketName);
			choices.forEach((choice) => opt.addChoice(choice, choice));

			return opt;
		}),
	execute: async ({ interaction }) => {
		try {
			if (!interaction.channel!.isText()) {
				return interaction.reply({
					content: 'You must use this command in a valid text channel',
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

			if (!record) {
				return interaction.reply({
					content: 'I am missing the config for tickets',
					ephemeral: true
				});
			}

			const subject = interaction.options.getString('grund')!;
			const role = config.find((conf) => conf.ticketName === subject)!;
			const managers = await interaction.guild!.roles.fetch(role.roleId);

			if (!managers) {
				return interaction.reply({
					content: 'No manager role could be found',
					ephemeral: true
				});
			}

			handleTicketCreation(interaction, managers, record, subject);
		} catch (err) {
			console.error(err);
		}
	}
};

export default command;
