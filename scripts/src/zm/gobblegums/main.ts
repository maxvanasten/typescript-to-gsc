import Core, { if_statement, switch_statement, while_loop } from '../../../../library/core';
import Player from '../../../../library/player';
import Level from '../../../../library/level';
import Perks from '../../../../library/lists/perks';

import { gobblegums, Gobblegum } from './gums';

const custom_functions_r = [
	{
		name: 'player_load_gobblegum',
		arguments: [
			'index'
		],
		lines: [
			Player.set_value('current_gobblegum_index', `index`),
			Player.set_value(`gobblegum_activations`, `level.gobblegums[self.current_gobblegum_index].activations`)
		]
	},
	{
		name: 'activation_monitor',
		lines: [
			while_loop(
				[
					`true`
				],
				[
					if_statement(
						[
							`self adsbuttonpressed()`,
							`self usebuttonpressed()`
						],
						[
							Player.i_print_ln_bold(`"^6Activating gobblegum: ips"`),
							Core.raw(`self activate_gobblegum("ips")`),
							Core.wait(3)
						]
					)
				]
			)
		]
	},
	{
		name: 'activate_gobblegum',
		arguments: [
			'gobblegum_identifier'
		],
		lines: [
			switch_statement(
				`self.current_gobblegum_identifier`,
				[
					{
						case: 'ips',
						do: [
							Core.raw(`self gpp_custom_gg_ips()`)
						]
					}
				],
				[]
			)
		]
	}
];

gobblegums.forEach((gobblegum) => {
	custom_functions_r.push(gobblegum.activate_function);
});

export const init_functions: string[][] = [];

export const update_functions: string[][] = [];

export const custom_functions = custom_functions_r;
