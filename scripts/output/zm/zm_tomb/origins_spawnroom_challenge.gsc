#include common_scripts\utility;
#include maps\mp\gametypes_zm\_hud_util;
init()
{
    level thread onPlayerConnect();
}

onPlayerConnect()
{
    for ( ;; )
    {
        level waittill("connecting", player);
        player thread onPlayerSpawned();
    }
}

onPlayerSpawned()
{
    self endon("disconnect");
    flag_wait("initial_blackscreen_passed");

    self thread gpp_init();

    for ( ;; )
    {
        self thread gpp_update();
        wait 0.05;
    }
}

gpp_init()
{
	self iPrintLn("[^2origins-spawnroom-challenge^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
	level.perk_purchase_limit = 99;
	// setValue() on player
	self.score = 0;
	// setArray() on player
	self.gungame_weapons = [];
	self.gungame_weapons[self.gungame_weapons.size] = "c96_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "beretta93r_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "fiveseven_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "kard_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "ksg_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "m14_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "dsr50_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "ballista_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "870mcs_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "srm1216_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "pdw57_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "qcw05_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "evoskorpion_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "type95_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "mp40_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "fnfal_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "ak74u_extclip_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "thompson_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "galil_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "hamr_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "mp44_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "mg08_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "staff_lightning_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "staff_fire_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "staff_water_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "staff_air_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "ray_gun_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "raygun_mark2_zm";
	// setValue() on player
	self.gun_index = -1;
	// setValue() on player
	self.finished = 0;
	// setValue() on player
	self.temp_kills = 0;
	self gpp_custom_next_weapon();
	// iPrintLnBold() on player
	self iprintlnbold("^5Get ^1kills ^5to upgrade your weapon!");
	// init() on HudElement 'osc_hud_total_kills'
	self.gpp_ui_osc_hud_total_kills = createFontString("objective", 1.5);
	self.gpp_ui_osc_hud_total_kills setPoint("CENTER", "CENTER", -225, -205);
	self.gpp_ui_osc_hud_total_kills.alpha = 1;
	self.gpp_ui_osc_hud_total_kills.hidewheninmenu = true;
	self.gpp_ui_osc_hud_total_kills.hidewhendead = true;
	self.gpp_ui_osc_hud_total_kills.color = (1, 1, 1);
	self.gpp_ui_osc_hud_total_kills setValue(0);
	self.gpp_ui_osc_hud_total_kills.label = &"Total kills: ^5";
	self.gpp_ui_osc_hud_total_kills.stored_value = 0;
	// init() on HudElement 'osc_hud_weapon_kills'
	self.gpp_ui_osc_hud_weapon_kills = createFontString("objective", 1.5);
	self.gpp_ui_osc_hud_weapon_kills setPoint("CENTER", "CENTER", -225, -190);
	self.gpp_ui_osc_hud_weapon_kills.alpha = 1;
	self.gpp_ui_osc_hud_weapon_kills.hidewheninmenu = true;
	self.gpp_ui_osc_hud_weapon_kills.hidewhendead = true;
	self.gpp_ui_osc_hud_weapon_kills.color = (1, 1, 1);
	self.gpp_ui_osc_hud_weapon_kills setValue(0);
	self.gpp_ui_osc_hud_weapon_kills.label = &"Weapon kills left: ^4";
	self.gpp_ui_osc_hud_weapon_kills.stored_value = 0;
	// init() on HudElement 'osc_hud_weapon'
	self.gpp_ui_osc_hud_weapon = createFontString("objective", 1.5);
	self.gpp_ui_osc_hud_weapon setPoint("CENTER", "CENTER", -225, -175);
	self.gpp_ui_osc_hud_weapon.alpha = 1;
	self.gpp_ui_osc_hud_weapon.hidewheninmenu = true;
	self.gpp_ui_osc_hud_weapon.hidewhendead = true;
	self.gpp_ui_osc_hud_weapon.color = (1, 1, 1);
	self.gpp_ui_osc_hud_weapon setValue(0);
	self.gpp_ui_osc_hud_weapon.label = &"^7Weapons left: ^3";
	self.gpp_ui_osc_hud_weapon.stored_value = 0;
	// setArray() on player
	self.perk_list = [];
	self.perk_list[self.perk_list.size] = "specialty_quickrevive";
	self.perk_list[self.perk_list.size] = "specialty_deadshot";
	self.perk_list[self.perk_list.size] = "specialty_fastreload";
	self.perk_list[self.perk_list.size] = "specialty_armorvest";
	self.perk_list[self.perk_list.size] = "specialty_longersprint";
	self.perk_list[self.perk_list.size] = "specialty_rof";
	self.perk_list[self.perk_list.size] = "specialty_grenadepulldeath";
	replaceFunc(maps\mp\zm_tomb_capture_zones::get_generator_capture_start_cost, ::gpp_custom_get_generator_capture_start_cost);
	replaceFunc(maps\mp\zm_tomb_capture_zones::reward_players_in_capture_zone, ::gpp_custom_reward_players_in_capture_zone);
	replaceFunc(maps\mp\zm_tomb_capture_zones::get_progress_rate, ::gpp_custom_get_progress_rate);
	self thread gpp_custom_handle_round_change();
}

gpp_update()
{	// Player.giveMaxAmmo(self getcurrentweapon())
	self givemaxammo( self getcurrentweapon() );
	self thread gpp_custom_check_kills();
	// if_statement()
	if (self.weapon_kills >= (10 + (self.gun_index * 2)) && !self.finished)
	{
		// if_statement()
		if (self.gun_index >= self.gungame_weapons.size - 1)
		{
			self thread gpp_custom_player_wins();
		}
		else
		{
			self thread gpp_custom_next_weapon();
		}
	}
	// if_statement()
	if (self.score > 0)
	{
		// setValue() on player
		self.score = 0;
	}
	self thread gpp_custom_update_hud_total_kills();
	// if_statement()
	if (self.finished == 1)
	{
		// setAlpha() on HudElement 'osc_hud_weapon_kills'
		self.gpp_ui_osc_hud_weapon_kills.alpha = 0;
		// setAlpha() on HudElement 'osc_hud_weapon'
		self.gpp_ui_osc_hud_weapon.alpha = 0;
	}
	else
	{
		self thread gpp_custom_update_hud_weapon_kills();
		self thread gpp_custom_update_hud_weapon();
	}
}

gpp_custom_next_weapon()
{
	// setValue() on player
	self.weapon_kills = 0;
	// Player.takeAllWeapons()
	weaponslist = self getweaponslist();
	for (i = 0; i < weaponslist.size; i++)
	{
		if (weaponslist[i] != "knife_zm")
		{
			self takeweapon(weaponslist[i]);
		}
	}
	// incrementValue() on player
	self.gun_index += 1;
	// giveWeapon() on player
	self giveWeapon(self.gungame_weapons[self.gun_index]);
}

gpp_custom_player_wins()
{
	// setValue() on player
	self.finished = 1;
	// iPrintLnBold() on player
	self iprintlnbold("You have won the challenge!");
	self gpp_custom_give_completed_loadout();
}

gpp_custom_give_completed_loadout()
{
	// givePerk() on player
	self maps\mp\zombies\_zm_perks::give_perk("specialty_additionalprimaryweapon");
	// Player.takeAllWeapons()
	weaponslist = self getweaponslist();
	for (i = 0; i < weaponslist.size; i++)
	{
		if (weaponslist[i] != "knife_zm")
		{
			self takeweapon(weaponslist[i]);
		}
	}
	// giveWeapon() on player
	self giveWeapon("galil_upgraded_zm");
	// giveWeapon() on player
	self giveWeapon("python_upgraded_zm");
	// giveWeapon() on player
	self giveWeapon("staff_air_zm");
}

gpp_custom_player_revived_monitor()
{
	// Level.wait_till("player_revived")
	level waittill("player_revived");
	self gpp_custom_give_completed_loadout();
}

gpp_custom_check_kills()
{
	// setValue() on player
	self.kills_diff = self.kills - self.temp_kills;
	// if_statement()
	if (self.kills_diff > 0)
	{
		// setValue() on player
		self.temp_kills = self.kills;
		// incrementValue() on player
		self.weapon_kills += self.kills_diff;
		// setValue() on player
		self.kills_diff = 0;
	}
}

gpp_custom_update_hud_total_kills()
{
	// update() on HudElement 'osc_hud_total_kills'
	if (self.gpp_ui_osc_hud_total_kills.stored_value != self.kills)
	{
		self.gpp_ui_osc_hud_total_kills setValue(self.kills);
		self.gpp_ui_osc_hud_total_kills.stored_value = self.kills;
	}
	wait 0.5;
}

gpp_custom_update_hud_weapon_kills()
{
	// update() on HudElement 'osc_hud_weapon_kills'
	if (self.gpp_ui_osc_hud_weapon_kills.stored_value != (10 + (self.gun_index*2)) - self.weapon_kills)
	{
		self.gpp_ui_osc_hud_weapon_kills setValue((10 + (self.gun_index*2)) - self.weapon_kills);
		self.gpp_ui_osc_hud_weapon_kills.stored_value = (10 + (self.gun_index*2)) - self.weapon_kills;
	}
	wait 0.5;
}

gpp_custom_update_hud_weapon()
{
	// update() on HudElement 'osc_hud_weapon'
	if (self.gpp_ui_osc_hud_weapon.stored_value != 27 - self.gun_index)
	{
		self.gpp_ui_osc_hud_weapon setValue(27 - self.gun_index);
		self.gpp_ui_osc_hud_weapon.stored_value = 27 - self.gun_index;
	}
	wait 0.5;
}

gpp_custom_get_generator_capture_start_cost()
{
	return 0;
}

gpp_custom_reward_players_in_capture_zone()
{
	// if_statement()
	if (!self maps\mp\zombies\_zm_utility::ent_flag("player_controlled"))
	{
		foreach (player in get_players_in_capture_zone())
		{
			player gpp_custom_player_handler();
		}
	}
}

gpp_custom_handle_round_change()
{
	// while_loop()
	while (true)
	{
		// Level.wait_till("end_of_round")
		level waittill("end_of_round");
		// setValue() on player
		self.recapture_zone = maps\mp\zm_tomb_capture_zones::get_recapture_zone();
		self.recapture_zone maps\mp\zm_tomb_capture_zones::init_capture_zone();
		wait 0.5;
	}
}

gpp_custom_player_handler()
{
	// setValue() on player
	self.b_challenge_exists = maps\mp\zombies\_zm_challenges::challenge_exists ("zc_zone_captures");
	self notify("completed_zone_capture");
	self maps\mp\zombies\_zm_score::player_add_points("bonus_points_powerup", 100);
	// if_statement()
	if (self.b_challenge_exists)
	{
		self maps\mp\zombies\_zm_challenges::increment_stat("zc_zone_captures");
	}
	self maps\mp\zombies\_zm_stats::increment_client_stat("tomb_generator_captured", 0);
	self maps\mp\zombies\_zm_stats::increment_player_stat("tomb_generator_captured");
	self gpp_custom_give_random_perk();
}

gpp_custom_give_random_perk()
{
	// setValue() on player
	self.random_perk = random(self.perk_list);
	// if_statement()
	if (self hasPerk(self.random_perk))
	{
		self gpp_custom_give_random_perk();
	}
	else
	{
		// givePerk() on player
		self maps\mp\zombies\_zm_perks::give_perk(self.random_perk);
	}
}

gpp_custom_get_progress_rate(n_players_in_zone)
{
	// if_statement()
	if (n_players_in_zone > 0)
	{
		return 0.2;
	}
	else
	{
		return -0.5;
	}
}

