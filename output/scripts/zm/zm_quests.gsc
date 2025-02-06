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
	self iPrintLn("[^2zm-quests^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
	self.gpp_ui_quest_title = createFontString("objective", 1.5);
	self.gpp_ui_quest_title setPoint("center", "center", -225, -200);
	self.gpp_ui_quest_title.alpha = 1;
	self.gpp_ui_quest_title.hidewheninmenu = true;
	self.gpp_ui_quest_title.hidewhendead = true;
	self.gpp_ui_quest_title.color = (1, 1, 1);
	self.gpp_ui_quest_title setText("First quest");
	self.gpp_ui_quest_title.stored_text = "First quest";
	self.gpp_ui_quest_description = createFontString("objective", 1);
	self.gpp_ui_quest_description setPoint("center", "center", -225, -185);
	self.gpp_ui_quest_description.alpha = 1;
	self.gpp_ui_quest_description.hidewheninmenu = true;
	self.gpp_ui_quest_description.hidewhendead = true;
	self.gpp_ui_quest_description.color = (1, 1, 1);
	self.gpp_ui_quest_description setText("Kill 10 zombies.");
	self.gpp_ui_quest_description.stored_text = "Kill 10 zombies.";
	self thread zombie_quest_watcher();
}

ttg_update()
{
}

zombie_quest_watcher()
{
	if (self.kills >= 10)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

quest_reward()
{
	if (gpp_custom_zombie_quest_watcher())
	{
		self.score = self.score + 1500;
	}
}

