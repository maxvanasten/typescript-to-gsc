import Core, { if_statement } from "../../../../library/core";
import HudElement, { Font, Point } from "../../../../library/hud_element";

const hud_x = -225;
const hud_y = -205;

const bank_balance_hud = new HudElement({
    name: "bank_balance_hud",
    font: Font.default(),
    point: new Point("CENTER", "CENTER", hud_x, hud_y),
    type: "number",
    label: `Bank balance: ^5`,
    value: 0,
});

export const include_files = ["maps\\mp\\gametypes_zm\\_hud_util"];

export const init_functions = [bank_balance_hud.init()];

export const custom_functions = [
    {
        name: "update_hud_bank_balance",
        lines: [
            bank_balance_hud.update(`self.account_value * 1000`),
            Core.wait(0.5),
        ],
    },
];

export const update_functions = [
    Core.thread_custom_function("update_hud_bank_balance"),
];
