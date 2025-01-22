import Core, { if_statement, switch_statement, while_loop } from "../../../../library/core";
import Level from "../../../../library/level";
import Player from "../../../../library/player";

import { gobblegums, powerup_list } from "./gums";
import { gobblegum_hud_description } from "./hud";

// TODO: Add more gobblegum
// TODO: Add multiple gobblegum machines (3 per map(?))
// TODO: Add some sort of animation for using a gobblegum
// TODO: Fix text prompts to work smoothly

const gobblegum_list: string[] = [];
gobblegums.forEach((g) => gobblegum_list.push(`"${g.identifier}"`));

const custom_functions_r: {
    name: string;
    arguments?: string[];
    lines: string[][];
}[] = [
        {
            name: "setup_gobblegum_machine",
            arguments: ["x", "y", "z"],
            lines: [
                Level.endon("end_game"),

                Core.log(`"Creating trigger. x: " + x + " y: " + y + " z: " + z`),
                Core.set_local_variable("trigger_gobblegum", `spawn("trigger_radius", (x, y, z), 0, 50, 50)`),
                Core.run_function_on_entity(`setCursorHint("HINT_NOICON")`, "trigger_gobblegum"),
                Core.run_function_on_entity(`setHintString("^3[{+activate}]^7 to get a gobblegum.")`, "trigger_gobblegum"),

                while_loop(
                    ["true"],
                    [
                        Core.run_function_on_entity(`waittill("trigger", player)`, "trigger_gobblegum"),
                        if_statement(
                            [`player usebuttonpressed()`],
                            [
                                if_statement(
                                    [`player.last_gobblegum_round != level.round_number`],
                                    [
                                        Core.run_threaded_function_on_entity(
                                            `get_gobblegum()`,
                                            "player"
                                        ),
                                        Core.wait(0.5),
                                    ],
                                    [
                                        Player.a_i_print_ln_bold(`"You have already received a gobblegum this round."`)
                                    ]
                                )
                            ]
                        )
                    ]
                )

            ]
        },
        {
            name: "get_gobblegum",
            lines: [
                if_statement(
                    [`self.gobblegum_identifier == "none"`],
                    [
                        // Get random gobblegum name
                        Player.set_value("gobblegum_cooldown", 0),
                        Player.set_value("gobblegum_identifier", Core.random_from_array("self.gobblegum_list")),
                        Player.set_value("last_gobblegum_round", "level.round_number"),
                        // Change hud 
                        gobblegum_hud_description.update(`"You have a gobblegum. (" + self.gobblegum_identifier + ")"`),
                        Player.i_print_ln_bold(`"You have received a gobblegum. (" + self.gobblegum_identifier + ")"`)
                    ],
                    [
                        // Alert the player they already have a gobblegum
                        Player.i_print_ln_bold(`"You already have a gobblegum!"`)
                    ]
                )
            ]
        }
    ];

gobblegums.forEach((gobblegum) => {
    custom_functions_r.push(gobblegum.activate_function);
});

export const init_functions: string[][] = [
    // Determine position based on map
    Core.set_local_variable("gobblegum_pos", `(0, 0, 0)`),
    switch_statement(`tolower(getdvar(#"mapname"))`, [
        {
            case: `"zm_tomb"`,
            do: [
                Core.set_local_variable("gobblegum_pos", `(2381, 4752, -301)`),
            ]
        },
        {
            case: `"zm_prison"`,
            do: [
                Core.set_local_variable("gobblegum_pos", `(727, 10670, 1336)`),
            ]
        },
        {
            case: `"zm_buried"`,
            do: [
                Core.set_local_variable("gobblegum_pos", `(152, 133, 10)`),
            ]
        },
        // {
        //     case: `"zm_highrise"`,
        //     do: [
        //         Core.set_local_variable("gobblegum_pos", `(0, 0, 0)`),
        //     ]
        // },
        {
            case: `"zm_transit"`,
            do: [
                Core.set_local_variable("gobblegum_pos", `(-6361, 5480, -55)`),
            ]
        },
        // {
        //     case: `"zm_transit_gump_town"`,
        //     do: [
        //         Core.set_local_variable("gobblegum_pos", `(452, -384, -61)`),
        //     ]
        // },
        // {
        //     case: `"zm_transit_gump_busstation"`,
        //     do: [
        //         Core.set_local_variable("gobblegum_pos", `(0, 0, 0)`),
        //     ]
        // },
        {
            case: `"zm_nuked"`,
            do: [
                Core.set_local_variable("gobblegum_pos", `(-237, 996, -63)`),
            ]
        },
    ], []),
    Level.thread("setup_gobblegum_machine(gobblegum_pos[0], gobblegum_pos[1], gobblegum_pos[2])"),
    Player.set_value("gobblegum_cooldown", 0),
    Player.set_value("last_gobblegum_round", -1),
    // Player.set_value("gobblegum_identifier", `"powerup"`),
    Core.log(`"Setting player arrays"`),
    Player.set_array("powerup_list", powerup_list),
    Player.set_array("gobblegum_list", gobblegum_list)
];

export const update_functions: string[][] = [
    if_statement(
        [`self.gobblegum_cooldown <= 0`, `self.gobblegum_identifier != "none"`],
        [
            if_statement(
                [`self adsbuttonpressed()`, `self usebuttonpressed()`],
                [
                    switch_statement(
                        "self.gobblegum_identifier",
                        [
                            {
                                case: `"in_plain_sight"`,
                                do: [
                                    Player.run_threaded_function(`hud_activation("In plain sight!", "Zombies ignore the player for 10 seconds.", 7)`),
                                    Player.run_threaded_function(`gg_in_plain_sight()`)
                                ],
                            },
                            // {
                            //     case: `"powerup"`,
                            //     do: [
                            //         Player.run_threaded_function(`hud_activation("Powerup!", "Activates random powerup", 7)`),
                            //         Player.run_threaded_function(`gg_powerup()`)
                            //     ]
                            // },
                            {
                                case: `"resupply"`,
                                do: [
                                    Player.run_threaded_function(`hud_activation("Resupply!", "Activates a max ammo.", 7)`),
                                    Player.run_threaded_function(`gg_resupply()`)
                                ]
                            },
                            {
                                case: `"multiplier"`,
                                do: [
                                    Player.run_threaded_function(`hud_activation("Multiplier!", "Activates a double points.", 7)`),
                                    Player.run_threaded_function(`gg_multiplier()`)
                                ]
                            },
                            {
                                case: `"perkdrop"`,
                                do: [
                                    Player.run_threaded_function(`hud_activation("Perk drop!", "Activates a random perk", 7)`),
                                    Player.run_threaded_function(`gg_perkdrop()`)
                                ]
                            }
                        ],
                        []
                    ),
                    Player.set_value("gobblegum_identifier", `"none"`),
                ]
            ),
        ],
        [Player.increment_value("gobblegum_cooldown", -0.05)]
    ),
];

export const custom_functions = custom_functions_r;
