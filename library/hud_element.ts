import fonts from './lists/fonts';

export class Point {
	options: {
		x_align: string;
		y_align: string;
		x_offset: number;
		y_offset: number;
	};

	constructor(x_align: string, y_align: string, x_offset: number, y_offset: number) {
		this.options = {
			x_align: x_align || 'CENTER',
			y_align: y_align || 'CENTER',
			x_offset: x_offset || 0,
			y_offset: y_offset || 0
		};
	}

	/**
	 * @description Centered point
	 */
	static center = () => {
		return new Point('CENTER', 'CENTER', 0, 0);
	};

	/**
	 * @description Point in the top-left of the screen
	 */
	static top_left = () => {
		return new Point('CENTER', 'CENTER', -300, -200);
	};
}

export class Font {
	name: string;
	size: number;

	constructor(name: string, size: number) {
		if (!fonts.includes(name)) console.warn(`[WARNING] Font '${name}' does not exist.`);
		this.name = name;
		this.size = size;
	}

	/**
	 * @description Returns the 'objective' font with a size of 1.5
	 * 
	 */
	static default = () => {
		return new Font('objective', 1.5);
	};
}

/**
 * @description A set of options for the HudElement to use.
 */
export interface HudOptions {
	name: string;
	point: Point;
	font: Font;

	type?: 'number' | 'string';
	value?: number;
	label?: string;

	color?: {
		r: number;
		g: number;
		b: number;
	};

	alpha?: number;
	hidewheninmenu?: boolean;
	hidewhendead?: boolean;

	text?: string;
}

/**
 * @description A generic hud element shown on the screen
 * @example
 * const hud_element = new HudElement({
 *     name: 'watermark',
 *     point: Point.top_left(),
 *     font: Font.default(),
 *     text: `"Hello world!"`
 * });
 */
export default class HudElement {
	options: HudOptions;

	constructor(options: HudOptions) {
		this.options = options;
	}

	/**
	 * @description Sets the alpha of this HudElement.
	 * @example
	 * hud_element.setAlpha(0.5);
	 */
	setAlpha(alpha: number) {
		let output = [
			`// setAlpha() on HudElement '${this.options.name}'`
		];
		output.push(`self.gpp_ui_${this.options.name}.alpha = ${alpha};`);
		return output;
	}

	/**export
	 * @description Initializes the hud element in gsc
	 * @example
	 * export const init = [
	 *     hud_element.init(),
	 * ];
	 */
	init() {
		let output = [
			`// init() on HudElement '${this.options.name}'`
		];

		output.push(`self.gpp_ui_${this.options.name} = createFontString("${this.options.font.name}", ${this.options.font.size});`);

		output.push(
			`self.gpp_ui_${this.options.name} setPoint("${this.options.point.options.x_align}", "${this.options.point.options.y_align}", ${this.options.point
				.options.x_offset}, ${this.options.point.options.y_offset});`
		);

		output.push(`self.gpp_ui_${this.options.name}.alpha = ${this.options.alpha || 1};`);
		output.push(`self.gpp_ui_${this.options.name}.hidewheninmenu = ${this.options.hidewheninmenu || true};`);
		output.push(`self.gpp_ui_${this.options.name}.hidewhendead = ${this.options.hidewhendead || true};`);

		// Color
		if (this.options.color) {
			output.push(`self.gpp_ui_${this.options.name}.color = (${this.options.color.r}, ${this.options.color.g}, ${this.options.color.b});`);
		} else {
			output.push(`self.gpp_ui_${this.options.name}.color = (1, 1, 1);`);
		}

		// Text
		if (this.options.type && this.options.type == 'number') {
			output.push(`self.gpp_ui_${this.options.name} setValue(${this.options.value || 0});`);
			output.push(`self.gpp_ui_${this.options.name}.label = &"${this.options.label || 'unlabeled'}";`);
			output.push(`self.gpp_ui_${this.options.name}.stored_value = ${this.options.value};`);
		} else {
			output.push(`self.gpp_ui_${this.options.name} setText(${this.options.text});`);
			output.push(`self.gpp_ui_${this.options.name}.stored_text = ${this.options.text};`);
		}

		return output;
	}

	/**
	 * @description Updates the hud element with `new_text` in gsc
	 * @example
	 * export const update = [
	 *     hud_element.update(`"Player Score: " + self.score`),
	 * ];
	 */
	update(new_value: string) {
		let output = [
			`// update() on HudElement '${this.options.name}'`
		];

		if (this.options.type && this.options.type == 'number') {
			output.push(`if (self.gpp_ui_${this.options.name}.stored_value != ${new_value})`);
			output.push(`{`);

			output.push(`\tself.gpp_ui_${this.options.name} setValue(${new_value});`);
			output.push(`\tself.gpp_ui_${this.options.name}.stored_value = ${new_value};`);

			output.push(`}`);
		} else {
			output.push(`if (self.gpp_ui_${this.options.name}.stored_text != ${new_value})`);
			output.push(`{`);

			output.push(`\tself.gpp_ui_${this.options.name} setText(${new_value});`);
			output.push(`\tself.gpp_ui_${this.options.name}.stored_text = ${new_value};`);

			output.push(`}`);
		}

		return output;
	}
}
