import { StyleSheet } from "react-native";
import Theme, { fontSize, height, width } from "../../../../../Theme/Theme";

const styles = StyleSheet.create({
	images_carousel__container: {
		alignItems: "center",
	},
	images_carousel__title: {
		paddingBottom: height(0.2),
		fontSize: fontSize(12),
		alignItems: "center",
		fontWeight: "bold",
	},
	images_carousel__slider__container: {
		padding: height(1),
	},
	images_carousel__pagination: {
		paddingBottom: height(0.4),
		flexDirection: "row",
		justifyContent: "center",
		width: width(84),
		alignSelf: "center",
		flexWrap: "wrap",
	},
	images_carousel__dot__container: {
		backgroundColor: "white",
		width: height(1.2),
		height: height(1.2),
		borderRadius: 50,
		borderWidth: 1,
		borderColor: Theme.iconColor,
		overflow: "hidden",
		marginLeft: 1,
		marginRight: 1,
		marginTop: 5,
	},
	images_carousel__dot: {
		borderRadius: 50,
		flex: 1,
		width: width(2),
	},
});

export default styles;
