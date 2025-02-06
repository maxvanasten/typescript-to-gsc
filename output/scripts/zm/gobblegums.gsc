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

    self thread ttg_init();

    for ( ;; )
    {
        self thread ttg_update();
        wait 0.05;
    }
}

ttg_init()
{
	self iPrintLn("[^2gobblegums^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
	level._model = [];
	foreach (model in getentarray( "script_model", "classname" ))
	{
		model get_model();
	}
	gobblegum_pos = (0, 0, 0);
	switch(tolower(getdvar(#"mapname"))) {
		case "zm_tomb":
			gobblegum_pos = (2381, 4752, -301);
			break;
		case "zm_prison":
			gobblegum_pos = (727, 10670, 1336);
			break;
		case "zm_buried":
			gobblegum_pos = (152, 133, 10);
			break;
		case "zm_transit":
			gobblegum_pos = (-6361, 5480, -55);
			break;
		case "zm_nuked":
			gobblegum_pos = (-237, 996, -63);
			break;
		default:
	}
	level thread setup_gobblegum_machine(gobblegum_pos[0], gobblegum_pos[1], gobblegum_pos[2]);
	self.gobblegum_cooldown = 0;
	self.last_gobblegum_round = -1;
	print("Setting player arrays");
	self.powerup_list = [];
	self.powerup_list[self.powerup_list.size] = "nuke";
	self.powerup_list[self.powerup_list.size] = "insta_kill";
	self.powerup_list[self.powerup_list.size] = "full_ammo";
	self.powerup_list[self.powerup_list.size] = "double_points";
	self.powerup_list[self.powerup_list.size] = "carpenter";
	self.powerup_list[self.powerup_list.size] = "fire_sale";
	self.powerup_list[self.powerup_list.size] = "free_perk";
	self.gobblegum_list = [];
	self.gobblegum_list[self.gobblegum_list.size] = "in_plain_sight";
	self.gobblegum_list[self.gobblegum_list.size] = "resupply";
	self.gobblegum_list[self.gobblegum_list.size] = "multiplier";
	self.gobblegum_list[self.gobblegum_list.size] = "perkdrop";
	self.gobblegum_list[self.gobblegum_list.size] = "weapon_upgrade";
	self.gpp_ui_gg_hud = createFontString("objective", 1.5);
	self.gpp_ui_gg_hud setPoint("CENTER", "CENTER", -225, -160);
	self.gpp_ui_gg_hud.alpha = 1;
	self.gpp_ui_gg_hud.hidewheninmenu = true;
	self.gpp_ui_gg_hud.hidewhendead = true;
	self.gpp_ui_gg_hud.color = (1, 1, 1);
	self.gpp_ui_gg_hud setText("^6No gobblegum");
	self.gpp_ui_gg_hud.stored_text = "^6No gobblegum";
}

ttg_update()
{
	if (self.gobblegum_cooldown <= 0 && self.gobblegum_identifier != "none")
	{
		if (self adsbuttonpressed() && self usebuttonpressed())
		{
			self iprintlnbold("Activated gobblegum: " + self.gobblegum_name);
			switch(self.gobblegum_identifier) {
				case "in_plain_sight":
					self thread hud_activation("Zombies ignore the player for 10 seconds.", 7, true);
					self thread gg_in_plain_sight();
					break;
				case "resupply":
					self thread hud_activation("Activates a max ammo.", 7, true);
					self thread gg_resupply();
					break;
				case "multiplier":
					self thread hud_activation("Activates a double points.", 7, true);
					self thread gg_multiplier();
					break;
				case "perkdrop":
					self thread hud_activation("Activates a random perk", 7, true);
					self thread gg_perkdrop();
					break;
				case "weapon_upgrade":
					self thread hud_activation("Pack-a-Punches the current weapon", 7, true);
					self thread gg_weapon_upgrade();
					break;
				default:
			}
			self.gobblegum_identifier = "none";
		}
	}
	else
	{
		self.gobblegum_cooldown += -0.05;
	}
}

setup_gobblegum_machine(x, y, z)
{
	level endon("end_game");
	print("Creating trigger. x: " + x + " y: " + y + " z: " + z);
	trigger_gobblegum = spawn("trigger_radius", (x, y, z+30), 0, 50, 50);
	trigger_gobblegum setCursorHint("HINT_NOICON");
	trigger_gobblegum setHintString("^3[{+activate}]^7 to get a gobblegum.");
	entities = getEntArray("script_model", "");
	while (true)
	{
		trigger_gobblegum waittill("trigger", player);
		if (player usebuttonpressed())
		{
			if (player.last_gobblegum_round != level.round_number)
			{
				player thread get_gobblegum();
				wait 0.5;
			}
			else
			{
				player iprintlnbold("You have already received a gobblegum this round.");
				wait 0.5;
			}
		}
	}
}

get_gobblegum()
{
	if (self.gobblegum_identifier == "none")
	{
		self.gobblegum_cooldown = 0;
		self.gobblegum_identifier = random(self.gobblegum_list);
		self.gobblegum_name = get_gobblegum_name(self.gobblegum_identifier);
		self.last_gobblegum_round = level.round_number;
		if (self.gpp_ui_gg_hud.stored_text != "^6Gobblegum ^5(AIM + F): ^7" + self.gobblegum_name)
		{
			self.gpp_ui_gg_hud setText("^6Gobblegum ^5(AIM + F): ^7" + self.gobblegum_name);
			self.gpp_ui_gg_hud.stored_text = "^6Gobblegum ^5(AIM + F): ^7" + self.gobblegum_name;
		}
		self iprintlnbold("You have received a gobblegum. (" + self.gobblegum_name + ")");
	}
	else
	{
		self iprintlnbold("You already have a gobblegum!");
	}
}

get_gobblegum_name(identifier)
{
	switch(identifier) {
		case "in_plain_sight":
			return "In plain sight";
			break;
		case "resupply":
			return "Resupply";
			break;
		case "multiplier":
			return "Multiplier";
			break;
		case "perkdrop":
			return "Perk drop";
			break;
		case "weapon_upgrade":
			return "Weapon upgrade";
			break;
		default:
			return "None";
	}
}

get_model()
{
	if (!isinarray(level._model, self.model))
	{
		level._model[level._model.size] = self.model;
		print("Model: " + self.model);
	}
}

gg_in_plain_sight()
{
	self.ignoreme = true;
	self.gobblegum_cooldown = 10;
	wait 10;
	self.ignoreme = false;
}

gg_resupply()
{
	self maps\mp\zombies\_zm_powerups::specific_powerup_drop("full_ammo", self.origin);
	self.gobblegum_cooldown = 10;
}

gg_multiplier()
{
	self maps\mp\zombies\_zm_powerups::specific_powerup_drop("double_points", self.origin);
	self.gobblegum_cooldown = 10;
}

gg_perkdrop()
{
	self maps\mp\zombies\_zm_powerups::specific_powerup_drop("free_perk", self.origin);
	self.gobblegum_cooldown = 10;
}

gg_weapon_upgrade()
{
	current_weapon = self getcurrentweapon();
	upgraded_weapon = maps\mp\zombies\_zm_weapons::get_upgrade_weapon(current_weapon, 1);
	if (isdefined(upgraded_weapon)) {
		self takeweapon(current_weapon);
		self giveweapon( upgraded_weapon, 0, self maps\mp\zombies\_zm_weapons::get_pack_a_punch_weapon_options( upgraded_weapon ) );
		self givestartammo( upgraded_weapon );
		self switchtoweapon( upgraded_weapon );
	}
	self.gobblegum_cooldown = 10;
}

hud_activation(text, duration, empty)
{
	current_text = self.gpp_ui_gg_hud.stored_text;
	if (self.gpp_ui_gg_hud.stored_text != "^6" + text)
	{
		self.gpp_ui_gg_hud setText("^6" + text);
		self.gpp_ui_gg_hud.stored_text = "^6" + text;
	}
	wait duration;
	if (empty)
	{
		if (self.gpp_ui_gg_hud.stored_text != "^6No gobblegum")
		{
			self.gpp_ui_gg_hud setText("^6No gobblegum");
			self.gpp_ui_gg_hud.stored_text = "^6No gobblegum";
		}
	}
	else
	{
		if (self.gpp_ui_gg_hud.stored_text != current_text)
		{
			self.gpp_ui_gg_hud setText(current_text);
			self.gpp_ui_gg_hud.stored_text = current_text;
		}
	}
}

