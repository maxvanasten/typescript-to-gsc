import HudElement, { Font, Point } from '../../../../library/hud_element';
import { if_statement } from '../../../../library/core';

const hud_element = new HudElement({
	name: 'health_counter',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', 0, 225)
});

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

export const init_functions = [
	hud_element.init()
];

export const update_functions = [
	if_statement(
		[
			`self.health < 50`
		],
		[
			hud_element.update(`"Health: ^1"+self.health`)
		],
		[
			hud_element.update(`"Health: ^5"+self.health`)
		]
	)
];
