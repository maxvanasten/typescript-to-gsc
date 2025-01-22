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
	print("Init title");
	self.gpp_ui_gg_hud_title = createFontString("objective", 1.5);
	self.gpp_ui_gg_hud_title setPoint("center", "center", -300, 100);
	self.gpp_ui_gg_hud_title.alpha = 1;
	self.gpp_ui_gg_hud_title.hidewheninmenu = true;
	self.gpp_ui_gg_hud_title.hidewhendead = true;
	self.gpp_ui_gg_hud_title.color = (1, 1, 1);
	self.gpp_ui_gg_hud_title setText("^1Aim + f to use gobblegum");
	self.gpp_ui_gg_hud_title.stored_text = "^1Aim + f to use gobblegum";
	print("Init desc");
	self.gpp_ui_gg_hud_description = createFontString("objective", 1);
	self.gpp_ui_gg_hud_description setPoint("center", "center", -300, 130);
	self.gpp_ui_gg_hud_description.alpha = 1;
	self.gpp_ui_gg_hud_description.hidewheninmenu = true;
	self.gpp_ui_gg_hud_description.hidewhendead = true;
	self.gpp_ui_gg_hud_description.color = (1, 1, 1);
	self.gpp_ui_gg_hud_description setText("You don't have a gobblegum.");
	self.gpp_ui_gg_hud_description.stored_text = "You don't have a gobblegum.";
	self.gpp_ui_gg_hud_title.alpha = 0.5;
	self.gpp_ui_gg_hud_description.alpha = 0.5;
}

ttg_update()
{
	if (self.gobblegum_cooldown <= 0 && self.gobblegum_identifier != "none")
	{
		if (self adsbuttonpressed() && self usebuttonpressed())
		{
			switch(self.gobblegum_identifier) {
				case "in_plain_sight":
					self thread hud_activation("In plain sight!", "Zombies ignore the player for 10 seconds.", 7);
					self thread gg_in_plain_sight();
					break;
				case "resupply":
					self thread hud_activation("Resupply!", "Activates a max ammo.", 7);
					self thread gg_resupply();
					break;
				case "multiplier":
					self thread hud_activation("Multiplier!", "Activates a double points.", 7);
					self thread gg_multiplier();
					break;
				case "perkdrop":
					self thread hud_activation("Perk drop!", "Activates a random perk", 7);
					self thread gg_perkdrop();
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
	trigger_gobblegum = spawn("trigger_radius", (x, y, z), 0, 50, 50);
	trigger_gobblegum setCursorHint("HINT_NOICON");
	trigger_gobblegum setHintString("^3[{+activate}]^7 to get a gobblegum.");
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
		self.last_gobblegum_round = level.round_number;
		if (self.gpp_ui_gg_hud_description.stored_text != "You have a gobblegum. (" + self.gobblegum_identifier + ")")
		{
			self.gpp_ui_gg_hud_description setText("You have a gobblegum. (" + self.gobblegum_identifier + ")");
			self.gpp_ui_gg_hud_description.stored_text = "You have a gobblegum. (" + self.gobblegum_identifier + ")";
		}
		self iprintlnbold("You have received a gobblegum. (" + self.gobblegum_identifier + ")");
	}
	else
	{
		self iprintlnbold("You already have a gobblegum!");
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

hud_activation(title, description, duration)
{
	if (self.gpp_ui_gg_hud_title.stored_text != title)
	{
		self.gpp_ui_gg_hud_title setText(title);
		self.gpp_ui_gg_hud_title.stored_text = title;
	}
	if (self.gpp_ui_gg_hud_description.stored_text != description)
	{
		self.gpp_ui_gg_hud_description setText(description);
		self.gpp_ui_gg_hud_description.stored_text = description;
	}
	self.gpp_ui_gg_hud_title.alpha = 0.8;
	self.gpp_ui_gg_hud_description.alpha = 0.5;
	wait duration;
	if (self.gpp_ui_gg_hud_title.stored_text != "^1Aim + f to use gobblegum")
	{
		self.gpp_ui_gg_hud_title setText("^1Aim + f to use gobblegum");
		self.gpp_ui_gg_hud_title.stored_text = "^1Aim + f to use gobblegum";
	}
	if (self.gpp_ui_gg_hud_description.stored_text != "You don't have a gobblegum.")
	{
		self.gpp_ui_gg_hud_description setText("You don't have a gobblegum.");
		self.gpp_ui_gg_hud_description.stored_text = "You don't have a gobblegum.";
	}
	self.gpp_ui_gg_hud_title.alpha = 0.5;
	self.gpp_ui_gg_hud_description.alpha = 0.5;
}

