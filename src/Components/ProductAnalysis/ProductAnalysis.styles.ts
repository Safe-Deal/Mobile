import { Dimensions, Platform, StyleSheet } from "react-native";
import Theme, { fontSize, height, width, STANDART_FONT } from "../../Theme/Theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
	product_analysis__container: {
		flex: 1,
		width: SCREEN_WIDTH,
		height: "100%",
		justifyContent: "space-between",
	},
	content_container: {
		flex: 1,
	},
	tabs_container: {
		paddingVertical: height(1),
		borderTopWidth: 1,
		borderTopColor: Theme.lightGrey,
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
		fontSize: STANDART_FONT,
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
	conclusion__top_tabs__menu: {
		flexDirection: "row",
		paddingLeft: width(0.8),
		paddingRight: width(0.8),
		alignSelf: "center",
	},
	conclusion__top_tabs__menu__selected: {
		alignSelf: "center",
		justifyContent: "center",
		paddingVertical: height(0.7),
		marginHorizontal: width(1),
	},
	conclusion__top_tabs__menu__item__text: {
		alignSelf: "center",
		justifyContent: "center",
		fontSize: fontSize(12),
		verticalAlign: "middle",
	},
});

export default styles;
