import type { Snowflake } from 'discord.js';

export interface Base {
	ticketName:
		| 'Support'
		| 'Bewerbung'
		| 'Entwicklung'
		| 'Spende'
		| 'Shop'
		| 'Fraktion';
	roleId: Snowflake;
}

export type OtherConfig = Base[];
