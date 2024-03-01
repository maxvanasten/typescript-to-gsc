import Core, { if_statement, switch_statement, while_loop } from '../../../../library/core';
import Player from '../../../../library/player';
import Level from '../../../../library/level';
import Perks from '../../../../library/lists/perks';

import { gobblegums } from './gums';

const custom_functions_r: { name: string; arguments?: string[]; lines: string[][] }[] = [];

gobblegums.forEach((gobblegum) => {
	custom_functions_r.push(gobblegum.activate_function);
});

export const init_functions: string[][] = [
	Player.set_value('gobblegum_cooldown', 0),
	Player.set_value('gobblegum_identifier', `"ips"`)
];

export const update_functions: string[][] = [
	if_statement(
		[
			`self.gobblegum_cooldown <= 0`,
			`self.gobblegum_identifier != "none"`
		],
		[
			if_statement(
				[
					`self adsbuttonpressed()`,
					`self usebuttonpressed()`
				],
				[
					switch_statement(
						'self.gobblegum_identifier',
						[
							{
								case: `"ips"`,
								do: [
									Core.raw(`self thread hud_activation("In plain sight!", "Zombies ignore the player for 10 seconds.", 10)`),
									Core.raw(`self thread gg_ips()`)
								]
							}
						],
						[]
					)
				]
			)
		],
		[
			Player.increment_value('gobblegum_cooldown', -0.05)
		]
	)
];

export const custom_functions = custom_functions_r;
