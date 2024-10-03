import { StyleSheet } from "react-native";
import Theme, { height, width } from "../../../Theme/Theme";

const styles = StyleSheet.create({
	about__modal: {
		backgroundColor: Theme.primaryBackgroundColor,
		width: "90%",
		maxHeight: "90%",
		padding: height(1),
		margin: width(5),
		borderRadius: width(3),
		marginBottom: height(1),
	},
	about__container: {
		padding: height(2),
	},
	about__card: {
		marginBottom: height(3),
	},
	about__card__headerText: {
		fontSize: height(2.5),
		color: Theme.primary,
		textAlign: "center",
	},
	about__normalText: {
		fontSize: height(1.8),
		textAlign: "center",
		marginBottom: height(1),
	},
	about__shareButton__container: {
		marginTop: height(0.5),
		marginBottom: height(0.5),
		flexDirection: "row",
		justifyContent: "center",
		verticalAlign: "middle",
		maxHeight: height(8),
	},
	about__shareButton: {
		margin: width(1),
		width: width(8),
		height: height(4),
	},
	about__suggestionText: {
		fontSize: height(2),
		textDecorationLine: "underline",
		textAlign: "center",
		color: "blue",
	},
	about__close: {
		marginTop: height(1),
		marginBottom: height(1),
	},
	about__close__btn: {
		fontSize: height(1.8),
	},
});

export default styles;
