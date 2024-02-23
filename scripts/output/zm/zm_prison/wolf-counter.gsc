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
	// init() on HudElement 'wolf_counter_0'
	self.gpp_ui_wolf_counter_0 = createFontString("objective", 1.5);
	self.gpp_ui_wolf_counter_0 setPoint("center", "center", -220, -185);
	self.gpp_ui_wolf_counter_0.alpha = 1;
	self.gpp_ui_wolf_counter_0.hidewheninmenu = true;
	self.gpp_ui_wolf_counter_0.hidewhendead = true;
	self.gpp_ui_wolf_counter_0.color = (1, 1, 1);
	self.gpp_ui_wolf_counter_0 setValue(6);
	self.gpp_ui_wolf_counter_0.label = &"Wolf 1: ";
	self.gpp_ui_wolf_counter_0.stored_value = 6;
	// init() on HudElement 'wolf_counter_1'
	self.gpp_ui_wolf_counter_1 = createFontString("objective", 1.5);
	self.gpp_ui_wolf_counter_1 setPoint("center", "center", -220, -170);
	self.gpp_ui_wolf_counter_1.alpha = 1;
	self.gpp_ui_wolf_counter_1.hidewheninmenu = true;
	self.gpp_ui_wolf_counter_1.hidewhendead = true;
	self.gpp_ui_wolf_counter_1.color = (1, 1, 1);
	self.gpp_ui_wolf_counter_1 setValue(6);
	self.gpp_ui_wolf_counter_1.label = &"Wolf 2: ";
	self.gpp_ui_wolf_counter_1.stored_value = 6;
	// init() on HudElement 'wolf_counter_2'
	self.gpp_ui_wolf_counter_2 = createFontString("objective", 1.5);
	self.gpp_ui_wolf_counter_2 setPoint("center", "center", -220, -155);
	self.gpp_ui_wolf_counter_2.alpha = 1;
	self.gpp_ui_wolf_counter_2.hidewheninmenu = true;
	self.gpp_ui_wolf_counter_2.hidewhendead = true;
	self.gpp_ui_wolf_counter_2.color = (1, 1, 1);
	self.gpp_ui_wolf_counter_2 setValue(6);
	self.gpp_ui_wolf_counter_2.label = &"Wolf 3: ";
	self.gpp_ui_wolf_counter_2.stored_value = 6;
}

gpp_update()
{	// update() on HudElement 'wolf_counter_0'
	if (self.gpp_ui_wolf_counter_0.stored_value != 6 - level.soul_catchers[0].souls_received)
	{
		self.gpp_ui_wolf_counter_0 setValue(6 - level.soul_catchers[0].souls_received);
		self.gpp_ui_wolf_counter_0.stored_value = 6 - level.soul_catchers[0].souls_received;
	}
	// update() on HudElement 'wolf_counter_1'
	if (self.gpp_ui_wolf_counter_1.stored_value != 6 - level.soul_catchers[1].souls_received)
	{
		self.gpp_ui_wolf_counter_1 setValue(6 - level.soul_catchers[1].souls_received);
		self.gpp_ui_wolf_counter_1.stored_value = 6 - level.soul_catchers[1].souls_received;
	}
	// update() on HudElement 'wolf_counter_2'
	if (self.gpp_ui_wolf_counter_2.stored_value != 6 - level.soul_catchers[2].souls_received)
	{
		self.gpp_ui_wolf_counter_2 setValue(6 - level.soul_catchers[2].souls_received);
		self.gpp_ui_wolf_counter_2.stored_value = 6 - level.soul_catchers[2].souls_received;
	}
}

