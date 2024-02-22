import Core, { if_statement } from '../../../../library/core';
import HudElement, { Font, Point } from '../../../../library/hud_element';

const wolfcounter_title = new HudElement({
	name: 'wolf_counter_title',
	font: new Font('objective', 2),
	point: new Point('center', 'center', -220, -200),
	text: `"^8Wolf Counter"`
});
const wolfcounter_one = new HudElement({
	name: 'wolf_counter_one',
	font: Font.default(),
	point: new Point('center', 'center', -220, -185),
	type: 'number',
	value: 0,
	label: 'Wolf 1: '
});
const wolfcounter_two = new HudElement({
	name: 'wolf_counter_two',
	font: Font.default(),
	point: new Point('center', 'center', -220, -170),
	type: 'number',
	value: 0,
	label: 'Wolf 2: '
});
const wolfcounter_three = new HudElement({
	name: 'wolf_counter_three',
	font: Font.default(),
	point: new Point('center', 'center', -220, -155),
	type: 'number',
	value: 6,
	label: 'Wolf 3: '
});

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

export const init_functions = [
	wolfcounter_title.init(),
	wolfcounter_one.init(),
	wolfcounter_two.init(),
	wolfcounter_three.init()
];

export const update_functions = [
	if_statement(
		[
			`isdefined(level.soul_catchers[0])`
		],
		[
			wolfcounter_one.update(`6 - level.soul_catchers[0].souls_received`),
			wolfcounter_two.update(`6 - level.soul_catchers[1].souls_received`),
			wolfcounter_three.update(`6 - level.soul_catchers[2].souls_received`)
		]
	)
];
