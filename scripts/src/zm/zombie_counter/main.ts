import HudElement, { Font, Point } from '../../../../library/hud_element';
import { if_statement } from '../../../../library/core';
import Player from '../../../../library/player';

const hud_element = new HudElement({
	name: 'zombie_counter',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', 0, 240)
});

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util',
	'maps\\mp\\zombies\\_zm_utility'
];

export const init_functions = [
	hud_element.init()
];

export const update_functions = [
	Player.setValue('zombies_left', `level.zombie_total + get_current_zombie_count()`),
	if_statement(
		[
			`self.zombies_left <= 3`
		],
		[
			hud_element.update(`"Zombies: ^1"+self.zombies_left`)
		],
		[
			hud_element.update(`"Zombies: ^5"+self.zombies_left`)
		]
	)
];
