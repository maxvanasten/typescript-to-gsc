import Core, { if_statement, while_loop } from '../../../../library/core';
import Player from '../../../../library/player';
import Level from '../../../../library/level';
import Perks from '../../../../library/lists/perks';

export type Gobblegum = {
	name: string;
	identifier: string;
	description: string;
	activations: number;
	activate_function: {
		name: string;
		arguments: string[];
		lines: string[][];
	};
};

export const gobblegums: Gobblegum[] = [
	{
		name: 'In plain sight',
		identifier: 'ips',
		description: 'Zombies ignore the player for 10 seconds upon use.',
		activations: 2,
		activate_function: {
			name: 'gg_ips',
			arguments: [],
			lines: [
				Player.i_print_ln_bold(`"^5ACTIVATE"`),
				Core.wait(10),
				Player.i_print_ln_bold(`"^1DEACTIVATE"`)
			]
		}
	}
];
