import Core, { if_statement, while_loop } from '../../../../library/core';
import Player from '../../../../library/player';
import Level from '../../../../library/level';
import Perks from '../../../../library/lists/perks';

export const custom_functions = [
	{
		name: 'get_generator_capture_start_cost',
		lines: [
			// return 200 * get_players().size;
			// make generator free
			Core.return(0)
		]
	},
	{
		name: 'reward_players_in_capture_zone',
		lines: [
			if_statement(
				[
					Core.is_not(Core.self_ent_flag('player_controlled'))
				],
				[
					Core.for_each_run_custom('player', 'get_players_in_capture_zone()', 'player_handler')
				]
			)
		]
	},
	{
		name: 'handle_round_change',
		lines: [
			while_loop(
				[
					`true`
				],
				[
					Level.wait_till(`"end_of_round"`),
					Player.set_value('recapture_zone', `maps\\mp\\zm_tomb_capture_zones::get_recapture_zone()`),
					Core.run_function_on_entity(`maps\\mp\\zm_tomb_capture_zones::init_capture_zone()`, `self.recapture_zone`),
					Core.wait(0.5)
				]
			)
		]
	},
	{
		name: 'player_handler',
		lines: [
			Player.set_value('b_challenge_exists', 'maps\\mp\\zombies\\_zm_challenges::challenge_exists ("zc_zone_captures")'),

			Player.notify('completed_zone_capture'),
			Player.run_function(`maps\\mp\\zombies\\_zm_score::player_add_points("bonus_points_powerup", 100)`),

			if_statement(
				[
					`self.b_challenge_exists`
				],
				[
					Player.run_function(`maps\\mp\\zombies\\_zm_challenges::increment_stat("zc_zone_captures")`)
				]
			),

			Player.run_function(`maps\\mp\\zombies\\_zm_stats::increment_client_stat("tomb_generator_captured", 0)`),
			Player.run_function(`maps\\mp\\zombies\\_zm_stats::increment_player_stat("tomb_generator_captured")`),

			// Pack a punch current weapon
			// Player.setValue('upgraded_weapon_name', Core.get_upgrade_weapon(Player.current_weapon, 1)),
			// Player.takeAllWeapons(),
			// Player.giveWeapon(`self.upgraded_weapon_name`),
			// Core.log(`"upgraded_weapon_name: "+self.upgraded_weapon_name`)

			// Give player random perk
			Core.run_custom_function('give_random_perk')
		]
	},
	{
		name: 'give_random_perk',
		lines: [
			Player.set_value('random_perk', Core.random_from_array('self.perk_list')),
			// Check if player already has this perk, if so, run this same function again
			if_statement(
				[
					// Player has this perk
					Player.has_perk(Player.get_value('random_perk'))
				],
				[
					// Rerun func
					Core.run_custom_function('give_random_perk')
				],
				[
					// Give perk
					Player.give_perk(Player.get_value('random_perk'))
				]
			)
		]
	},
	{
		name: 'get_progress_rate',
		arguments: [
			'n_players_in_zone'
		],
		lines: [
			if_statement(
				[
					`n_players_in_zone > 0`
				],
				[
					Core.return(0.2)
				],
				[
					Core.return(-0.5)
				]
			)
		]
	}
];

const perk_list = [
	Perks.quick_revive,
	Perks.deadshot,
	Perks.speed_cola,
	Perks.juggernog,
	Perks.stamin_up,
	Perks.double_tap,
	Perks.electric_cherry
];

export const init_functions = [
	Player.set_array('perk_list', perk_list),
	Core.replace_function_with_custom('maps\\mp\\zm_tomb_capture_zones::get_generator_capture_start_cost', 'get_generator_capture_start_cost'),
	Core.replace_function_with_custom('maps\\mp\\zm_tomb_capture_zones::reward_players_in_capture_zone', 'reward_players_in_capture_zone'),
	Core.replace_function_with_custom('maps\\mp\\zm_tomb_capture_zones::get_progress_rate', 'get_progress_rate'),
	Core.thread_custom_function('handle_round_change')
];

export const update_functions = [];
