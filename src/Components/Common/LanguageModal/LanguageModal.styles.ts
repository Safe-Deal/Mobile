import Theme, { fontSize, height, width } from "@theme/Theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	language_modal_container: {
		flex: 1,
		backgroundColor: Theme.primaryBackgroundColor,
		padding: 20,
	},
	language_modal_modal_container: {
		justifyContent: "center",
	},
	language_modal_title: {
		fontSize: fontSize(24),
		textAlign: "center",
		color: Theme.americanGray,
		marginBottom: height(2),
	},
	language_modal_sub_text: {
		fontSize: fontSize(12),
		fontWeight: "300",
		color: Theme.americanGray,
	},
	language_modal_item_text: {
		fontSize: fontSize(18),
		marginBottom: height(0.5),
	},
	language_modal_inner_container: {
		padding: height(3),
		borderRadius: 20,
		backgroundColor: Theme.primaryBackgroundColor,
		maxHeight: height(80),
		width: "100%",
	},
	language_modal_details: {
		padding: height(1.5),
		borderRadius: width(1),
	},
	language_modal_item_even: {
		backgroundColor: "rgba(0, 0, 0, 0.02)",
	},
	language_modal_item_odd: {
		backgroundColor: "rgba(0, 0, 0, 0)",
	},
	language_modal_item_selected: {
		backgroundColor: Theme.primary + "10",
	},
	language_modal_selected_text: {
		color: Theme.goGreen,
		fontWeight: "bold",
	},
	language_modal_close_button: {
		backgroundColor: Theme.primary,
		padding: height(1.5),
		borderRadius: width(4),
		alignSelf: "stretch",
		marginTop: height(2),
	},
	language_modal_close_button_text: {
		color: Theme.primaryBackgroundColor,
		fontSize: fontSize(16),
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default styles;
