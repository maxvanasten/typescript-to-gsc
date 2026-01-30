/**
 * Upgrade Shop Script
 * 
 * Adds multiple upgrade purchase locations across Zombies maps.
 * Players can buy weapon upgrades, perks, and special abilities.
 */

import Player from '../../../../library/player';
import Level from '../../../../library/level';
import Core, { if_statement, switch_statement, while_loop } from '../../../../library/core';
import Perks from '../../../../library/lists/perks';
import HudElement, { Font, Point } from '../../../../library/hud_element';

// ============================================================================
// HUD ELEMENTS
// ============================================================================

// Price list HUD
const priceList = new HudElement({
    name: 'upgrade_prices',
    point: new Point('CENTER', 'CENTER', 200, -150),
    font: new Font('objective', 1.2),
    type: 'string',
    text: '""'
});

// ============================================================================
// CUSTOM FUNCTIONS
// ============================================================================

export const custom_functions = [
    // -------------------------------------------------------------------------
    // Setup the upgrade shop trigger at a location
    // -------------------------------------------------------------------------
    {
        name: "setup_upgrade_shop",
        arguments: ["x", "y", "z"],
        lines: [
            Level.endon("end_game"),
            
            // Create trigger
            Core.set_local_variable("shop_trigger", `spawn("trigger_radius", (x, y, z+30), 0, 60, 60)`),
            Core.run_function_on_entity(`setCursorHint("HINT_NOICON")`, "shop_trigger"),
            Core.run_function_on_entity(`setHintString("^3[{+activate}]^7 Upgrade Shop")`, "shop_trigger"),
            
            // Create visual indicator (glowing box)
            Core.set_local_variable("shop_model", `spawn("script_model", (x, y, z+20))`),
            Core.run_function_on_entity(`setModel("ch_crate_bonus_01")`, "shop_model"),
            
            // Main interaction loop
            while_loop(["true"], [
                Core.run_function_on_entity(`waittill("trigger", player)`, "shop_trigger"),
                
                // Check if player pressed use button
                if_statement(
                    [`player usebuttonpressed()`],
                    [
                        // Check if already in shop
                        if_statement(
                            [`!isdefined(player.in_upgrade_shop)`],
                            [
                                Player.set_value("in_upgrade_shop", 1),
                                Core.run_threaded_function_on_entity("open_shop_menu", "player"),
                                Core.wait(0.5),
                            ]
                        )
                    ]
                )
            ])
        ]
    },
    
    // -------------------------------------------------------------------------
    // Open the shop menu for a player
    // -------------------------------------------------------------------------
    {
        name: "open_shop_menu",
        lines: [
            // Show price list
            Core.run_function_on_entity(`gpp_ui_upgrade_prices setText("^5UPGRADE PRICES:\n\n^3Weapons:\n  PAP: 5000\n  Double PAP: 10000\n\n^3Perks:\n  Random: 2500\n\n^3Abilities:\n  Powerup: 1500")`, "self"),
            
            // Make menu visible
            Core.raw(`self.gpp_ui_upgrade_prices.alpha = 1;`),
            
            // Notify player
            Player.i_print_ln_bold('"^2Welcome to the Upgrade Shop!\n^3Press USE to buy upgrades"'),
            
            // Start purchase loop
            Core.thread_custom_function("shop_purchase_loop"),
        ]
    },
    
    // -------------------------------------------------------------------------
    // Handle player input and purchases in shop
    // -------------------------------------------------------------------------
    {
        name: "shop_purchase_loop",
        lines: [
            Level.endon("disconnect"),
            Level.endon("in_upgrade_shop"),
            
            while_loop(["true"], [
                // Check if player pressed use button to purchase
                if_statement(
                    [`self usebuttonpressed()`],
                    [
                        // Randomly select purchase type
                        if_statement(
                            [`randomint(3) == 0`],
                            [
                                // Try to buy weapon upgrade
                                if_statement(
                                    [`${Player.score} >= 5000`, `${Player.current_weapon} != "knife_zm"`],
                                    [
                                        Player.set_value("score", `${Player.score} - 5000`),
                                        Player.upgrade_held_weapon(),
                                        Player.i_print_ln_bold('"^2Weapon Upgraded!"'),
                                    ],
                                    [
                                        if_statement(
                                            [`${Player.score} < 5000`],
                                            [Player.i_print_ln_bold('"^1Need 5000 points for upgrade!"')],
                                            [Player.i_print_ln_bold('"^1Equip a weapon first!"')]
                                        )
                                    ]
                                )
                            ],
                            [
                                if_statement(
                                    [`randomint(2) == 0`],
                                    [
                                        // Buy random perk
                                        if_statement(
                                            [`${Player.score} >= 2500`],
                                            [
                                                Player.set_value("score", `${Player.score} - 2500`),
                                                Player.give_perk(Perks.juggernog),
                                                Player.i_print_ln_bold('"^2Juggernog Acquired!"'),
                                            ],
                                            [Player.i_print_ln_bold('"^1Need 2500 points!"')]
                                        )
                                    ],
                                    [
                                        // Buy powerup effect
                                        if_statement(
                                            [`${Player.score} >= 1500`],
                                            [
                                                Player.set_value("score", `${Player.score} - 1500`),
                                                if_statement(
                                                    [`randomint(2) == 0`],
                                                    [
                                                        // Double points
                                                        Player.i_print_ln_bold('"^2Double Points!"'),
                                                    ],
                                                    [
                                                        // Insta-kill
                                                        Player.i_print_ln_bold('"^1INSTA-KILL ACTIVE!"'),
                                                    ]
                                                )
                                            ],
                                            [Player.i_print_ln_bold('"^1Need 1500 points!"')]
                                        )
                                    ]
                                )
                            ]
                        ),
                        
                        // Small delay to prevent rapid purchases
                        Core.wait(0.5),
                    ]
                ),
                
                // Exit shop if player walks away
                if_statement(
                    [`!isdefined(self.in_upgrade_shop)`],
                    [
                        Core.raw(`self.gpp_ui_upgrade_prices.alpha = 0;`),
                        Core.raw(`self notify("exit_shop_loop");`),
                    ]
                ),
                
                // Small delay between checks
                Core.wait(0.1),
            ])
        ]
    },
    
    // -------------------------------------------------------------------------
    // Exit shop handler
    // -------------------------------------------------------------------------
    {
        name: "exit_shop_loop",
        lines: [
            Level.endon("disconnect"),
            Core.raw(`self waittill("exit_shop_loop");`),
            Core.raw(`self.gpp_ui_upgrade_prices.alpha = 0;`),
            Player.set_value("in_upgrade_shop", 0),
        ]
    },
];

// ============================================================================
// INITIALIZATION
// ============================================================================

export const init_functions = [
    // Initialize HUD elements (hidden by default)
    Core.raw(`self.gpp_ui_upgrade_prices = createFontString("objective", 1.2);`),
    Core.raw(`self.gpp_ui_upgrade_prices setPoint("CENTER", "CENTER", 200, -150);`),
    Core.raw(`self.gpp_ui_upgrade_prices.alpha = 0;`),
    Core.raw(`self.gpp_ui_upgrade_prices.color = (1, 1, 1);`),
    Core.raw(`self.gpp_ui_upgrade_prices hidewheninmenu = true;`),
    Core.raw(`self.gpp_ui_upgrade_prices hidewhendead = true;`),
    
    // Set shop positions based on map
    switch_statement(`tolower(getdvar(#"mapname"))`, [
        {
            case: '"zm_tomb"',
            do: [
                // Origins town spawn area
                Core.set_local_variable("shop_pos_1", `(2350, 4700, -301)`),
                // Generator area
                Core.set_local_variable("shop_pos_2", `(2100, 5100, -301)`),
                
                Core.raw(`thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);`),
                Core.raw(`thread setup_upgrade_shop(shop_pos_2[0], shop_pos_2[1], shop_pos_2[2]);`),
            ]
        },
        {
            case: '"zm_prison"',
            do: [
                // Cell block
                Core.set_local_variable("shop_pos_1", `(700, 10670, 1336)`),
                // Yard entrance
                Core.set_local_variable("shop_pos_2", `(1200, 10800, 1336)`),
                
                Core.raw(`thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);`),
                Core.raw(`thread setup_upgrade_shop(shop_pos_2[0], shop_pos_2[1], shop_pos_2[2]);`),
            ]
        },
        {
            case: '"zm_buried"',
            do: [
                // Town center
                Core.set_local_variable("shop_pos_1", `(150, 150, 10)`),
                // Bank
                Core.set_local_variable("shop_pos_2", `(400, -100, 10)`),
                
                Core.raw(`thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);`),
                Core.raw(`thread setup_upgrade_shop(shop_pos_2[0], shop_pos_2[1], shop_pos_2[2]);`),
            ]
        },
        {
            case: '"zm_highrise"',
            do: [
                // Roof spawn
                Core.set_local_variable("shop_pos_1", `(100, 100, 500)`),
                
                Core.raw(`thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);`),
            ]
        },
        {
            case: '"zm_transit"',
            do: [
                // Farm spawn
                Core.set_local_variable("shop_pos_1", `(-6361, 5480, -55)`),
                
                Core.raw(`thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);`),
            ]
        },
        {
            case: '"zm_nuked"',
            do: [
                // Spawn
                Core.set_local_variable("shop_pos_1", `(-237, 996, -63)`),
                
                Core.raw(`thread setup_upgrade_shop(shop_pos_1[0], shop_pos_1[1], shop_pos_1[2]);`),
            ]
        },
    ], []),
    
    // Welcome message
    Core.log('"^2Upgrade Shop loaded! Find the glowing crates to buy upgrades."'),
];

// ============================================================================
// UPDATE FUNCTIONS
// ============================================================================

export const update_functions = [
    // Exit shop if player no longer in shop state
    if_statement(
        [`isdefined(self.in_upgrade_shop)`, `self.in_upgrade_shop != 1`],
        [
            Core.raw(`self.gpp_ui_upgrade_prices.alpha = 0;`),
        ]
    ),
];
