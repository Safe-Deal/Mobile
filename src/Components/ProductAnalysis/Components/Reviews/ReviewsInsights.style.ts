import { StyleSheet } from "react-native";
import { STANDART_FONT, height, width } from "../../../../Theme/Theme";

const styles = StyleSheet.create({
	reviews_summary: {
		maxHeight: height(60),
	},
	reviews_summary__list: {
		fontWeight: "bold",
		fontSize: STANDART_FONT,
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
		fontSize: STANDART_FONT,
	},
	reviews_summary__no_reviews: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 20,
	},
	reviews_summary__no_reviews__text: {
		textAlign: "center",
		fontSize: STANDART_FONT,
	},
	reviews_images__container: {
		flex: 1,
		marginTop: height(0.7),
		maxHeight: height(60),
	},
});

export default styles;
