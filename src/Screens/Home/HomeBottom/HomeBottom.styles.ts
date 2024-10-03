import { StyleSheet } from "react-native";
import Theme, { fontSize, height, width } from "../../../Theme/Theme";

const styles = StyleSheet.create({
	homeBottom__container: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: Theme.primaryBackgroundColor,
		height: height(8.7),
		width: "100%",
	},
	homeBottom__text_container: {
		justifyContent: "center",
		marginLeft: width(1),
		marginTop: height(0.8),
	},
	homeBottom__logo: {
		width: height(5),
		height: height(5),
	},
	homeBottom__safeDealText: {
		fontSize: fontSize(20),
		fontWeight: "bold",
		textAlign: "center",
	},
	homeBottom__versionText: {
		fontSize: fontSize(10),
		opacity: 0.6,
		textAlign: "center",
	},
});

export default styles;
