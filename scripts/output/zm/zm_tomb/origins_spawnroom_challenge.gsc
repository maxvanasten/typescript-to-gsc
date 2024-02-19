#include common_scripts\utility;
#include maps\mp\gametypes_zm\_hud_util;
#include maps\mp\zombies\_zm_utility;
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
	self.gungame_weapons[self.gungame_weapons.size] = "870mcs_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "srm1216_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "dsr50_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "ballista_zm";
	self.gungame_weapons[self.gungame_weapons.size] = "m32_zm";
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
	// setValue() on player
	self.gun_index = -1;
	// setValue() on player
	self.finished = 0;
	// setValue() on player
	self.temp_kills = 0;
	self gpp_custom_next_weapon();
	self gpp_custom_give_perks();
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
	// init() on HudElement 'health_counter'
	self.gpp_ui_health_counter = createFontString("objective", 1.5);
	self.gpp_ui_health_counter setPoint("CENTER", "CENTER", 0, 200);
	self.gpp_ui_health_counter.alpha = 1;
	self.gpp_ui_health_counter.hidewheninmenu = true;
	self.gpp_ui_health_counter.hidewhendead = true;
	self.gpp_ui_health_counter.color = (1, 1, 1);
	self.gpp_ui_health_counter setValue(0);
	self.gpp_ui_health_counter.label = &"Health: ^6";
	self.gpp_ui_health_counter.stored_value = 0;
	// init() on HudElement 'zombie_counter'
	self.gpp_ui_zombie_counter = createFontString("objective", 1.5);
	self.gpp_ui_zombie_counter setPoint("CENTER", "CENTER", 0, 215);
	self.gpp_ui_zombie_counter.alpha = 1;
	self.gpp_ui_zombie_counter.hidewheninmenu = true;
	self.gpp_ui_zombie_counter.hidewhendead = true;
	self.gpp_ui_zombie_counter.color = (1, 1, 1);
	self.gpp_ui_zombie_counter setValue(0);
	self.gpp_ui_zombie_counter.label = &"Zombies: ^1";
	self.gpp_ui_zombie_counter.stored_value = 0;
}

gpp_update()
{	// Player.giveMaxAmmo(self getcurrentweapon())
	self givemaxammo( self getcurrentweapon() );
	self gpp_custom_check_kills();
	// if_statement()
	if (self.weapon_kills >= 12 && !self.finished)
	{
		// if_statement()
		if (self.gun_index >= self.gungame_weapons.size - 1)
		{
			self gpp_custom_player_wins();
		}
		else
		{
			self gpp_custom_next_weapon();
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
	self thread gpp_custom_update_hud_health_counter();
	// setValue() on player
	self.zombies_left = level.zombie_total + get_current_zombie_count();
	self thread gpp_custom_update_hud_zombie_counter();
}

gpp_custom_give_perks()
{
	// givePerk() on player
	self maps\mp\zombies\_zm_perks::give_perk("specialty_armorvest");
	// givePerk() on player
	self maps\mp\zombies\_zm_perks::give_perk("specialty_rof");
	// givePerk() on player
	self maps\mp\zombies\_zm_perks::give_perk("specialty_longersprint");
	// givePerk() on player
	self maps\mp\zombies\_zm_perks::give_perk("specialty_fastreload");
	// givePerk() on player
	self maps\mp\zombies\_zm_perks::give_perk("specialty_quickrevive");
	// givePerk() on player
	self maps\mp\zombies\_zm_perks::give_perk("specialty_additionalprimaryweapon");
	// givePerk() on player
	self maps\mp\zombies\_zm_perks::give_perk("specialty_deadshot");
	// givePerk() on player
	self maps\mp\zombies\_zm_perks::give_perk("specialty_grenadepulldeath");
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
	// Player.takeCurrentWeapon()
	self takeWeapon(self getcurrentweapon());
	// giveWeapon() on player
	self giveWeapon("mg08_upgraded_zm");
	// giveWeapon() on player
	self giveWeapon("python_upgraded_zm");
	// giveWeapon() on player
	self giveWeapon("staff_air_zm");
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
	if (self.gpp_ui_osc_hud_weapon_kills.stored_value != 12 - self.weapon_kills)
	{
		self.gpp_ui_osc_hud_weapon_kills setValue(12 - self.weapon_kills);
		self.gpp_ui_osc_hud_weapon_kills.stored_value = 12 - self.weapon_kills;
	}
	wait 0.5;
}

gpp_custom_update_hud_weapon()
{
	// update() on HudElement 'osc_hud_weapon'
	if (self.gpp_ui_osc_hud_weapon.stored_value != 23 - self.gun_index)
	{
		self.gpp_ui_osc_hud_weapon setValue(23 - self.gun_index);
		self.gpp_ui_osc_hud_weapon.stored_value = 23 - self.gun_index;
	}
	wait 0.5;
}

gpp_custom_update_hud_health_counter()
{
	// update() on HudElement 'health_counter'
	if (self.gpp_ui_health_counter.stored_value != self.health)
	{
		self.gpp_ui_health_counter setValue(self.health);
		self.gpp_ui_health_counter.stored_value = self.health;
	}
	wait 0.5;
}

gpp_custom_update_hud_zombie_counter()
{
	// update() on HudElement 'zombie_counter'
	if (self.gpp_ui_zombie_counter.stored_value != self.zombies_left)
	{
		self.gpp_ui_zombie_counter setValue(self.zombies_left);
		self.gpp_ui_zombie_counter.stored_value = self.zombies_left;
	}
	wait 0.5;
}

