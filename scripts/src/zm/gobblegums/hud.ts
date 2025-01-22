import Core from '../../../../library/core';
import HudElement, { Font, Point } from '../../../../library/hud_element';

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

const gobblegum_hud_title = new HudElement({
	name: 'gg_hud_title',
	font: Font.default(),
	point: new Point('center', 'center', -300, 100),
	type: 'string',
	text: `"^1Aim + f to use gobblegum"`
});
export const gobblegum_hud_description = new HudElement({
	name: 'gg_hud_description',
	font: new Font('objective', 1),
	point: new Point('center', 'center', -300, 130),
	type: 'string',
	text: `"You don't have a gobblegum."`
});

export const init_functions = [
	Core.log(`"Init title"`),
	gobblegum_hud_title.init(),
	Core.log(`"Init desc"`),
	gobblegum_hud_description.init(),
	gobblegum_hud_title.setAlpha(0.5),
	gobblegum_hud_description.setAlpha(0.5)
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

			Core.wait("duration"),
			gobblegum_hud_title.update(`"^1Aim + f to use gobblegum"`),
			gobblegum_hud_description.update(`"You don't have a gobblegum."`),
			gobblegum_hud_title.setAlpha(0.5),
			gobblegum_hud_description.setAlpha(0.5)

		]
	}
];
