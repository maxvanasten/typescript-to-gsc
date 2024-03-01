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
	self iPrintLn("[^2gobblegums^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
}

gpp_update()
{}

gpp_custom_player_load_gobblegum(index)
{
	self.current_gobblegum_index = index;
	self.gobblegum_activations = level.gobblegums[self.current_gobblegum_index].activations;
}

gpp_custom_activation_monitor()
{
	while (true)
	{
		if (self adsbuttonpressed() && self usebuttonpressed())
		{
			self iprintlnbold("^6Activating gobblegum: ips");
			self activate_gobblegum("ips");
			wait 3;
		}
	}
}

gpp_custom_activate_gobblegum(gobblegum_identifier)
{
	switch(self.current_gobblegum_identifier) {
		case ips:
			self gpp_custom_gg_ips();
			break;
		default:
	}
}

gpp_custom_gg_ips()
{
	self iprintlnbold("^5ACTIVATE");
	wait 10;
	self iprintlnbold("^1DEACTIVATE");
}

