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
	self iPrintLn("[^2upgrade-shop^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");
	self.gpp_ui_upgrade_prices = createFontString("objective", 1.2);;
	self.gpp_ui_upgrade_prices setPoint("CENTER", "CENTER", 200, -150);;
	self.gpp_ui_upgrade_prices.alpha = 0;;
	self.gpp_ui_upgrade_prices.color = (1, 1, 1);;
	self.gpp_ui_upgrade_prices hidewheninmenu = true;;
	self.gpp_ui_upgrade_prices hidewhendead = true;;
	switch(tolower(getdvar(#"mapname"))) {
		case "zm_tomb":
			shop_pos_1 = (2350, 4700, -301);
			shop_pos_2 = (2100, 5100, -301);
			thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);;
			thread setup_upgrade_shop(shop_pos_2[0], shop_pos_2[1], shop_pos_2[2]);;
			break;
		case "zm_prison":
			shop_pos_1 = (700, 10670, 1336);
			shop_pos_2 = (1200, 10800, 1336);
			thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);;
			thread setup_upgrade_shop(shop_pos_2[0], shop_pos_2[1], shop_pos_2[2]);;
			break;
		case "zm_buried":
			shop_pos_1 = (150, 150, 10);
			shop_pos_2 = (400, -100, 10);
			thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);;
			thread setup_upgrade_shop(shop_pos_2[0], shop_pos_2[1], shop_pos_2[2]);;
			break;
		case "zm_highrise":
			shop_pos_1 = (100, 100, 500);
			thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);;
			break;
		case "zm_transit":
			shop_pos_1 = (-6361, 5480, -55);
			thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);;
			break;
		case "zm_nuked":
			shop_pos_1 = (-237, 996, -63);
			thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);;
			break;
		default:
	}
	print("^2Upgrade Shop loaded! Find the glowing crates to buy upgrades.");
}

ttg_update()
{
	if (isdefined(self.in_upgrade_shop) && self.in_upgrade_shop != 1)
	{
		self.gpp_ui_upgrade_prices.alpha = 0;;
	}
}

setup_upgrade_shop(x, y, z)
{
	level endon("end_game");
	shop_trigger = spawn("trigger_radius", (x, y, z+30), 0, 60, 60);
	shop_trigger setCursorHint("HINT_NOICON");
	shop_trigger setHintString("^3[{+activate}]^7 Upgrade Shop");
	shop_model = spawn("script_model", (x, y, z+20));
	shop_model setModel("ch_crate_bonus_01");
	while (true)
	{
		shop_trigger waittill("trigger", player);
		if (player usebuttonpressed())
		{
			if (!isdefined(player.in_upgrade_shop))
			{
				self.in_upgrade_shop = 1;
				player thread open_shop_menu;
				wait 0.5;
			}
		}
	}
}

open_shop_menu()
{
	self gpp_ui_upgrade_prices setText("^5UPGRADE PRICES:

^3Weapons:
  PAP: 5000
  Double PAP: 10000

^3Perks:
  Random: 2500

^3Abilities:
  Powerup: 1500");
	self.gpp_ui_upgrade_prices.alpha = 1;;
	self iprintlnbold("^2Welcome to the Upgrade Shop!
^3Press USE to buy upgrades");
	self thread shop_purchase_loop();
}

shop_purchase_loop()
{
	level endon("disconnect");
	level endon("in_upgrade_shop");
	while (true)
	{
		if (self usebuttonpressed())
		{
			if (randomint(3) == 0)
			{
				if (self.score >= 5000 && self getcurrentweapon() != "knife_zm")
				{
					self.score = self.score - 5000;
					current_weapon = self getcurrentweapon();
					upgraded_weapon = maps\mp\zombies\_zm_weapons::get_upgrade_weapon(current_weapon, 1);
					if (isdefined(upgraded_weapon)) {
						self takeweapon(current_weapon);
						self giveweapon( upgraded_weapon, 0, self maps\mp\zombies\_zm_weapons::get_pack_a_punch_weapon_options( upgraded_weapon ) );
						self givestartammo( upgraded_weapon );
						self switchtoweapon( upgraded_weapon );
					}
					self iprintlnbold("^2Weapon Upgraded!");
				}
				else
				{
					if (self.score < 5000)
					{
						self iprintlnbold("^1Need 5000 points for upgrade!");
					}
					else
					{
						self iprintlnbold("^1Equip a weapon first!");
					}
				}
			}
			else
			{
				if (randomint(2) == 0)
				{
					if (self.score >= 2500)
					{
						self.score = self.score - 2500;
						self maps\mp\zombies\_zm_perks::give_perk("specialty_armorvest");
						self iprintlnbold("^2Juggernog Acquired!");
					}
					else
					{
						self iprintlnbold("^1Need 2500 points!");
					}
				}
				else
				{
					if (self.score >= 1500)
					{
						self.score = self.score - 1500;
						if (randomint(2) == 0)
						{
							self iprintlnbold("^2Double Points!");
						}
						else
						{
							self iprintlnbold("^1INSTA-KILL ACTIVE!");
						}
					}
					else
					{
						self iprintlnbold("^1Need 1500 points!");
					}
				}
			}
			wait 0.5;
		}
		if (!isdefined(self.in_upgrade_shop))
		{
			self.gpp_ui_upgrade_prices.alpha = 0;;
			self notify("exit_shop_loop");;
		}
		wait 0.1;
	}
}

exit_shop_loop()
{
	level endon("disconnect");
	self waittill("exit_shop_loop");;
	self.gpp_ui_upgrade_prices.alpha = 0;;
	self.in_upgrade_shop = 0;
}

