import Core, { if_statement } from '../../../../library/core';
import Player from '../../../../library/player';

import Weapons from '../../../../library/lists/weapons';
import Perks from '../../../../library/lists/perks';
import Level from '../../../../library/level';

export const gungame_weapons = [
	Weapons.zm_tomb.c96.default,
	Weapons.zm_tomb.beretta93r.default,
	Weapons.zm_tomb.fiveseven.default,
	Weapons.zm_tomb.kard.default,

	Weapons.zm_tomb.ksg.default,
	Weapons.zm_tomb.m14.default,

	Weapons.zm_tomb.dsr50.default,
	Weapons.zm_tomb.ballista.default,

	Weapons.zm_tomb.r870mcs.default,
	Weapons.zm_tomb.m1216.default,

	Weapons.zm_tomb.pdw57.default,
	Weapons.zm_tomb.qcw05.default,
	Weapons.zm_tomb.skorpion.default,
	Weapons.zm_tomb.type95.default,

	Weapons.zm_tomb.mp40.default,
	Weapons.zm_tomb.fnfal.default,
	Weapons.zm_tomb.ak74u.extclip,
	Weapons.zm_tomb.thompson.default,
	Weapons.zm_tomb.galil.default,
	Weapons.zm_tomb.hamr.default,
	Weapons.zm_tomb.mp44.default,
	Weapons.zm_tomb.mg08.default,

	Weapons.zm_tomb.lightning_staff.default,
	Weapons.zm_tomb.fire_staff.default,
	Weapons.zm_tomb.water_staff.default,
	Weapons.zm_tomb.air_staff.default,

	Weapons.zm_tomb.ray_gun.default
];

export const kills_per_promotion = 12;

export const custom_functions = [
	{
		name: 'next_weapon',
		lines: [
			Player.set_value('weapon_kills', 0),
			Player.take_all_weapons(),
			Player.increment_value('gun_index', 1),
			Player.give_weapon(`self.gungame_weapons[self.gun_index]`)
		]
	},
	{
		name: 'player_wins',
		lines: [
			Player.set_value('finished', 1),
			Player.i_print_ln_bold(`"You have won the challenge!"`),
			Player.give_perk(Perks.mule_kick),
			Player.take_current_weapon(),
			Player.give_weapon(Weapons.zm_tomb.skorpion.upgraded),
			Player.give_weapon(Weapons.zm_tomb.python.upgraded),
			Player.give_weapon(Weapons.zm_tomb.air_staff.default)
		]
	},
	{
		name: 'player_revived_monitor',
		lines: [
			Level.wait_till(`"player_revived"`)
		]
	},
	{
		name: 'check_kills',
		lines: [
			// Calculate difference between last check
			Player.set_value('kills_diff', `self.kills - self.temp_kills`),
			// If there is a difference, process the change
			if_statement(
				[
					`self.kills_diff > 0`
				],
				[
					Player.set_value('temp_kills', `self.kills`),
					Player.increment_value('weapon_kills', `self.kills_diff`),
					Player.set_value('kills_diff', 0)
				]
			)
		]
	}
];

export const init_functions = [
	Core.disable_perk_limit(),

	Player.set_value('score', 0),
	Player.set_array('gungame_weapons', gungame_weapons),
	Player.set_value('gun_index', -1),
	Player.set_value('finished', 0),
	Player.set_value(`temp_kills`, 0),

	Core.run_custom_function('next_weapon'),

	Player.i_print_ln_bold(`"^5Get ^1kills ^5to upgrade your weapon!"`)
];

export const update_functions = [
	// Core.thread_custom_function('player_revived_monitor'),
	Player.give_max_ammo(Player.current_weapon),
	Core.run_custom_function('check_kills'),
	// Check if player has gotten enough kills, but hasnt finished the challenge yet
	if_statement(
		[
			`self.weapon_kills >= ${kills_per_promotion} && !self.finished`
		],
		[
			// Check if there are any guns left or if the player is done with the challenge
			if_statement(
				[
					`self.gun_index >= self.gungame_weapons.size - 1`
				],
				[
					// Player is done with the challenge
					Core.run_custom_function('player_wins')
				],
				[
					// Player should receive the next gun
					Core.run_custom_function('next_weapon')
				]
			)
		]
	),
	// Keep players points locked to 0 so they cant buy stuff
	if_statement(
		[
			`${Player.score} > 0`
		],
		[
			Player.set_value('score', 0)
		]
	)
];
