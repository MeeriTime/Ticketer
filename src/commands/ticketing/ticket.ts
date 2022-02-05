import type { RowDataPacket } from 'mysql2';
import { SlashCommandBuilder } from '@discordjs/builders';
import { conn, handleTicketCreation } from '../../utils';
import type { Command, Tables } from '../../types';

const command: Command = {
	category: 'Ticketing',
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Creates a support ticket')
		.addStringOption((option) => {
			const choices = config.map((ticket) => ticket.ticketName);
			const opt = option
				.setName('grund')
				.setDescription('Um was geht es in dem Ticket')
				.setRequired(true);

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
			if (record.RoleID === '0') {
				return interaction.reply({
					content: 'Missing the managers, please add them via ticket-config',
					ephemeral: true
				});
			}

			const subject = interaction.options.getString('subject')!;
			const managers = await interaction.guild!.roles.fetch(record.RoleID);

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
