// Add a bank to the origins map
import Core, { if_statement, while_loop } from "../../../../library/core";
import Player from "../../../../library/player";
import Level from "../../../../library/level";
import Perks from "../../../../library/lists/perks";

export const custom_functions = [
    {
        name: "setup_bank_deposit",
        lines: [
            Level.endon("end_game"),
            Core.set_local_variable("origin", "(1955, 4851, -270)"),
            Core.set_local_variable(
                "trigger_deposit",
                `spawn("trigger_radius", origin, 0, 50, 50)`
            ),
            Core.run_function_on_entity(
                `setCursorHint("HINT_NOICON")`,
                "trigger_deposit"
            ),
            Core.run_function_on_entity(
                `setHintString("^3[{+activate}]^7 to deposit 1000 points to the bank")`,
                "trigger_deposit"
            ),

            while_loop(
                ["true"],
                [
                    Core.run_function_on_entity(
                        `waittill("trigger", player)`,
                        "trigger_deposit"
                    ),
                    if_statement(
                        [`player usebuttonpressed()`],
                        [
                            Player.run_threaded_function(`deposit()`),
                            Core.wait(0.5),
                        ]
                    ),
                    Core.wait(0.05),
                ]
            ),
        ],
    },
    {
        name: "setup_bank_withdrawal",
        lines: [
            // rewrite above block in ts
            Level.endon("end_game"),
            Core.set_local_variable("origin", "(2902, 5083, -350)"),
            Core.set_local_variable(
                "trigger_withdraw",
                `spawn("trigger_radius", origin, 0, 50, 50)`
            ),
            Core.run_function_on_entity(
                `setCursorHint("HINT_NOICON")`,
                "trigger_withdraw"
            ),
            Core.run_function_on_entity(
                `setHintString("^3[{+activate}]^7 to withdraw 1000 points from the bank")`,
                "trigger_withdraw"
            ),

            while_loop(
                ["true"],
                [
                    Core.run_function_on_entity(
                        `waittill("trigger", player)`,
                        "trigger_withdraw"
                    ),
                    if_statement(
                        [`player usebuttonpressed()`],
                        [
                            Player.run_threaded_function(`withdraw()`),
                            Core.wait(0.5),
                        ]
                    ),
                    Core.wait(0.05),
                ]
            ),
        ],
    },
    {
        name: "save_stats",
        lines: [
            Player.run_function(
                `maps\\mp\\zombies\\_zm_stats::set_map_stat("depositBox", self.account_value, "zm_transit")`
            ),
            Player.run_function(`uploadleaderboards()`),
            Player.run_function(
                `maps\\mp\\zombies\\_zm_stats::uploadstatssoon()`
            ),
        ],
    },
    {
        name: "withdraw",
        lines: [
            if_statement(
                [`self.account_value >= 1`],
                [
                    Player.increment_value("score", 1000),
                    Player.decrement_value("account_value", 1),
                    Player.i_print_ln_bold(
                        `"Withdrawn 1000 points. (Balance: "+(self.account_value*1000)+")"`
                    ),
                    Core.run_custom_function("save_stats"),
                ],
                [Player.i_print_ln_bold(`"Not enough points."`)]
            ),
        ],
    },
    {
        name: "deposit",
        lines: [
            if_statement(
                [`self.score >= 1000`],
                [
                    Player.decrement_value("score", 1000),
                    Player.increment_value("account_value", 1),
                    Player.i_print_ln_bold(
                        `"Deposited 1000 points. (Balance: "+(self.account_value*1000)+")"`
                    ),
                    Core.run_custom_function("save_stats"),
                ],
                [Player.i_print_ln_bold(`"Not enough points."`)]
            ),
        ],
    },
];

export const init_functions = [
    Level.thread("setup_bank_deposit()"),
    Level.thread("setup_bank_withdrawal()"),
    Player.set_value(
        "account_value",
        `self maps\\mp\\zombies\\_zm_stats::get_map_stat("depositBox", "zm_transit")`
    ),
];

export const pre_init_functions = [];

export const update_functions = [];
