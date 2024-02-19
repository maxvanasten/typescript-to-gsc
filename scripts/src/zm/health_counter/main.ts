import HudElement, { Font, Point } from '../../../../library/hud_element';
import Core, { if_statement } from '../../../../library/core';

const hud_element = new HudElement({
	name: 'health_counter',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', 0, 200),
	type: 'number',
	label: 'Health: ^6',
	value: 0
});

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

export const init_functions = [
	hud_element.init()
];

export const custom_functions = [
	{
		name: 'update_hud_health_counter',
		lines: [
			hud_element.update(`self.health`),
			Core.wait(0.5)
		]
	}
];

export const update_functions = [
	Core.thread_custom_function('update_hud_health_counter')
];
