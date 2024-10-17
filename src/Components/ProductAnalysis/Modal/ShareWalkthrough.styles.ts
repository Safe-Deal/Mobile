import { StyleSheet } from "react-native";
import Theme, { fontSize, height, width } from "../../../Theme/Theme";

const styles = StyleSheet.create({
	share_walkthrough_modal: {
		margin: 0,
		justifyContent: "flex-end",
	},
	share_walkthrough_modalContainer: {
		backgroundColor: "white",
		maxHeight: "90%",
		width: "100%",
		borderTopLeftRadius: width(4),
		borderTopRightRadius: width(4),
	},
	share_walkthrough_scrollContent: {
		paddingHorizontal: width(6),
		paddingTop: height(4),
		paddingBottom: height(10),
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
	share_walkthrough_buttonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "white",
		paddingHorizontal: width(6),
		paddingVertical: height(2),
		borderTopWidth: 1,
		borderTopColor: Theme.lightGrey,
	},
	share_walkthrough_button: {
		backgroundColor: Theme.primary,
		paddingVertical: height(2),
		paddingHorizontal: width(2),
		borderRadius: width(2),
		alignItems: "center",
	},
	share_walkthrough_buttonText: {
		color: "white",
		fontSize: fontSize(16),
	},
	share_walkthrough_title: {
		fontSize: fontSize(20),
		fontWeight: "bold",
		textAlign: "center",
		marginTop: height(5),
		color: Theme.primary,
	},
});

export default styles;
