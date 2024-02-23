import Core, { if_statement } from '../../../../library/core';
import HudElement, { Font, Point } from '../../../../library/hud_element';
import { kills_per_promotion, gungame_weapons } from './main';

const hud_x = -225;
const hud_y = -205;

const hud_total_kills = new HudElement({
	name: 'osc_hud_total_kills',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', hud_x, hud_y),
	type: 'number',
	label: `Total kills: ^5`,
	value: 0
});
const hud_weapon_kills = new HudElement({
	name: 'osc_hud_weapon_kills',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', hud_x, hud_y + 15),
	type: 'number',
	label: `Weapon kills left: ^4`,
	value: 0
});
const hud_weapon = new HudElement({
	name: 'osc_hud_weapon',
	font: Font.default(),
	point: new Point('CENTER', 'CENTER', hud_x, hud_y + 30),
	type: 'number',
	label: `^7Weapons left: ^3`,
	value: 0
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
		name: 'update_hud_total_kills',
		lines: [
			hud_total_kills.update(`self.kills`),
			Core.wait(0.5)
		]
	},
	{
		name: 'update_hud_weapon_kills',
		lines: [
			hud_weapon_kills.update(`(${kills_per_promotion} + (self.gun_index*2)) - self.weapon_kills`),
			Core.wait(0.5)
		]
	},
	{
		name: 'update_hud_weapon',
		lines: [
			hud_weapon.update(`${gungame_weapons.length - 1} - self.gun_index`),
			Core.wait(0.5)
		]
	}
];

export const update_functions = [
	Core.thread_custom_function('update_hud_total_kills'),
	if_statement(
		[
			`self.finished == 1`
		],
		[
			hud_weapon_kills.setAlpha(0),
			hud_weapon.setAlpha(0)
		],
		[
			Core.thread_custom_function('update_hud_weapon_kills'),
			Core.thread_custom_function('update_hud_weapon')
		]
	)
];
