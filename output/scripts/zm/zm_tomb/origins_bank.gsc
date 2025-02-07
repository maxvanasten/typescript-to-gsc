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
	self iPrintLn("[^2origins-bank^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
	hb_bank_file = fs_fopen("hb_bank_balance.txt", "read", false);
	self.hb_bank_balance = fs_read(hb_bank_file);
	if (self.hb_bank_balance == undefined)
	{
		self.hb_bank_balance = 0;
	}
	fs_remove("hb_bank_balance.txt", false);
;
	level thread setup_bank_deposit();
	level thread setup_bank_withdrawal();
	self.account_value = self maps\mp\zombies\_zm_stats::get_map_stat("depositBox", "zm_transit");
	self.gpp_ui_bank_balance_hud = createFontString("objective", 1.5);
	self.gpp_ui_bank_balance_hud setPoint("CENTER", "CENTER", -225, -205);
	self.gpp_ui_bank_balance_hud.alpha = 1;
	self.gpp_ui_bank_balance_hud.hidewheninmenu = true;
	self.gpp_ui_bank_balance_hud.hidewhendead = true;
	self.gpp_ui_bank_balance_hud.color = (1, 1, 1);
	self.gpp_ui_bank_balance_hud setValue(0);
	self.gpp_ui_bank_balance_hud.label = &"Bank balance: ^5";
	self.gpp_ui_bank_balance_hud.stored_value = 0;
}

ttg_update()
{
	self thread update_hud_bank_balance();
}

get_bank_origin()
{
	return (1955, 4851, -270);
}

setup_bank_deposit()
{
	level endon("end_game");
	origin = get_bank_origin();
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
	hb_bank_file = fs_fopen("hb_bank_balance.txt", "write", false);
	if (self.hb_bank_balance == undefined)
	{
		self.hb_bank_balance = 0;
	}
	result = fs_write(hb_bank_file, self.hb_bank_balance);
	self iprintlnbold("RESULT: "+result);
	fs_fclose(hb_bank_file);
}

withdraw()
{
	if (self.hb_bank_balance >= 1000)
	{
		self.score += 1000;
		self.hb_bank_balance -= 1000;
		self iprintlnbold("Withdrawn 1000 points. (Balance: "+self.hb_bank_balance+")");
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
		self.hb_bank_balance += 1000;
		self iprintlnbold("Deposited 1000 points. (Balance: "+self.hb_bank_balance+")");
		self save_stats();
	}
	else
	{
		self iprintlnbold("Not enough points.");
	}
}

update_hud_bank_balance()
{
	if (self.gpp_ui_bank_balance_hud.stored_value != self.hb_bank_balance)
	{
		self.gpp_ui_bank_balance_hud setValue(self.hb_bank_balance);
		self.gpp_ui_bank_balance_hud.stored_value = self.hb_bank_balance;
	}
	wait 0.5;
}

