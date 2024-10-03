import { StyleSheet } from "react-native";
import Theme, { fontSize, height, width } from "../../../Theme/Theme";

const styles = StyleSheet.create({
	share_walkthrough_modal: {
		margin: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	share_walkthrough_modalContainer: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: width(6),
		paddingVertical: height(8),
		width: "100%",
	},
	share_walkthrough_stepContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: height(2),
	},
	share_walkthrough_textContainer: {
		flex: 1,
	},
	share_walkthrough_stepText: {
		fontSize: fontSize(18),
		marginBottom: height(1),
		textAlign: "center",
	},
	share_walkthrough_descriptionText: {
		fontSize: fontSize(16),
		textAlign: "center",
		color: Theme.americanGray,
	},
	share_walkthrough_button: {
		backgroundColor: Theme.primary,
		paddingVertical: height(2),
		paddingHorizontal: width(2),
		borderRadius: width(2),
		alignItems: "center",
		marginTop: height(5),
	},
	share_walkthrough_buttonText: {
		color: "white",
		fontSize: fontSize(16),
	},
});

export default styles;
