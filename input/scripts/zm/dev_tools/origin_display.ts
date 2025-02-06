import HudElement, { Font, HudOptions, Point } from '../../../../library/hud_element';
import Player from '../../../../library/player';
import Core from '../../../../library/core';

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

const hud_x = new HudElement({
	name: 'origin_x',
	type: 'number',
	point: new Point('center', 'center', 200, 50),
	font: Font.default(),
	label: '^5origin[0]: ^7'
});
const hud_y = new HudElement({
	font: Font.default(),
	type: 'number',
	point: new Point('center', 'center', 200, 65),
	name: 'origin_y',
	label: '^5origin[1]: ^7'
});
const hud_z = new HudElement({
	font: Font.default(),
	name: 'origin_z',
	point: new Point('center', 'center', 200, 80),
	type: 'number',
	label: '^5origin[2]: ^7'
});
const hud_weapon = new HudElement({
	font: Font.default(),
	name: 'weapon',
	point: new Point('center', 'center', 200, 95),
	type: 'string'
});
const hud_map = new HudElement({
	font: Font.default(),
	name: 'map',
	point: new Point('center', 'center', 200, 110),
	type: 'string',
	text: `"^5map_name: ^7"+${Core.map_name}`
});

export const init_functions = [
	hud_x.init(),
	hud_y.init(),
	hud_z.init(),
	hud_weapon.init(),
	hud_map.init()
];

export const update_functions = [
	hud_x.update(`${Player.origin}[0]`),
	hud_y.update(`${Player.origin}[1]`),
	hud_z.update(`${Player.origin}[2]`),
	hud_weapon.update(`"^5weapon_name: ^7"+${Player.current_weapon}`)
];
