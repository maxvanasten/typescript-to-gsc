#include common_scripts\utility;
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
	self iPrintLn("[^2custom-mystery-box^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
	level.zombie_weapons = [];
	mapname = tolower(getdvar(#"mapname"));
	switch(mapname) {
		case "zm_buried":
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "fnfal_zm";
			level.zombie_weapons["fnfal_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "galil_zm";
			level.zombie_weapons["galil_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "m14_zm";
			level.zombie_weapons["m14_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "rottweil72_zm";
			level.zombie_weapons["rottweil72_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "ak74u_zm";
			level.zombie_weapons["ak74u_zm"] = gpp_struct_temp;
			break;
		case "zm_highrise":
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "fnfal_zm";
			level.zombie_weapons["fnfal_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "galil_zm";
			level.zombie_weapons["galil_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "m14_zm";
			level.zombie_weapons["m14_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "rottweil72_zm";
			level.zombie_weapons["rottweil72_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "ak74u_zm";
			level.zombie_weapons["ak74u_zm"] = gpp_struct_temp;
			break;
		case "zm_transit":
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "fnfal_zm";
			level.zombie_weapons["fnfal_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "galil_zm";
			level.zombie_weapons["galil_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "m14_zm";
			level.zombie_weapons["m14_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "rottweil72_zm";
			level.zombie_weapons["rottweil72_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "ak74u_zm";
			level.zombie_weapons["ak74u_zm"] = gpp_struct_temp;
			break;
		case "zm_tomb":
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "fnfal_zm";
			level.zombie_weapons["fnfal_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "galil_zm";
			level.zombie_weapons["galil_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "m14_zm";
			level.zombie_weapons["m14_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "870mcs_zm";
			level.zombie_weapons["870mcs_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "ak74u_zm";
			level.zombie_weapons["ak74u_zm"] = gpp_struct_temp;
			break;
		case "zm_prison":
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "fnfal_zm";
			level.zombie_weapons["fnfal_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "galil_zm";
			level.zombie_weapons["galil_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "m14_zm";
			level.zombie_weapons["m14_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "rottweil72_zm";
			level.zombie_weapons["rottweil72_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "ak47_zm";
			level.zombie_weapons["ak47_zm"] = gpp_struct_temp;
			break;
		default:
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "fnfal_zm";
			level.zombie_weapons["fnfal_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "galil_zm";
			level.zombie_weapons["galil_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "m14_zm";
			level.zombie_weapons["m14_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "rottweil72_zm";
			level.zombie_weapons["rottweil72_zm"] = gpp_struct_temp;
			gpp_struct_temp = spawnstruct();
			gpp_struct_temp.weapon_name = "ak74u_zm";
			level.zombie_weapons["ak74u_zm"] = gpp_struct_temp;
	}
}

gpp_update()
{}

