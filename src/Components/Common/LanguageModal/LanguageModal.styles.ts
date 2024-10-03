import Theme, { fontSize, height } from "@theme/Theme";
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
	},
	language_modal_sub_text: {
		fontSize: fontSize(12),
		fontWeight: "300",
	},
	language_modal_item_text: {
		fontSize: fontSize(20),
	},
	language_modal_inner_container: {
		padding: height(2),
		borderRadius: 20,
		backgroundColor: Theme.primaryBackgroundColor,
		height: height(80),
		width: "100%",
	},
	language_modal_details: {
		margin: 10,
	},
	language_modal_selected_text: {
		color: Theme.goGreen,
	},
});

export default styles;
