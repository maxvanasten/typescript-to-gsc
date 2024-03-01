interface WeaponsList {
	mp: {
		[weapon: string]: string;
	};
	zm_tomb: {
		[weapon: string]: {
			default: string;
			upgraded?: string;
			extclip?: string;
			extclip_upgraded?: string;
			grenade_launcher?: string;
		};
	};
	zm_prison: {
		[weapon: string]: {
			default: string;
			upgraded?: string;
			extclip?: string;
			extclip_upgraded?: string;
			grenade_launcher?: string;
		};
	};
	zm_buried: {
		[weapon: string]: {
			default: string;
			upgraded?: string;
			extclip?: string;
			extclip_upgraded?: string;
			grenade_launcher?: string;
		};
	};
	zm_highrise: {
		[weapon: string]: {
			default: string;
			upgraded?: string;
			extclip?: string;
			extclip_upgraded?: string;
			grenade_launcher?: string;
		};
	};
	zm_nuked: {
		[weapon: string]: {
			default: string;
			upgraded?: string;
			extclip?: string;
			extclip_upgraded?: string;
			grenade_launcher?: string;
		};
	};
	zm_transit: {
		[weapon: string]: {
			default: string;
			upgraded?: string;
			extclip?: string;
			extclip_upgraded?: string;
			grenade_launcher?: string;
		};
	};
	zm_transit_gump_town: {
		[weapon: string]: {
			default: string;
			upgraded?: string;
			extclip?: string;
			extclip_upgraded?: string;
			grenade_launcher?: string;
		};
	};
	zm_transit_gump_farm: {
		[weapon: string]: {
			default: string;
			upgraded?: string;
			extclip?: string;
			extclip_upgraded?: string;
			grenade_launcher?: string;
		};
	};
}

const Weapons = {
	mp: {
		// SMG
		mp7_mp: `"mp7_mp"`,
		pdw57_mp: `"pdw57_mp"`,
		vector_mp: `"vector_mp"`,
		insas_mp: `"insas_mp"`,
		qcw05_mp: `"qcw05_mp"`,
		evoskorpion_mp: `"evoskorpion_mp"`,
		peacekeeper_mp: `"peacekeeper_mp"`,
		// Assault Rifles
		tar21_mp: `"tar21_mp"`,
		type95_mp: `"type95_mp"`,
		sig556_mp: `"sig556_mp"`,
		sa58_mp: `"sa58_mp"`,
		hk416_mp: `"hk416_mp"`,
		scar_mp: `"scar_mp"`,
		saritch_mp: `"saritch_mp"`,
		xm8_mp: `"xm8_mp"`,
		an94_mp: `"an94_mp"`,
		// Shotguns
		mcs870_mp: `"870mcs_mp"`,
		saiga12_mp: `"saiga12_mp"`,
		ksg_mp: `"ksg_mp"`,
		srm1216_mp: `"srm1216_mp"`,
		// LMG
		mk48_mp: `"mk48_mp"`,
		qbb95_mp: `"qbb95_mp"`,
		lsat_mp: `"lsat_mp"`,
		hamr_mp: `"hamr_mp"`,
		// Snipers
		svu_mp: `"svu_mp"`,
		dsr50_mp: `"dsr50_mp"`,
		ballista_mp: `"ballista_mp"`,
		as50_mp: `"as50_mp"`,
		// Pistols
		kard_dw_mp: `"kard_dw_mp"`,
		fnp45_dw_mp: `"fnp45_dw_mp"`,
		fiveseven_dw_mp: `"fiveseven_dw_mp"`,
		judge_dw_mp: `"judge_dw_mp"`,
		beretta93r_dw_mp: `"beretta93r_dw_mp"`,
		fiveseven_mp: `"fiveseven_mp"`,
		fnp45_mp: `"fnp45_mp"`,
		beretta93r_mp: `"beretta93r_mp"`,
		judge_mp: `"judge_mp"`,
		kard_mp: `"kard_mp"`,
		// Launcher
		m32_mp: `"m32_mp"`,
		smaw_mp: `"smaw_mp"`,
		fhj18_mp: `"fhj18_mp"`,
		usrpg_mp: `"usrpg_mp"`,
		// Special
		knife_mp: `"knife_mp"`,
		knife_held_mp: `"knife_held_mp"`,
		minigun_mp: `"minigun_mp"`,
		riotshield_mp: `"riotshield_mp"`,
		crossbow_mp: `"crossbow_mp"`,
		knife_ballistic_mp: `"knife_ballistic_mp"`
	},
	zm_tomb: {
		dsr50: {
			default: `"dsr50_zm"`,
			upgraded: `"dsr50_upgraded_zm"`
		},
		ballista: {
			default: `"ballista_zm"`,
			upgraded: `"ballista_upgraded_zm"`
		},
		qcw05: {
			default: `"qcw05_zm"`,
			upgraded: `"qcw05_upgraded_zm"`
		},
		ak74u: {
			default: `"ak74u_zm"`,
			upgraded: `"ak74u_upgraded_zm"`,
			extclip: `"ak74u_extclip_zm"`,
			extclip_upgraded: `"ak74u_extclip_upgraded_zm"`
		},
		thompson: {
			default: `"thompson_zm"`,
			upgraded: `"thompson_upgraded_zm"`
		},
		pdw57: {
			default: `"pdw57_zm"`,
			upgraded: `"pdw57_upgraded_zm"`
		},
		mp40: {
			default: `"mp40_zm"`,
			upgraded: `"mp40_upgraded_zm"`
		},
		mp40_stalker: {
			default: `"mp40_stalker_zm"`
		},
		skorpion: {
			default: `"evoskorpion_zm"`,
			upgraded: `"evoskorpion_upgraded_zm"`
		},
		fnfal: {
			default: `"fnfal_zm"`,
			upgraded: `"fnfal_upgraded_zm"`
		},
		m14: {
			default: `"m14_zm"`,
			upgraded: `"m14_upgraded_zm"`
		},
		mp44: {
			default: `"mp44_zm"`,
			upgraded: `"mp44_upgraded_zm"`
		},
		type95: {
			default: `"type95_zm"`,
			upgraded: `"type95_upgraded_zm"`
		},
		galil: {
			default: `"galil_zm"`,
			upgraded: `"galil_upgraded_zm"`
		},
		scar: {
			default: `"scar_zm"`,
			upgraded: `"scar_upgraded_zm"`
		},
		r870mcs: {
			default: `"870mcs_zm"`,
			upgraded: `"870mcs_upgraded_zm"`
		},
		ksg: {
			default: `"ksg_zm"`,
			upgraded: `"ksg_upgraded_zm"`
		},
		m1216: {
			default: `"srm1216_zm"`,
			upgraded: `"srm1216_upgraded_zm"`
		},
		mg08: {
			default: `"mg08_zm"`,
			upgraded: `"mg08_upgraded_zm"`
		},
		hamr: {
			default: `"hamr_zm"`,
			upgraded: `"hamr_upgraded_zm"`
		},
		c96: {
			default: `"c96_zm"`,
			upgraded: `"c96_upgraded_zm"`
		},
		python: {
			default: `"python_zm"`,
			upgraded: `"python_upgraded_zm"`
		},
		kard: {
			default: `"kard_zm"`,
			upgraded: `"kard_upgraded_zm"`
		},
		fiveseven: {
			default: `"fiveseven_zm"`,
			upgraded: `"fiveseven_upgraded_zm"`
		},
		fivesevendw: {
			default: `"fivesevendw_zm"`,
			upgraded: `"fivesevendw_upgraded_zm"`
		},
		beretta93r: {
			default: `"beretta93r_zm"`,
			upgraded: `"beretta93r_upgraded_zm"`
		},
		beretta93r_extclip: {
			default: `"beretta93r_extclip_zm"`
		},
		m32: {
			default: `"m32_zm"`,
			upgraded: `"m32_upgraded_zm"`
		},
		ray_gun: {
			default: `"ray_gun_zm"`,
			upgraded: `"ray_gun_upgraded_zm"`
		},
		raygun_mark2: {
			default: `"raygun_mark2_zm"`,
			upgraded: `"raygun_mark2_upgraded_zm"`
		},
		fire_staff: {
			default: `"staff_fire_zm"`,
			upgraded: `"staff_fire_upgraded_zm"`
		},
		water_staff: {
			default: `"staff_water_zm"`,
			upgraded: `"staff_water_upgraded_zm"`
		},
		air_staff: {
			default: `"staff_air_zm"`,
			upgraded: `"staff_air_upgraded_zm"`
		},
		lightning_staff: {
			default: `"staff_lightning_zm"`,
			upgraded: `"staff_lightning_upgraded_zm"`
		},
		revive_staff: { default: `"staff_revive_zm"` },
		cymbal_monkey: { default: `"cymbal_monkey_zm"` },
		beacon: { default: `"beacon_zm"` },
		sticky_grenade: { default: `"sticky_grenade_zm"` },
		frag_grenade: { default: `"frag_grenade_zm"` },
		claymore: { default: `"claymore_zm"` },
		emp_grenade: { default: `"emp_grenade_zm"` },
		knife: { default: `"knife_zm"` },
		one_inch_punch: { default: `"one_inch_punch_zm"` },
		one_inch_punch_upgraded: { default: `"one_inch_punch_upgraded_zm"` },
		equip_dieseldrone: { default: `"equip_dieseldrone_zm"` },
		shield: { default: `"tomb_shield_zm"` }
	},
	zm_prison: {
		dsr50: {
			default: `"dsr50_zm"`,
			upgraded: `"dsr50_upgraded_zm"`
		},
		barretm82: {
			default: `"barretm82_zm"`,
			upgraded: `"barretm82_upgraded_zm"`
		},
		svu: {
			default: `"svu_zm"`,
			upgraded: `"svu_upgraded_zm"`
		},
		thompson: {
			default: `"thompson_zm"`,
			upgraded: `"thompson_upgraded_zm"`
		},
		mp5k: {
			default: `"mp5k_zm"`,
			upgraded: `"mp5k_upgraded_zm`
		},
		pdw57: {
			default: `"pdw57_zm"`,
			upgraded: `"pdw57_upgraded_zm"`
		},
		uzi: {
			default: `"uzi_zm"`,
			upgraded: `"uzi_upgraded_zm"`
		},
		fnfal: {
			default: `"fnfal_zm"`,
			upgraded: `"fnfal_upgraded_zm"`
		},
		m14: {
			default: `"m14_zm"`,
			upgraded: `"m14_upgraded_zm"`
		},
		tar21: {
			default: `"tar21_zm"`,
			upgraded: `"tar21_upgraded_zm"`
		},
		galil: {
			default: `"galil_zm"`,
			upgraded: `"galil_upgraded_zm"`
		},
		ak47: {
			default: `"ak47_zm"`,
			upgraded: `"ak47_upgraded_zm"`
		},
		r870mcs: {
			default: `"870mcs_zm"`,
			upgraded: `"870mcs_upgraded_zm"`
		},
		olympia: {
			default: `"rottweil72_zm"`,
			upgraded: `"rottweil72_upgraded_zm"`
		},
		s12: {
			default: `"saiga12_zm"`,
			upgraded: `"saiga12_upgraded_zm"`
		},
		m1216: {
			default: `"srm1216_zm"`,
			upgraded: `"srm1216_upgraded_zm"`
		},
		lsat: {
			default: `"lsat_zm"`,
			upgraded: `"lsat_upgraded_zm"`
		},
		deathmachine: {
			default: `"minigun_alcatraz_zm"`,
			upgraded: `"minigun_alcatraz_upgraded_zm"`
		},
		m1911: {
			default: `"m1911_zm"`,
			upgraded: `"m1911_upgraded_zm"`
		},
		judge: {
			default: `"judge_zm"`,
			upgraded: `"judge_upgraded_zm"`
		},
		fiveseven: {
			default: `"fiveseven_zm"`,
			upgraded: `"fiveseven_upgraded_zm"`
		},
		fivesevendw: {
			default: `"fivesevendw_zm"`,
			upgraded: `"fivesevendw_upgraded_zm"`
		},
		beretta93r: {
			default: `"beretta93r_zm"`,
			upgraded: `"beretta93r_upgraded_zm"`
		},
		usrpg: {
			default: `"usrpg_zm"`,
			upgraded: `"usrpg_upgraded_zm"`
		},
		m32: {
			default: `"m32_zm"`,
			upgraded: `"m32_upgraded_zm"`
		},
		knife_ballistic: {
			default: `"knife_ballistic_zm"`,
			upgraded: `"knife_ballistic_upgraded_zm"`
		},
		knife_ballistic_bowie: {
			default: `"knife_ballistic_bowie_zm"`,
			upgraded: `"knife_ballistic_bowie_upgraded_zm"`
		},
		knife_ballistic_no_melee: {
			default: `"knife_ballistic_no_melee_zm"`,
			upgraded: `"knife_ballistic_no_melee_upgraded_zm"`
		},
		ray_gun: {
			default: `"ray_gun_zm"`,
			upgraded: `"ray_gun_upgraded_zm"`
		},
		raygun_mark2: {
			default: `"raygun_mark2_zm"`,
			upgraded: `"raygun_mark2_upgraded_zm"`
		},
		blundergat: {
			default: `"blundergat_zm"`,
			upgraded: `"blundergat_upgraded_zm"`
		},
		acidgat: {
			default: `"blundersplat_zm"`,
			upgraded: `"blundersplat_upgraded_zm"`
		},
		willy_pete: { default: `"willy_pete_zm"` },
		sticky_grenade: { default: `"sticky_grenade_zm"` },
		frag_grenade: { default: `"frag_grenade_zm"` },
		claymore: { default: `"claymore_zm"` },
		bouncing_tomahawk: { default: `"bouncing_tomahawk_zm"` },
		upgraded_tomahawk: { default: `"upgraded_tomahawk_zm"` },
		knife: { default: `"knife_zm"` },
		knife_alcatraz: { default: `"knife_zm_alcatraz"` },
		spoon: { default: `"spoon_zm_alcatraz"` },
		spork: { default: `"spork_zm_alcatraz"` },
		alcatraz_shield: { default: `"alcatraz_shield_zm"` }
	},
	zm_buried: {
		// Snipers
		dsr50: {
			default: `"dsr50_zm"`,
			upgraded: `"dsr50_upgraded_zm"`
		},
		barretm82: {
			default: `"barretm82_zm"`,
			upgraded: `"barretm82_upgraded_zm"`
		},
		svu: {
			default: `"svu_zm"`,
			upgraded: `"svu_upgraded_zm"`
		},
		// SMG
		ak74u: {
			default: `"ak74u_zm"`,
			upgraded: `"ak74u_upgraded_zm"`
		},
		mp5k: {
			default: `"mp5k_zm"`,
			upgraded: `"mp5k_upgraded_zm`
		},
		pdw57: {
			default: `"pdw57_zm"`,
			upgraded: `"pdw57_upgraded_zm"`
		},
		// AR
		fnfal: {
			default: `"fnfal_zm"`,
			upgraded: `"fnfal_upgraded_zm"`
		},
		m14: {
			default: `"m14_zm"`,
			upgraded: `"m14_upgraded_zm"`
		},
		smr: {
			default: `"saritch_zm"`,
			upgraded: `"saritch_upgraded_zm"`
		},
		m16: {
			default: `"m16_zm"`,
			upgraded: `"m16_gl_upgraded_zm"`
		},
		tar21: {
			default: `"tar21_zm"`,
			upgraded: `"tar21_upgraded_zm"`,
			grenade_launcher: `"gl_tar21_zm"`
		},
		galil: {
			default: `"galil_zm"`,
			upgraded: `"galil_upgraded_zm"`
		},
		an94: {
			default: `"an94_zm"`,
			upgraded: `"an94_upgraded_zm"`
		},
		// Shotgun
		r870mcs: {
			default: `"870mcs_zm"`,
			upgraded: `"870mcs_upgraded_zm"`
		},
		olympia: {
			default: `"rottweil72_zm"`,
			upgraded: `"rottweil72_upgraded_zm"`
		},
		s12: {
			default: `"saiga12_zm"`,
			upgraded: `"saiga12_upgraded_zm"`
		},
		m1216: {
			default: `"srm1216_zm"`,
			upgraded: `"srm1216_upgraded_zm"`
		},
		// LMG
		lsat: {
			default: `"lsat_zm"`,
			upgraded: `"lsat_upgraded_zm"`
		},
		hamr: {
			default: `"hamr_zm"`,
			upgraded: `"hamr_upgraded_zm"`
		},
		// Pistol
		m1911: {
			default: `"m1911_zm"`,
			upgraded: `"m1911_upgraded_zm"`
		},
		rnma: {
			default: `"rnma_zm"`,
			upgraded: `"rnma_upgraded_zm"`
		},
		judge: {
			default: `"judge_zm"`,
			upgraded: `"judge_upgraded_zm"`
		},
		kard: {
			default: `"kard_zm"`,
			upgraded: `"kard_upgraded_zm"`
		},
		fiveseven: {
			default: `"fiveseven_zm"`,
			upgraded: `"fiveseven_upgraded_zm"`
		},
		fivesevendw: {
			default: `"fivesevendw_zm"`,
			upgraded: `"fivesevendw_upgraded_zm"`
		},
		beretta93r: {
			default: `"beretta93r_zm"`,
			upgraded: `"beretta93r_upgraded_zm"`
		},
		// Launcher
		usrpg: {
			default: `"usrpg_zm"`,
			upgraded: `"usrpg_upgraded_zm"`
		},
		m32: {
			default: `"m32_zm"`,
			upgraded: `"m32_upgraded_zm"`
		},
		// Special
		knife_ballistic: {
			default: `"knife_ballistic_zm"`,
			upgraded: `"knife_ballistic_upgraded_zm"`
		},
		knife_ballistic_bowie: {
			default: `"knife_ballistic_bowie_zm"`,
			upgraded: `"knife_ballistic_bowie_upgraded_zm"`
		},
		knife_ballistic_no_melee: {
			default: `"knife_ballistic_no_melee_zm"`,
			upgraded: `"knife_ballistic_no_melee_upgraded_zm"`
		},
		ray_gun: {
			default: `"ray_gun_zm"`,
			upgraded: `"ray_gun_upgraded_zm"`
		},
		raygun_mark2: {
			default: `"raygun_mark2_zm"`,
			upgraded: `"raygun_mark2_upgraded_zm"`
		},
		slowgun: {
			default: `"slowgun_zm"`,
			upgraded: `"slowgun_upgraded_zm"`
		},
		// Equipment
		cymbal_monkey: { default: `"cymbal_monkey_zm"` },
		frag_grenade: { default: `"frag_grenade_zm"` },
		claymore: { default: `"claymore_zm"` },
		time_bomb: { default: `"time_bomb_zm"` },
		// Melee
		knife: { default: `"knife_zm"` },
		bowie_knife: { default: `"bowie_knife_zm"` },
		tazer_knuckles: { default: `"tazer_knuckles_zm"` },
		// Buildables
		equip_turbine: { default: `"equip_turbine_zm"` },
		equip_springpad: { default: `"equip_springpad_zm"` },
		equip_subwoofer: { default: `"equip_subwoofer_zm"` },
		equip_headchopper: { default: `"equip_headchopper_zm"` }
	},
	zm_highrise: {
		dsr50: {
			default: `"dsr50_zm"`,
			upgraded: `"dsr50_upgraded_zm"`
		},
		barretm82: {
			default: `"barretm82_zm"`,
			upgraded: `"barretm82_upgraded_zm"`
		},
		svu: {
			default: `"svu_zm"`,
			upgraded: `"svu_upgraded_zm"`
		},
		ak74u: {
			default: `"ak74u_zm"`,
			upgraded: `"ak74u_upgraded_zm"`
		},
		mp5k: {
			default: `"mp5k_zm"`,
			upgraded: `"mp5k_upgraded_zm`
		},
		pdw57: {
			default: `"pdw57_zm"`,
			upgraded: `"pdw57_upgraded_zm"`
		},
		qcw05: {
			default: `"qcw05_zm"`,
			upgraded: `"qcw05_upgraded_zm"`
		},
		fnfal: {
			default: `"fnfal_zm"`,
			upgraded: `"fnfal_upgraded_zm"`
		},
		m14: {
			default: `"m14_zm"`,
			upgraded: `"m14_upgraded_zm"`
		},
		smr: {
			default: `"saritch_zm"`,
			upgraded: `"saritch_upgraded_zm"`
		},
		m16: {
			default: `"m16_zm"`,
			upgraded: `"m16_gl_upgraded_zm"`
		},
		tar21: {
			default: `"tar21_zm"`,
			upgraded: `"tar21_upgraded_zm"`,
			grenade_launcher: `"gl_tar21_zm"`
		},
		galil: {
			default: `"galil_zm"`,
			upgraded: `"galil_upgraded_zm"`
		},
		an94: {
			default: `"an94_zm"`,
			upgraded: `"an94_upgraded_zm"`
		},
		type95: {
			default: `"type95_zm"`,
			upgraded: `"type95_upgraded_zm"`
		},
		xm8: {
			default: `"xm8_zm"`,
			upgraded: `"xm8_upgraded_zm"`
		},
		r870mcs: {
			default: `"870mcs_zm"`,
			upgraded: `"870mcs_upgraded_zm"`
		},
		olympia: {
			default: `"rottweil72_zm"`,
			upgraded: `"rottweil72_upgraded_zm"`
		},
		s12: {
			default: `"saiga12_zm"`,
			upgraded: `"saiga12_upgraded_zm"`
		},
		m1216: {
			default: `"srm1216_zm"`,
			upgraded: `"srm1216_upgraded_zm"`
		},
		rpd: {
			default: `"rpd_zm"`,
			upgraded: `"rpd_upgraded_zm"`
		},
		hamr: {
			default: `"hamr_zm"`,
			upgraded: `"hamr_upgraded_zm"`
		},
		m1911: {
			default: `"m1911_zm"`,
			upgraded: `"m1911_upgraded_zm"`
		},
		python: {
			default: `"python_zm"`,
			upgraded: `"python_upgraded_zm"`
		},
		judge: {
			default: `"judge_zm"`,
			upgraded: `"judge_upgraded_zm"`
		},
		kard: {
			default: `"kard_zm"`,
			upgraded: `"kard_upgraded_zm"`
		},
		fiveseven: {
			default: `"fiveseven_zm"`,
			upgraded: `"fiveseven_upgraded_zm"`
		},
		fivesevendw: {
			default: `"fivesevendw_zm"`,
			upgraded: `"fivesevendw_upgraded_zm"`
		},
		beretta93r: {
			default: `"beretta93r_zm"`,
			upgraded: `"beretta93r_upgraded_zm"`
		},
		usrpg: {
			default: `"usrpg_zm"`,
			upgraded: `"usrpg_upgraded_zm"`
		},
		m32: {
			default: `"m32_zm"`,
			upgraded: `"m32_upgraded_zm"`
		},

		knife_ballistic: {
			default: `"knife_ballistic_zm"`,
			upgraded: `"knife_ballistic_upgraded_zm"`
		},
		knife_ballistic_bowie: {
			default: `"knife_ballistic_bowie_zm"`,
			upgraded: `"knife_ballistic_bowie_upgraded_zm"`
		},
		knife_ballistic_no_melee: {
			default: `"knife_ballistic_no_melee_zm"`,
			upgraded: `"knife_ballistic_no_melee_upgraded_zm"`
		},

		ray_gun: {
			default: `"ray_gun_zm"`,
			upgraded: `"ray_gun_upgraded_zm"`
		},
		raygun_mark2: {
			default: `"raygun_mark2_zm"`,
			upgraded: `"raygun_mark2_upgraded_zm"`
		},
		sliquifier: {
			default: `"sliquifier_zm"`,
			upgraded: `"sliquifier_upgraded_zm"`
		},

		cymbal_monkey: { default: `"cymbal_monkey_zm"` },
		sticky_grenade: { default: `"sticky_grenade_zm"` },
		frag_grenade: { default: `"frag_grenade_zm"` },
		claymore: { default: `"claymore_zm"` },

		knife: { default: `"knife_zm"` },
		bowie_knife: { default: `"bowie_knife_zm"` },
		tazer_knuckles: { default: `"tazer_knuckles_zm"` },

		equip_springpad: { default: `"equip_springpad_zm"` }
	},
	zm_nuked: {},
	zm_transit: {
		dsr50: {
			default: `"dsr50_zm"`,
			upgraded: `"dsr50_upgraded_zm"`
		},
		barretm82: {
			default: `"barretm82_zm"`,
			upgraded: `"barretm82_upgraded_zm"`
		},
		qcw05: {
			default: `"qcw05_zm"`,
			upgraded: `"qcw05_upgraded_zm"`
		},
		ak74u: {
			default: `"ak74u_zm"`,
			upgraded: `"ak74u_upgraded_zm"`
		},
		mp5k: {
			default: `"mp5k_zm"`,
			upgraded: `"mp5k_upgraded_zm`
		},
		pdw57: {
			default: `"pdw57_zm"`,
			upgraded: `"pdw57_upgraded_zm"`
		},
		fnfal: {
			default: `"fnfal_zm"`,
			upgraded: `"fnfal_upgraded_zm"`
		},
		m14: {
			default: `"m14_zm"`,
			upgraded: `"m14_upgraded_zm"`
		},
		smr: {
			default: `"saritch_zm"`,
			upgraded: `"saritch_upgraded_zm"`
		},
		m16: {
			default: `"m16_zm"`,
			upgraded: `"m16_gl_upgraded_zm"`
		},
		tar21: {
			default: `"tar21_zm"`,
			upgraded: `"tar21_upgraded_zm"`,
			grenade_launcher: `"gl_tar21_zm"`
		},
		type95: {
			default: `"type95_zm"`,
			upgraded: `"type95_upgraded_zm"`
		},
		galil: {
			default: `"galil_zm"`,
			upgraded: `"galil_upgraded_zm"`
		},
		xm8: {
			default: `"xm8_zm"`,
			upgraded: `"xm8_upgraded_zm"`
		},
		r870mcs: {
			default: `"870mcs_zm"`,
			upgraded: `"870mcs_upgraded_zm"`
		},
		olympia: {
			default: `"rottweil72_zm"`,
			upgraded: `"rottweil72_upgraded_zm"`
		},
		s12: {
			default: `"saiga12_zm"`,
			upgraded: `"saiga12_upgraded_zm"`
		},
		m1216: {
			default: `"srm1216_zm"`,
			upgraded: `"srm1216_upgraded_zm"`
		},
		rpd: {
			default: `"rpd_zm"`,
			upgraded: `"rpd_upgraded_zm"`
		},
		hamr: {
			default: `"hamr_zm"`,
			upgraded: `"hamr_upgraded_zm"`
		},
		m1911: {
			default: `"m1911_zm"`,
			upgraded: `"m1911_upgraded_zm"`
		},
		python: {
			default: `"python_zm"`,
			upgraded: `"python_upgraded_zm"`
		},
		judge: {
			default: `"judge_zm"`,
			upgraded: `"judge_upgraded_zm"`
		},
		kard: {
			default: `"kard_zm"`,
			upgraded: `"kard_upgraded_zm"`
		},
		fiveseven: {
			default: `"fiveseven_zm"`,
			upgraded: `"fiveseven_upgraded_zm"`
		},
		fivesevendw: {
			default: `"fivesevendw_zm"`,
			upgraded: `"fivesevendw_upgraded_zm"`
		},
		beretta93r: {
			default: `"beretta93r_zm"`,
			upgraded: `"beretta93r_upgraded_zm"`
		},
		usrpg: {
			default: `"usrpg_zm"`,
			upgraded: `"usrpg_upgraded_zm"`
		},
		m32: {
			default: `"m32_zm"`,
			upgraded: `"m32_upgraded_zm"`
		},
		knife_ballistic: {
			default: `"knife_ballistic_zm"`,
			upgraded: `"knife_ballistic_upgraded_zm"`
		},
		knife_ballistic_bowie: {
			default: `"knife_ballistic_bowie_zm"`,
			upgraded: `"knife_ballistic_bowie_upgraded_zm"`
		},
		knife_ballistic_no_melee: {
			default: `"knife_ballistic_no_melee_zm"`,
			upgraded: `"knife_ballistic_no_melee_upgraded_zm"`
		},
		ray_gun: {
			default: `"ray_gun_zm"`,
			upgraded: `"ray_gun_upgraded_zm"`
		},
		raygun_mark2: {
			default: `"raygun_mark2_zm"`,
			upgraded: `"raygun_mark2_upgraded_zm"`
		},
		cymbal_monkey: { default: `"cymbal_monkey_zm"` },
		sticky_grenade: { default: `"sticky_grenade_zm"` },
		frag_grenade: { default: `"frag_grenade_zm"` },
		claymore: { default: `"claymore_zm"` },
		emp_grenade: { default: `"emp_grenade_zm"` },
		knife: { default: `"knife_zm"` },
		bowie_knife: { default: `"bowie_knife_zm"` },
		tazer_knuckles: { default: `"tazer_knuckles_zm"` },
		// Buildables
		equip_turbine: { default: `"equip_turbine_zm"` },
		riotshield: { default: `"riotshield_zm"` },
		jetgun: { default: `"jetgun_zm"` },
		equip_electrictrap: { default: `"equip_electrictrap_zm"` },
		turret: { default: `"equip_turret_zm"` }
	},
	zm_transit_gump_town: {},
	zm_transit_gump_farm: {}
};

// function objForEach<T>(obj: T, f: (k: keyof T, v: T[keyof T]) => void): void {
// 	for (let k in obj) {
// 		if (Object.prototype.hasOwnProperty.call(obj, k)) {
// 			f(k, obj[k]);
// 		}
// 	}
// }

// objForEach(Weapons, (k: string, v: {}) => {
// 	objForEach(v, (kk: string, vv: { default: string; upgraded?: string }) => {
// 		console.log(`Map: ${k}, Weapon: ${kk}, Value: ${vv.default}`);
// 	});
// });

export default Weapons;
