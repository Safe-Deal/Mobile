import { Platform, StyleSheet } from "react-native";
import { screenHeight } from "../../../Theme/Theme";
const height = screenHeight();

export const styles = StyleSheet.create({
	webView__container: { flex: 1 },
	webview: { flex: 1 },
	webView__loading: {
		justifyContent: "center",
		height: Platform.select({
			ios: height / 1.25,
			android: height / 1.1,
		}),
	},
});

export default styles;
