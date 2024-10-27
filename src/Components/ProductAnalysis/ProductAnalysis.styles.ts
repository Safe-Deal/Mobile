import { Dimensions, Platform, StyleSheet } from "react-native";
import { fontSize, height, width } from "../../Theme/Theme";

const styles = StyleSheet.create({
	product_analysis__container: {
		flex: 1,
		width: width(100),
		height: height(100),
	},
	product_insights__container: {
		flex: 1,
		marginLeft: width(1.5),
		marginRight: width(1.5),
		justifyContent: "center",
	},
	product_insights__list: { flex: 1, marginBottom: height(1) },
	product_insights__list__item: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		verticalAlign: "middle",
		paddingTop: height(0.5),
		paddingBottom: height(0.5),
	},
	product_insights__list__text: {
		fontSize: fontSize(14),
		width: Dimensions.get("window").width - width(15),
	},
	product_insights__list__tooltip: {
		width: Dimensions.get("window").width / 1.75,
		...Platform.select({
			android: {
				top: -12,
			},
		}),
	},
	product_insights__chart__container: {
		marginVertical: height(2),
		flex: 1,
	},
	product_insights__chart: { flex: 1 },
});

export default styles;
