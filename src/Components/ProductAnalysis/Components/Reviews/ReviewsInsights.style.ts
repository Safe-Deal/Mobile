import { StyleSheet } from "react-native";
import { fontSize, height, screenHeight, screenWidth, width } from "../../../../Theme/Theme";

const styles = StyleSheet.create({
	reviews_summary: {
		maxHeight: height(60),
	},
	reviews_summary__list: {
		fontWeight: "bold",
		fontSize: fontSize(14),
		paddingTop: height(0.1),
		paddingBottom: height(0.1),
		paddingLeft: width(6, 20),
	},
	reviews_summary__list__item: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		marginHorizontal: width(8.8),
		marginTop: height(0.2),
		marginLeft: width(6, 28),
	},
	reviews_summary__list__item__text: {
		flex: 1,
		fontSize: fontSize(14),
	},
	reviews_summary__no_reviews: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 20,
	},
	reviews_summary__no_reviews__text: {
		textAlign: "center",
		fontSize: fontSize(14),
	},
	reviews_images__container: {
		flex: 1,
		marginTop: height(0.7),
		maxHeight: height(60),
	},
});

export default styles;
