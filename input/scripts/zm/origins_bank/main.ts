// Add a bank to the origins map
import Core, { if_statement, while_loop } from "../../../../library/core";
import Level from "../../../../library/level";
import Player from "../../../../library/player";

export const custom_functions = [
    {
        name: "get_bank_origin",
        lines: [
            Core.return(`(1955, 4851, -270)`),
        ]
    },
    {
        name: "setup_bank_deposit",
        lines: [
            Level.endon("end_game"),
            Core.set_local_variable("origin", "get_bank_origin()"),
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
                            Core.run_threaded_function_on_entity(
                                `deposit()`,
                                "player"
                            ),
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
                            Core.run_threaded_function_on_entity(
                                `withdraw()`,
                                "player"
                            ),
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
            Core.set_local_variable("hb_bank_file", Core.fs_open(`"hb_bank_balance.txt"`, "write")),
            if_statement([`self.hb_bank_balance == undefined`], [Player.set_value("hb_bank_balance", 0)]),
            Core.set_local_variable("result", Core.fs_write("hb_bank_file", `self.hb_bank_balance`)),
            Player.i_print_ln_bold(`"RESULT: "+result`),
            Core.fs_close("hb_bank_file")
        ],
    },
    {
        name: "withdraw",
        lines: [
            if_statement(
                [`self.hb_bank_balance >= 1000`],
                [
                    Player.increment_value("score", 1000),
                    Player.decrement_value("hb_bank_balance", 1000),
                    Player.i_print_ln_bold(
                        `"Withdrawn 1000 points. (Balance: "+self.hb_bank_balance+")"`
                    ),
                    Player.run_function("save_stats()"),
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
                    Player.increment_value("hb_bank_balance", 1000),
                    Player.i_print_ln_bold(
                        `"Deposited 1000 points. (Balance: "+self.hb_bank_balance+")"`
                    ),
                    Player.run_function("save_stats()"),
                ],
                [Player.i_print_ln_bold(`"Not enough points."`)]
            ),
        ],
    },
];

export const init_functions = [
    Core.set_local_variable("hb_bank_file", Core.fs_open(`"hb_bank_balance.txt"`, "read")),
    Player.set_value("hb_bank_balance", Core.fs_read("hb_bank_file")),
    if_statement([`self.hb_bank_balance == undefined`], [Player.set_value("hb_bank_balance", 0)]),
    Core.raw(`${Core.fs_remove(`"hb_bank_balance.txt"`)};\n`),

    Level.thread("setup_bank_deposit()"),
    Level.thread("setup_bank_withdrawal()"),
    Player.set_value(
        "account_value",
        `self maps\\mp\\zombies\\_zm_stats::get_map_stat("depositBox", "zm_transit")`
    ),
];

export const pre_init_functions = [];

export const update_functions = [];
