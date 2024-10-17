import { StyleSheet } from "react-native";
import Theme, { fontSize, height, width } from "../../Theme/Theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primaryBackgroundColor,
		paddingVertical: height(10),
		paddingHorizontal: width(5),
		justifyContent: "center",
		alignItems: "center",
	},
	container__content__text: {
		fontSize: fontSize(24),
		fontWeight: "600",
	},
	container__img: {
		marginVertical: height(5),
		marginHorizontal: width(5),
		height: height(20),
		width: width(20),
		resizeMode: "contain",
		alignSelf: "center",
	},
	container__welcome__text: {
		marginVertical: height(2),
		marginHorizontal: width(2),
		fontSize: fontSize(22),
		fontWeight: "bold",
		textAlign: "center",
	},
	container__show: {
		elevation: 2,
		paddingVertical: height(0.7),
		paddingHorizontal: width(2),
		marginTop: height(3),
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Theme.darkGrey,
		borderRadius: 10,
		height: height(7),
		width: "100%",
		alignSelf: "center",
	},
	container__skip: {
		elevation: 2,
		paddingVertical: height(0.7),
		paddingHorizontal: width(2),
		marginVertical: height(0.5),
		alignItems: "center",
		borderRadius: 10,
		justifyContent: "center",
		height: height(7),
		width: "100%",
	},
	container__button__text: {
		fontSize: fontSize(15),
		fontWeight: "500",
		textAlign: "center",
	},
	container__description: {
		fontSize: fontSize(18),
		fontWeight: "500",
		textAlign: "center",
	},
});

export default styles;
