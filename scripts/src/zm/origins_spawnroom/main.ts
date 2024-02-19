import Core, { if_statement } from '../../../../library/core';
import Player from '../../../../library/player';

import Weapons from '../../../../library/lists/weapons';
import Perks from '../../../../library/lists/perks';

export const gungame_weapons = [
	Weapons.zm_tomb.c96.default,
	Weapons.zm_tomb.beretta93r.default,
	Weapons.zm_tomb.fiveseven.default,
	Weapons.zm_tomb.kard.default,

	Weapons.zm_tomb.ksg.default,
	Weapons.zm_tomb.m14.default,

	Weapons.zm_tomb.r870mcs.default,
	Weapons.zm_tomb.m1216.default,

	Weapons.zm_tomb.dsr50.default,
	Weapons.zm_tomb.ballista.default,

	Weapons.zm_tomb.m32.default,
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
		name: 'give_perks',
		lines: [
			Player.givePerk(Perks.juggernog),
			Player.givePerk(Perks.double_tap),
			Player.givePerk(Perks.stamin_up),
			Player.givePerk(Perks.speed_cola),
			Player.givePerk(Perks.quick_revive),
			Player.givePerk(Perks.mule_kick),
			Player.givePerk(Perks.deadshot),
			Player.givePerk(Perks.electric_cherry)
		]
	},
	{
		name: 'next_weapon',
		lines: [
			Player.setValue('weapon_kills', 0),
			Player.takeAllWeapons(),
			Player.addNumberToValue('gun_index', 1),
			Player.giveWeapon(`self.gungame_weapons[self.gun_index]`)
		]
	},
	{
		name: 'player_wins',
		lines: [
			Player.setValue('finished', 1),
			Player.iPrintLnBold(`"You have won the challenge!"`),
			Player.takeCurrentWeapon(),
			Player.giveWeapon(Weapons.zm_tomb.mg08.upgraded),
			Player.giveWeapon(Weapons.zm_tomb.python.upgraded),
			Player.giveWeapon(Weapons.zm_tomb.air_staff.default)
		]
	},
	{
		name: 'check_kills',
		lines: [
			// Calculate difference between last check
			Player.setValue('kills_diff', `self.kills - self.temp_kills`),
			// If there is a difference, process the change
			if_statement(
				[
					`self.kills_diff > 0`
				],
				[
					Player.setValue('temp_kills', `self.kills`),
					Player.addNumberToValue('weapon_kills', `self.kills_diff`),
					Player.setValue('kills_diff', 0)
				]
			)
		]
	}
];

export const init_functions = [
	Core.disable_perk_limit(),

	Player.setValue('score', 0),
	Player.setArray('gungame_weapons', gungame_weapons),
	Player.setValue('gun_index', -1),
	Player.setValue('finished', 0),
	Player.setValue(`temp_kills`, 0),

	Core.run_custom_function('next_weapon'),
	Core.run_custom_function('give_perks'),

	Player.iPrintLnBold(`"^5Get ^1kills ^5to upgrade your weapon!"`)
];

export const update_functions = [
	Player.giveMaxAmmo(Player.current_weapon),
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
			Player.setValue('score', 0)
		]
	)
];
