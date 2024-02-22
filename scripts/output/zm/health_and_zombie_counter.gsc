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
	self iPrintLn("[^2health-and-zombie-counter^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
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
{	self thread gpp_custom_update_hud_health_counter();
	// setValue() on player
	self.zombies_left = level.zombie_total + get_current_zombie_count();
	self thread gpp_custom_update_hud_zombie_counter();
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

