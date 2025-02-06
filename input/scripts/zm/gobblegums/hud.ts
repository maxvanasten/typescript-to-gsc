import Core, { if_statement } from '../../../../library/core';
import HudElement, { Font, Point } from '../../../../library/hud_element';

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

const hud_x = -225;
const hud_y = -205;

export const gobblegum_hud = new HudElement({
	name: 'gg_hud',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', hud_x, hud_y + 45),
	type: 'string',
	text: `"^6No gobblegum"`
})

export const init_functions = [
	gobblegum_hud.init(),
];

export const custom_functions = [
	{
		name: 'hud_activation',
		arguments: [
			'text',
			'duration',
			'empty'
		],
		lines: [
			Core.set_local_variable('current_text', `self.gpp_ui_gg_hud.stored_text`),
			gobblegum_hud.update(`"^6" + text`),
			Core.wait("duration"),
			if_statement(
				['empty'],
				[
					gobblegum_hud.update(`"^6No gobblegum"`),
				],
				[
					gobblegum_hud.update(`current_text`),
				]
			),
		]
	}
];
