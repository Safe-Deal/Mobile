import { configureFonts, MD3LightTheme } from "react-native-paper";

const customFontConfig = {
	web: {
		regular: {
			fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
			fontWeight: "400" as const,
		},
		medium: {
			fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
			fontWeight: "500" as const,
		},
		light: {
			fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
			fontWeight: "300" as const,
		},
		thin: {
			fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
			fontWeight: "100" as const,
		},
	},
	ios: {
		regular: {
			fontFamily: "San Francisco",
			fontWeight: "400" as const,
		},
		medium: {
			fontFamily: "San Francisco",
			fontWeight: "500" as const,
		},
		light: {
			fontFamily: "San Francisco",
			fontWeight: "300" as const,
		},
		thin: {
			fontFamily: "San Francisco",
			fontWeight: "100" as const,
		},
	},
	default: {
		regular: {
			fontFamily: "Roboto",
			fontWeight: "normal" as const,
		},
		medium: {
			fontFamily: "Roboto",
			fontWeight: "normal" as const,
		},
		light: {
			fontFamily: "Roboto",
			fontWeight: "normal" as const,
		},
		thin: {
			fontFamily: "Roboto",
			fontWeight: "normal" as const,
		},
	},
};

const SafeDealTheme = {
	...MD3LightTheme,
	fonts: configureFonts(customFontConfig as never),
};

export default SafeDealTheme;
