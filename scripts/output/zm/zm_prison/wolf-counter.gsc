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
	self iPrintLn("[^2motd-wolf-counter^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
	// init() on HudElement 'wolf_counter_title'
	self.gpp_ui_wolf_counter_title = createFontString("objective", 2);
	self.gpp_ui_wolf_counter_title setPoint("center", "center", -220, -200);
	self.gpp_ui_wolf_counter_title.alpha = 1;
	self.gpp_ui_wolf_counter_title.hidewheninmenu = true;
	self.gpp_ui_wolf_counter_title.hidewhendead = true;
	self.gpp_ui_wolf_counter_title.color = (1, 1, 1);
	self.gpp_ui_wolf_counter_title setText("^8Wolf Counter");
	self.gpp_ui_wolf_counter_title.stored_text = "^8Wolf Counter";
	// init() on HudElement 'wolf_counter_one'
	self.gpp_ui_wolf_counter_one = createFontString("objective", 1.5);
	self.gpp_ui_wolf_counter_one setPoint("center", "center", -220, -185);
	self.gpp_ui_wolf_counter_one.alpha = 1;
	self.gpp_ui_wolf_counter_one.hidewheninmenu = true;
	self.gpp_ui_wolf_counter_one.hidewhendead = true;
	self.gpp_ui_wolf_counter_one.color = (1, 1, 1);
	self.gpp_ui_wolf_counter_one setValue(0);
	self.gpp_ui_wolf_counter_one.label = &"Wolf 1: ";
	self.gpp_ui_wolf_counter_one.stored_value = 0;
	// init() on HudElement 'wolf_counter_two'
	self.gpp_ui_wolf_counter_two = createFontString("objective", 1.5);
	self.gpp_ui_wolf_counter_two setPoint("center", "center", -220, -170);
	self.gpp_ui_wolf_counter_two.alpha = 1;
	self.gpp_ui_wolf_counter_two.hidewheninmenu = true;
	self.gpp_ui_wolf_counter_two.hidewhendead = true;
	self.gpp_ui_wolf_counter_two.color = (1, 1, 1);
	self.gpp_ui_wolf_counter_two setValue(0);
	self.gpp_ui_wolf_counter_two.label = &"Wolf 2: ";
	self.gpp_ui_wolf_counter_two.stored_value = 0;
	// init() on HudElement 'wolf_counter_three'
	self.gpp_ui_wolf_counter_three = createFontString("objective", 1.5);
	self.gpp_ui_wolf_counter_three setPoint("center", "center", -220, -155);
	self.gpp_ui_wolf_counter_three.alpha = 1;
	self.gpp_ui_wolf_counter_three.hidewheninmenu = true;
	self.gpp_ui_wolf_counter_three.hidewhendead = true;
	self.gpp_ui_wolf_counter_three.color = (1, 1, 1);
	self.gpp_ui_wolf_counter_three setValue(6);
	self.gpp_ui_wolf_counter_three.label = &"Wolf 3: ";
	self.gpp_ui_wolf_counter_three.stored_value = 6;
}

gpp_update()
{	// if_statement()
	if (isdefined(level.soul_catchers[0]))
	{
		// update() on HudElement 'wolf_counter_one'
		if (self.gpp_ui_wolf_counter_one.stored_value != 6 - level.soul_catchers[0].souls_received)
		{
			self.gpp_ui_wolf_counter_one setValue(6 - level.soul_catchers[0].souls_received);
			self.gpp_ui_wolf_counter_one.stored_value = 6 - level.soul_catchers[0].souls_received;
		}
		// update() on HudElement 'wolf_counter_two'
		if (self.gpp_ui_wolf_counter_two.stored_value != 6 - level.soul_catchers[1].souls_received)
		{
			self.gpp_ui_wolf_counter_two setValue(6 - level.soul_catchers[1].souls_received);
			self.gpp_ui_wolf_counter_two.stored_value = 6 - level.soul_catchers[1].souls_received;
		}
		// update() on HudElement 'wolf_counter_three'
		if (self.gpp_ui_wolf_counter_three.stored_value != 6 - level.soul_catchers[2].souls_received)
		{
			self.gpp_ui_wolf_counter_three setValue(6 - level.soul_catchers[2].souls_received);
			self.gpp_ui_wolf_counter_three.stored_value = 6 - level.soul_catchers[2].souls_received;
		}
	}
}

