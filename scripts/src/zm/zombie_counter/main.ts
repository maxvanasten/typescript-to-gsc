import HudElement, { Font, Point } from '../../../../library/hud_element';
import Core, { if_statement } from '../../../../library/core';
import Player from '../../../../library/player';

const hud_element = new HudElement({
	name: 'zombie_counter',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', 0, 215),
	type: 'number',
	label: 'Zombies: ^1',
	value: 0
});

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util',
	'maps\\mp\\zombies\\_zm_utility'
];

export const init_functions = [
	hud_element.init()
];

export const custom_functions = [
	{
		name: 'update_hud_zombie_counter',
		lines: [
			hud_element.update(`self.zombies_left`),
			Core.wait(0.5)
		]
	}
];

export const update_functions = [
	Player.setValue('zombies_left', `level.zombie_total + get_current_zombie_count()`),
	Core.thread_custom_function('update_hud_zombie_counter')
];
