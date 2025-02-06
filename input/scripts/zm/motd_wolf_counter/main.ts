import Core, { if_statement } from '../../../../library/core';
import HudElement, { Font, Point } from '../../../../library/hud_element';

const wolfcounter_title = new HudElement({
	name: 'wolf_counter_title',
	font: new Font('objective', 2),
	point: new Point('center', 'center', -220, -200),
	text: `"^8Wolf Counter"`
});

let init_functions_r = [
	wolfcounter_title.init()
];

let update_functions_r: string[][] = [];

let wolf_counters: HudElement[] = [];
for (let i = 0; i < 3; i++) {
	let wolf_counter = new HudElement({
		name: `wolf_counter_${i}`,
		font: Font.default(),
		point: new Point('center', 'center', -220, -185 + i * 15),
		type: 'number',
		value: 6,
		label: `Wolf ${i + 1}: `
	});

	wolf_counters.push(wolf_counter);

	init_functions_r.push(wolf_counter.init());
	update_functions_r.push(wolf_counter.update(`6 - level.soul_catchers[${i}].souls_received`));
}

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

export const init_functions = init_functions_r;
export const update_functions = update_functions_r;
