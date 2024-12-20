// MONDAY COLOR PALLET
// https://github.com/mondaycom/monday-ui-style/blob/master/src/Themes/basic/_content-colors.scss
// https://style.monday.com/?path=/docs/foundations-colors--docs

import { Dimensions, PixelRatio, Platform } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const Theme = {
	primary: "#00c875",
	lightGrey: "#f2f2f2",
	darkGrey: "#e7e7e7",
	warningColor: "#ffcb00",

	// Monday color palette
	// Semantic Color
	positiveColor: "#00854d",
	negativeColor: "#d83a52",

	// Background Color
	primaryBackgroundColor: "#ffffff",

	// Icons
	iconColor: "#676879", // Default color for icons

	// Content Color
	doneGreen: "#00c875",
	doneGreenHover: "#0f9b63",
	doneGreenSelected: "#80e3ba",
	doneGreenSelectedWithOpacity: "rgba(128, 227, 186, 0.6)",

	stuckRed: "#e2445c",

	americanGray: "#808080",
	invertedColorBackground: "#323338",
	disabled: "#d8d8d8",

	auroMetalSaurus: "#667085",
	darkGreen: "#003720",
	mintCream: "#F1FFF9",
	antiFlashWhite: "#F1F5F9",
	goGreen: "#00A660",

	// Blackish
	colorBlackish: "#333333",
};

interface ByOsInterface {
	ios: number;
	iosMax?: number;
	android: number;
	androidMax?: number;
}

export const fontSize = (sizeInPx: number) => sizeInPx * PixelRatio.getFontScale();

export const width = (percentage: number | string, max?: number) => {
	const width = widthPercentageToDP(percentage);
	if (max && width > max) {
		return max;
	}
	return width;
};

export const height = (percentage: number | string, max?: number) => {
	const height = heightPercentageToDP(percentage);
	if (max && height > max) {
		return max;
	}
	return height;
};

export const widthByOs = ({ ios, iosMax, android, androidMax }: ByOsInterface) => {
	return Platform.OS === "ios" ? width(ios, iosMax) : width(android, androidMax);
};

export const heightByOs = ({ ios, iosMax, android, androidMax }: ByOsInterface) => {
	return Platform.OS === "ios" ? height(ios, iosMax) : height(android, androidMax);
};

export const screenWidth = () => Dimensions.get("window").width;
export const screenHeight = () => Dimensions.get("window").height;

export const hexToRgb = (hex: string) => {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		}
		: null;
};

export const STANDART_FONT = fontSize(12);

export default Theme;

// @mixin define-theme-content-colors() {
// 	// green grass
// 	--color-grass_green: #037f4c;
// 	--color-grass_green-hover: #116846;
// 	--color-grass_green-selected: #81bfa5;
//
// 	// done green
// 	--color-done-green: #00c875;
// 	--color-done-green-hover: #0f9b63;
// 	--color-done-green-selected: #80e3ba;
// 	--color-done-green-selected-with-opacity: rgba(128, 227, 186, 0.6);
//
// 	// Bright Green
// 	--color-bright-green: #9cd326;
// 	--color-bright-green-hover: #7ca32b;
// 	--color-bright-green-selected: #cde992;
//
// 	// Saladish
// 	--color-saladish: #cab641;
// 	--color-saladish-hover: #9d8f3e;
// 	--color-saladish-selected: #e4daa0;
//
// 	// Egg Yolk
// 	--color-egg_yolk: #ffcb00;
// 	--color-egg_yolk-hover: #c29e11;
// 	--color-egg_yolk-selected: #ffe580;
// 	--color-egg_yolk-rgb: 255, 213, 51;
//
// 	// Working on it
// 	--color-working_orange: #fdab3d;
// 	--color-working_orange-hover: #c0873c;
// 	--color-working_orange-selected: #fed59e;
//
// 	// Dark orange
// 	--color-dark-orange: #ff642e;
// 	--color-dark-orange-hover: #c25531;
// 	--color-dark-orange-selected: #ffb196;
//
// 	// Peach Color
// 	--color-peach: #ffadad;
// 	--color-peach-hover: #c2888a;
// 	--color-peach-selected: #ffd6d6;
//
// 	// Sunset Color
// 	--color-sunset: #ff7575;
// 	--color-sunset-hover: #c26163;
// 	--color-sunset-selected: #ffbaba;
// 	--color-sunset-selected-with-opacity: rgba(255, 186, 186, 0.6);
//
// 	// Stuck red
// 	--color-stuck-red: #e2445c;
// 	--color-stuck-red-hover: #ad3f51;
// 	--color-stuck-red-selected: #f0a1ad;
//
// 	// Dark red
// 	--color-dark-red: #bb3354;
// 	--color-dark-red-hover: #92334c;
// 	--color-dark-red-selected: #dd99a9;
//
// 	// Sofia
// 	--color-sofia_pink: #ff158a;
// 	--color-sofia_pink-hover: #c21e71;
// 	--color-sofia_pink-selected: #ff8ac4;
//
// 	// Lipstick color
// 	--color-lipstick: #ff5ac4;
// 	--color-lipstick-hover: #c24e9a;
// 	--color-lipstick-selected: #fface1;
//
// 	// Bubble
// 	--color-bubble: #faa1f1;
// 	--color-bubble-hover: #be80ba;
// 	--color-bubble-selected: #fcd0f8;
//
// 	// Purple
// 	--color-purple: #a25ddc;
// 	--color-purple-hover: #8050ab;
// 	--color-purple-selected: #d0aeed;
//
// 	// Dark purple
// 	--color-dark_purple: #784bd1;
// 	--color-dark_purple-hover: #6344a3;
// 	--color-dark_purple-selected: #bba5e8;
//
// 	// Berry
// 	--color-berry: #7e3b8a;
// 	--color-berry-hover: #673971;
// 	--color-berry-selected: #be9dc4;
//
// 	// Dark indigo
// 	--color-dark_indigo: #401694;
// 	--color-dark_indigo-hover: #3c1f78;
// 	--color-dark_indigo-selected: #a08bc9;
//
// 	// Indigo
// 	--color-indigo: #5559df;
// 	--color-indigo-hover: #4b4ead;
// 	--color-indigo-selected: #aaacef;
//
// 	// Navy
// 	--color-navy: #225091;
// 	--color-navy-hover: #274776;
// 	--color-navy-selected: #90a7c8;
//
// 	// Light Blue
// 	--color-bright-blue: #579bfc;
// 	--color-bright-blue-hover: #4c7cc1;
// 	--color-bright-blue-selected: #abcdfd;
//
// 	// Dark blue
// 	--color-dark-blue: #0086c0;
// 	--color-dark-blue-hover: #0f6d97;
// 	--color-dark-blue-selected: #80c2df;
//
// 	// Aquamarine
// 	--color-aquamarine: #4eccc6;
// 	--color-aquamarine-hover: #469e9b;
// 	--color-aquamarine-selected: #a6e5e2;
//
// 	// Chili Blue
// 	--color-chili-blue: #66ccff;
// 	--color-chili-blue-hover: #569ec3;
// 	--color-chili-blue-selected: #b2e5ff;
//
// 	// River
// 	--color-river: #68a1bd;
// 	--color-river-hover: #588095;
// 	--color-river-selected: #b3d0de;
//
// 	// winter
// 	--color-winter: #9aadbd;
// 	--color-winter-hover: #7b8895;
// 	--color-winter-selected: #ccd6de;
//
// 	// Explosive
// 	--color-explosive: #c4c4c4;
// 	--color-explosive-hover: #98999a;
// 	--color-explosive-selected: #e1e1e1;
//
// 	// American Grey
// 	--color-american_gray: #808080;
// 	--color-american_gray-hover: #69696a;
// 	--color-american_gray-selected: #bfbfbf;
//
// 	// Blackish
// 	--color-blackish: #333333;
// 	--color-blackish-hover: #222222;
// 	--color-blackish-selected: #999999;
//
// 	// Brown
// 	--color-brown: #7f5347;
// 	--color-brown-hover: #684943;
// 	--color-brown-selected: #bfa9a3;
//
// 	// Orchid
// 	--color-orchid: #d974b0;
// 	--color-orchid-hover: #ae5d8d;
// 	--color-orchid-selected: #ecbad7;
//
// 	// Tan
// 	--color-tan: #ad967a;
// 	--color-tan-hover: #8a7862;
// 	--color-tan-selected: #d6cabc;
//
// 	// Sky
// 	--color-sky: #a1e3f6;
// 	--color-sky-hover: #81b6c5;
// 	--color-sky-selected: #d0f1fa;
//
// 	// Coffee
// 	--color-coffee: #bd816e;
// 	--color-coffee-hover: #976758;
// 	--color-coffee-selected: #dec0b7;
//
// 	// Royal
// 	--color-royal: #2b76e5;
// 	--color-royal-hover: #225eb7;
// 	--color-royal-selected: #95bbf2;
//
// 	// Teal
// 	--color-teal: #175a63;
// 	--color-teal-hover: #12484f;
// 	--color-teal-selected: #8bacb1;
//
// 	// Lavender
// 	--color-lavender: #bda8f9;
// 	--color-lavender-hover: #9786c7;
// 	--color-lavender-selected: #ded4fc;
//
// 	// Steel
// 	--color-steel: #a9bee8;
// 	--color-steel-hover: #8798ba;
// 	--color-steel-selected: #d4dff4;
//
// 	// Lilac
// 	--color-lilac: #9d99b9;
// 	--color-lilac-hover: #7e7a94;
// 	--color-lilac-selected: #ceccdc;
//
// 	// Pecan
// 	--color-pecan: #563e3e;
// 	--color-pecan-hover: #453232;
// 	--color-pecan-selected: #ab9f9f;
// }
