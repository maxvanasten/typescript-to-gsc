import Core, { if_statement } from '../../../../../library/core';
import HudElement, { Font, Point } from '../../../../../library/hud_element';
import { kills_per_promotion } from './main';

const hud_x = -225;
const hud_y = -200;

const hud_total_kills = new HudElement({
	name: 'osc_hud_total_kills',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', hud_x, hud_y),
	text: `"Loading..."`
});
const hud_weapon_kills = new HudElement({
	name: 'osc_hud_weapon_kills',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', hud_x, hud_y + 15),
	text: `"Loading..."`
});
const hud_weapon = new HudElement({
	name: 'osc_hud_weapon',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', hud_x, hud_y + 30),
	text: `"Loading..."`
});

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

export const init_functions = [
	hud_total_kills.init(),
	hud_weapon_kills.init(),
	hud_weapon.init()
];

export const custom_functions = [
	{
		name: 'update_total_kills_hud',
		lines: [
			hud_total_kills.update(`"Total kills: ^5"+self.kills`),
			Core.wait(0.15)
		]
	}
];

export const update_functions = [
	Core.thread_custom_function('update_total_kills_hud'),
	if_statement(
		[
			`self.finished == 1`
		],
		[
			hud_weapon_kills.setAlpha(0),
			hud_weapon.setAlpha(0)
		],
		[
			hud_weapon_kills.update(`"Progress: "+self.weapon_kills+"/${kills_per_promotion}"`),
			hud_weapon.update(`"Weapon: ^5"+self.gun_index+"^7/"+self.gungame_weapons.size`)
		]
	)
];
