import { StyleSheet } from "react-native";
import Theme, { height, width } from "../../../Theme/Theme";

const styles = StyleSheet.create({
	browser_footer: {
		height: height(10, 50),
		backgroundColor: Theme.primaryBackgroundColor,
		flexDirection: "row",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: width(2),
		elevation: 20,
		shadowColor: Theme.iconColor,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		marginLeft: width(4),
		marginRight: width(4),
		borderWidth: 1,
		borderColor: "#D0D5DD",
	},
	main_tab_container: { flex: 1, backgroundColor: Theme.primaryBackgroundColor },
	browser_footer__right__container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: width(4, 12),
	},
	browser_footer__left__container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: width(4, 12),
	},
	browser_footer__navigation_btn: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: width(3),
		paddingRight: width(3),
	},
	browser_footer__action_btn: { justifyContent: "center", alignItems: "center" },
	browser_footer__tab__icon: {
		height: height(4),
		width: height(4),
		resizeMode: "contain",
	},
	browser_footer_tourguide_style: { paddingVertical: height(0.2), paddingHorizontal: width(1) },
	browser_footer_action_btn_style: {
		paddingVertical: height(0.5),
		paddingHorizontal: width(0.8),
		borderRadius: width(1.5),
	},
	browser_tab_container: {
		borderTopWidth: 0,
		paddingBottom: 0,
		height: height(8),
		borderTopLeftRadius: height(2),
		borderTopRightRadius: height(2),
		borderColor: "transparent",
		marginTop: height(0.1),
	},
});

export default styles;
