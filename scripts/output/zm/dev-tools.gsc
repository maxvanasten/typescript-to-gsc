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
	self iPrintLn("[^2dev-tools^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
	self.gpp_ui_origin_x = createFontString("objective", 1.5);
	self.gpp_ui_origin_x setPoint("center", "center", 200, 50);
	self.gpp_ui_origin_x.alpha = 1;
	self.gpp_ui_origin_x.hidewheninmenu = true;
	self.gpp_ui_origin_x.hidewhendead = true;
	self.gpp_ui_origin_x.color = (1, 1, 1);
	self.gpp_ui_origin_x setValue(0);
	self.gpp_ui_origin_x.label = &"^5origin[0]: ^7";
	self.gpp_ui_origin_x.stored_value = undefined;
	self.gpp_ui_origin_y = createFontString("objective", 1.5);
	self.gpp_ui_origin_y setPoint("center", "center", 200, 65);
	self.gpp_ui_origin_y.alpha = 1;
	self.gpp_ui_origin_y.hidewheninmenu = true;
	self.gpp_ui_origin_y.hidewhendead = true;
	self.gpp_ui_origin_y.color = (1, 1, 1);
	self.gpp_ui_origin_y setValue(0);
	self.gpp_ui_origin_y.label = &"^5origin[1]: ^7";
	self.gpp_ui_origin_y.stored_value = undefined;
	self.gpp_ui_origin_z = createFontString("objective", 1.5);
	self.gpp_ui_origin_z setPoint("center", "center", 200, 80);
	self.gpp_ui_origin_z.alpha = 1;
	self.gpp_ui_origin_z.hidewheninmenu = true;
	self.gpp_ui_origin_z.hidewhendead = true;
	self.gpp_ui_origin_z.color = (1, 1, 1);
	self.gpp_ui_origin_z setValue(0);
	self.gpp_ui_origin_z.label = &"^5origin[2]: ^7";
	self.gpp_ui_origin_z.stored_value = undefined;
	self.gpp_ui_weapon = createFontString("objective", 1.5);
	self.gpp_ui_weapon setPoint("center", "center", 200, 95);
	self.gpp_ui_weapon.alpha = 1;
	self.gpp_ui_weapon.hidewheninmenu = true;
	self.gpp_ui_weapon.hidewhendead = true;
	self.gpp_ui_weapon.color = (1, 1, 1);
	self.gpp_ui_weapon setText(undefined);
	self.gpp_ui_weapon.stored_text = undefined;
	self.gpp_ui_map = createFontString("objective", 1.5);
	self.gpp_ui_map setPoint("center", "center", 200, 110);
	self.gpp_ui_map.alpha = 1;
	self.gpp_ui_map.hidewheninmenu = true;
	self.gpp_ui_map.hidewhendead = true;
	self.gpp_ui_map.color = (1, 1, 1);
	self.gpp_ui_map setText("^5map_name: ^7"+tolower(getdvar(#"mapname")));
	self.gpp_ui_map.stored_text = "^5map_name: ^7"+tolower(getdvar(#"mapname"));
}

ttg_update()
{
	if (self.gpp_ui_origin_x.stored_value != self.origin[0])
	{
		self.gpp_ui_origin_x setValue(self.origin[0]);
		self.gpp_ui_origin_x.stored_value = self.origin[0];
	}
	if (self.gpp_ui_origin_y.stored_value != self.origin[1])
	{
		self.gpp_ui_origin_y setValue(self.origin[1]);
		self.gpp_ui_origin_y.stored_value = self.origin[1];
	}
	if (self.gpp_ui_origin_z.stored_value != self.origin[2])
	{
		self.gpp_ui_origin_z setValue(self.origin[2]);
		self.gpp_ui_origin_z.stored_value = self.origin[2];
	}
	if (self.gpp_ui_weapon.stored_text != "^5weapon_name: ^7"+self getcurrentweapon())
	{
		self.gpp_ui_weapon setText("^5weapon_name: ^7"+self getcurrentweapon());
		self.gpp_ui_weapon.stored_text = "^5weapon_name: ^7"+self getcurrentweapon();
	}
}

