import Core, { if_statement, switch_statement, while_loop } from '../../../../library/core';
import Player from '../../../../library/player';
import Level from '../../../../library/level';
import Perks from '../../../../library/lists/perks';
import HudElement, { Font, Point } from '../../../../library/hud_element';

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

const gobblegum_hud_title = new HudElement({
	name: 'gg_hud_title',
	font: Font.default(),
	point: new Point('center', 'center', -200, -50),
	type: 'string',
	text: `"^1Aim + f to use gobblegum"`
});
const gobblegum_hud_description = new HudElement({
	name: 'gg_hud_description',
	font: new Font('objective', 1),
	point: new Point('center', 'center', -200, -20),
	type: 'string',
	text: `"-"`
});

export const init_functions = [
	gobblegum_hud_title.init(),
	gobblegum_hud_description.init(),
	gobblegum_hud_title.setAlpha(0.5),
	gobblegum_hud_description.setAlpha(0)
];

export const custom_functions = [
	{
		name: 'hud_activation',
		arguments: [
			'title',
			'description',
			'duration'
		],
		lines: [
			gobblegum_hud_title.update(`title`),
			gobblegum_hud_description.update(`description`),
			gobblegum_hud_title.setAlpha(0.8),
			gobblegum_hud_description.setAlpha(0.5),

			Core.raw(`wait duration`),
			gobblegum_hud_title.setAlpha(0),
			gobblegum_hud_description.setAlpha(0)
		]
	}
];

export const update_functions = [];
