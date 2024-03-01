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
	self.gobblegum_cooldown = 0;
	self.gobblegum_identifier = "ips";
	self.gpp_ui_gg_hud_title = createFontString("objective", 1.5);
	self.gpp_ui_gg_hud_title setPoint("center", "center", -200, -50);
	self.gpp_ui_gg_hud_title.alpha = 1;
	self.gpp_ui_gg_hud_title.hidewheninmenu = true;
	self.gpp_ui_gg_hud_title.hidewhendead = true;
	self.gpp_ui_gg_hud_title.color = (1, 1, 1);
	self.gpp_ui_gg_hud_title setText("^1Aim + f to use gobblegum");
	self.gpp_ui_gg_hud_title.stored_text = "^1Aim + f to use gobblegum";
	self.gpp_ui_gg_hud_description = createFontString("objective", 1);
	self.gpp_ui_gg_hud_description setPoint("center", "center", -200, -20);
	self.gpp_ui_gg_hud_description.alpha = 1;
	self.gpp_ui_gg_hud_description.hidewheninmenu = true;
	self.gpp_ui_gg_hud_description.hidewhendead = true;
	self.gpp_ui_gg_hud_description.color = (1, 1, 1);
	self.gpp_ui_gg_hud_description setText("-");
	self.gpp_ui_gg_hud_description.stored_text = "-";
	self.gpp_ui_gg_hud_title.alpha = 0.5;
	self.gpp_ui_gg_hud_description.alpha = 0;
}

ttg_update()
{
	if (self.gobblegum_cooldown <= 0 && self.gobblegum_identifier != "none")
	{
		if (self adsbuttonpressed() && self usebuttonpressed())
		{
			switch(self.gobblegum_identifier) {
				case "ips":
					self thread hud_activation("In plain sight!", "Zombies ignore the player for 10 seconds.", 10);
					self thread gg_ips();
					break;
				default:
			}
		}
	}
	else
	{
		self.gobblegum_cooldown += -0.05;
	}
}

gg_ips()
{
	self.ignoreme = true;
	self.gobblegum_cooldown = 10;
	wait 10;
	self.ignoreme = false;
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
	self.gpp_ui_gg_hud_title.alpha = 0;
	self.gpp_ui_gg_hud_description.alpha = 0;
}

