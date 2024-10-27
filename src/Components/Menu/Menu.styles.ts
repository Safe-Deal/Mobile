import { StyleSheet } from "react-native";
import Theme, { fontSize, height, heightByOs, width, STANDART_FONT } from "../../Theme/Theme";

const styles = StyleSheet.create({
	top_toolbar__menu_btn_no_decision: {
		color: Theme.colorBlackish,
	},
	top_toolbar__menu_btn_decision: {
		color: Theme.antiFlashWhite,
	},
	top_toolbar__menu_icon: {
		fontSize: fontSize(21),
		marginLeft: width(2),
		padding: 0,
	},
	top_toolbar__container: {
		marginTop: height(1.5),
		paddingLeft: width(1.5),
		paddingRight: width(1.5),
		display: "flex",
		flexDirection: "row",
		backgroundColor: Theme.primaryBackgroundColor,
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: height(1),
		gap: width(3),
	},
	top_toolbar__home_btn: {
		verticalAlign: "middle",
	},
	top_toolbar_url__container: {
		flex: 1,
		display: "flex",
		position: "relative",
		flexDirection: "row",
		alignItems: "center",
	},
	top_toolbar_url__input: {
		fontSize: STANDART_FONT,
		flexGrow: 1,
		flexShrink: 1,
		flex: 1,
		display: "flex",
		alignSelf: "center",
		textTransform: "none",
		height: height(5),
		borderRadius: height(5),
		paddingLeft: width(3),
	},
	top_toolbar_url__action_btn: {
		position: "absolute",
		top: heightByOs({ ios: 1.3, android: 0.75 }),
		right: width(3, 12),
		justifyContent: "center",
	},
});

export default styles;
