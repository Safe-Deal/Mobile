import { fontSize } from "./../../Theme/Theme";
import { Platform, StyleSheet } from "react-native";
import Theme, { height, width } from "../../Theme/Theme";

const styles = StyleSheet.create({
	homePage__container: {
		flex: 1,
		backgroundColor: Theme.primaryBackgroundColor,
	},
	homePage__links: { flex: 1, justifyContent: "center", alignItems: "center" },
	homePage__links__row: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
	},

	homePage__links_box: {
		margin: 6,
		backgroundColor: Theme.antiFlashWhite,
		borderRadius: 50,
		...Platform.select({
			ios: {
				shadowColor: "rgba(0,0,0,0.08)",
				shadowOffset: {
					width: 0,
					height: 8,
				},
				shadowOpacity: 1,
				shadowRadius: 16,
			},
			android: {
				elevation: 1.5,
			},
		}),
	},
	homePage__links_box__icon: {
		margin: width(5),
		height: width(10),
		width: width(10),
		resizeMode: "contain",
	},
	homePage__links_box__text: {
		fontSize: height(2),
		textAlign: "center",
	},
	homePage__modal__container: {
		paddingHorizontal: width(5),
		paddingVertical: height(3),
		backgroundColor: "white",
		width: "90%",
		alignSelf: "center",
		borderRadius: width(2),
	},
	homePage__modal__input: {
		padding: height(1.2),
		margin: height(0.7),
		borderRadius: width(2),
		backgroundColor: "#f0f1f3",
		height: height(6),
	},
	homePage__modal: {
		justifyContent: "center",
	},
	homePage__modal__title_text: {
		fontSize: fontSize(20),
		fontWeight: "400",
		marginBottom: width(1.8),
		textAlign: "center",
	},
	homePage__modal__button: {
		width: width(37),
		borderRadius: width(2),
		backgroundColor: Theme.goGreen,
		color: Theme.primaryBackgroundColor,
		paddingVertical: height(0.7),
	},
	homePage__modal__cancel_button: {
		width: width(37),
		borderWidth: 1,
		borderRadius: width(2),
		borderColor: Theme.darkGreen,
		color: Theme.darkGreen,
		paddingVertical: height(0.7),
	},
	row_view: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: height(1),
	},
	homePage_addlink_container: { justifyContent: "center", alignItems: "center" },
});

export default styles;
