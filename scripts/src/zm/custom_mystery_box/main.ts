import Core, { switch_statement } from '../../../../library/core';
import Weapons from '../../../../library/lists/weapons';

import Level from '../../../../library/level';
import Player from '../../../../library/player';

// Weapons:
// Fal
// Galil
// M14
// Olympia
// AK-74u

// Possible maps:
// zm_buried
// zm_highrise
// zm_transit
// zm_tomb
// zm_prison

const add_weapons_for_map = (map: 'zm_buried' | 'zm_highrise' | 'zm_transit' | 'zm_tomb' | 'zm_prison') => {
	// console.log(Weapons[map]);
	const code: string[][] = [];

	switch (map) {
		case 'zm_buried':
			zm_buried_weapons.forEach((weapon) => {
				code.push(...push_weapon(weapon));
			});
			break;
		case 'zm_highrise':
			zm_highrise_weapons.forEach((weapon) => {
				code.push(...push_weapon(weapon));
			});
			break;
		case 'zm_transit':
			zm_transit_weapons.forEach((weapon) => {
				code.push(...push_weapon(weapon));
			});
			break;
		case 'zm_tomb':
			zm_tomb_weapons.forEach((weapon) => {
				code.push(...push_weapon(weapon));
			});
			break;
		case 'zm_prison':
			zm_prison_weapons.forEach((weapon) => {
				code.push(...push_weapon(weapon));
			});
			break;
		default:
			break;
	}

	return code;
};

const push_weapon = (weapon_name: string) => {
	return [
		Core.make_local_struct(`temp`),
		Core.add_to_struct(`temp`, 'weapon_name', weapon_name),
		Level.set_value(`zombie_weapons[${weapon_name}]`, `gpp_struct_temp`)
	];
};

const zm_prison_weapons = [
	Weapons.zm_prison.fnfal.default,
	Weapons.zm_prison.galil.default,
	Weapons.zm_prison.m14.default,
	Weapons.zm_prison.olympia.default,
	Weapons.zm_prison.ak47.default
];

const zm_tomb_weapons = [
	Weapons.zm_tomb.fnfal.default,
	Weapons.zm_tomb.galil.default,
	Weapons.zm_tomb.m14.default,
	Weapons.zm_tomb.r870mcs.default,
	Weapons.zm_tomb.ak74u.default
];

const zm_transit_weapons = [
	Weapons.zm_transit.fnfal.default,
	Weapons.zm_transit.galil.default,
	Weapons.zm_transit.m14.default,
	Weapons.zm_transit.olympia.default,
	Weapons.zm_transit.ak74u.default
];

const zm_highrise_weapons = [
	Weapons.zm_highrise.fnfal.default,
	Weapons.zm_highrise.galil.default,
	Weapons.zm_highrise.m14.default,
	Weapons.zm_highrise.olympia.default,
	Weapons.zm_highrise.ak74u.default
];

const zm_buried_weapons = [
	Weapons.zm_buried.fnfal.default,
	Weapons.zm_buried.galil.default,
	Weapons.zm_buried.m14.default,
	Weapons.zm_buried.olympia.default,
	Weapons.zm_buried.ak74u.default
];

let init_functions_r = [
	// Player.set_value('score', 50000),
	Level.set_array('zombie_weapons', []),
	Core.set_local_variable('mapname', Core.map_name),
	switch_statement(
		`mapname`,
		[
			{
				case: `"zm_buried"`,
				do: [
					...add_weapons_for_map('zm_buried')
				]
			},
			{
				case: `"zm_highrise"`,
				do: [
					...add_weapons_for_map('zm_highrise')
				]
			},
			{
				case: `"zm_transit"`,
				do: [
					...add_weapons_for_map('zm_transit')
				]
			},
			{
				case: `"zm_tomb"`,
				do: [
					...add_weapons_for_map('zm_tomb')
				]
			},
			{
				case: `"zm_prison"`,
				do: [
					...add_weapons_for_map('zm_prison')
				]
			}
		],
		[
			...add_weapons_for_map('zm_transit')
		]
	)
];

export const init_functions = init_functions_r;
