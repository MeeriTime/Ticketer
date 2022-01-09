import type { OtherTicketConfig } from './types';

const config: OtherTicketConfig.OtherConfig = [
	{
		ticketName: 'Support',
		roleId: process.env.ROLE_ID_1
	},
	{
		ticketName: 'Bewerbung',
		roleId: process.env.ROLE_ID_2
	},
	{
		ticketName: 'Entwicklung',
		roleId: process.env.ROLE_ID_3
	},
	{
		ticketName: 'Spende',
		roleId: process.env.ROLE_ID_4
	},
	{
		ticketName: 'Shop',
		roleId: process.env.ROLE_ID_5
	},
	{
		ticketName: 'Fraktion',
		roleId: process.env.ROLE_ID_6
	}
];

export default config;
