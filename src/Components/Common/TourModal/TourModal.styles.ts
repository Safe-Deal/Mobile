import { StyleSheet } from "react-native";
import Theme, { fontSize, height, STANDART_FONT } from "../../../Theme/Theme";

const styles = StyleSheet.create({
	tour_modal_container: {
		borderRadius: 16,
		paddingTop: height(3),
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: height(2),
		width: "100%",
		backgroundColor: "white",
	},
	tooltip_container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		width: "80%",
	},
	tooltip_text: {
		textAlign: "center",
		color: Theme.colorBlackish,
		fontSize: STANDART_FONT,
	},
	tooltip_title: {
		textAlign: "center",
		color: Theme.colorBlackish,
		marginBottom: height(1),
		fontWeight: "bold",
		fontSize: fontSize(18),
	},
	bottom_bar: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	bottom_bar_button: {
		padding: 10,
	},
	bottom_bar_button_text: {
		color: Theme.primary,
	},
});

export default styles;
