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

    self thread ttg_init();

    for ( ;; )
    {
        self thread ttg_update();
        wait 0.05;
    }
}

ttg_init()
{
	self iPrintLn("[^2origins-bank^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
	level thread setup_bank_deposit();
	level thread setup_bank_withdrawal();
	self.account_value = self maps\mp\zombies\_zm_stats::get_map_stat("depositBox", "zm_transit");
}

ttg_update()
{
}

setup_bank_deposit()
{
	level endon("end_game");
	origin = (1955, 4851, -270);
	trigger_deposit = spawn("trigger_radius", origin, 0, 50, 50);
	trigger_deposit setCursorHint("HINT_NOICON");
	trigger_deposit setHintString("^3[{+activate}]^7 to deposit 1000 points to the bank");
	while (true)
	{
		trigger_deposit waittill("trigger", player);
		if (player usebuttonpressed())
		{
			player thread deposit();
			wait 0.5;
		}
		wait 0.05;
	}
}

setup_bank_withdrawal()
{
	level endon("end_game");
	origin = (2902, 5083, -350);
	trigger_withdraw = spawn("trigger_radius", origin, 0, 50, 50);
	trigger_withdraw setCursorHint("HINT_NOICON");
	trigger_withdraw setHintString("^3[{+activate}]^7 to withdraw 1000 points from the bank");
	while (true)
	{
		trigger_withdraw waittill("trigger", player);
		if (player usebuttonpressed())
		{
			player thread withdraw();
			wait 0.5;
		}
		wait 0.05;
	}
}

save_stats()
{
	self maps\mp\zombies\_zm_stats::set_map_stat("depositBox", self.account_value, "zm_transit");
	self uploadleaderboards();
	self maps\mp\zombies\_zm_stats::uploadstatssoon();
}

withdraw()
{
	if (self.account_value >= 1)
	{
		self.score += 1000;
		self.account_value -= 1;
		self iprintlnbold("Withdrawn 1000 points. (Balance: "+(self.account_value*1000)+")");
		self save_stats();
	}
	else
	{
		self iprintlnbold("Not enough points.");
	}
}

deposit()
{
	if (self.score >= 1000)
	{
		self.score -= 1000;
		self.account_value += 1;
		self iprintlnbold("Deposited 1000 points. (Balance: "+(self.account_value*1000)+")");
		self save_stats();
	}
	else
	{
		self iprintlnbold("Not enough points.");
	}
}

