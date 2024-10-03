import { StyleSheet } from "react-native";
import { fontSize, height, width } from "../../Theme/Theme";

const styles = StyleSheet.create({
	conclusion__modal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	conclusion__view: {
		flexGrow: 1,
		backgroundColor: "#fff",
	},
	conclusion__container: {
		backgroundColor: "#fff",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		height: height(80),
	},
	conclusion__header: {
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: height(0.5, 5),
		paddingVertical: height(1),
		marginBottom: height(1),
		height: height(8),
	},
	conclusion__title: {
		flexDirection: "row",
		gap: width(1.4, 8),
		justifyContent: "center",
		alignItems: "center",
		verticalAlign: "middle",
		paddingTop: height(0.1),
	},
	sheet_list_view: { height: height(60) },
	conclusion__title__text: {
		display: "flex",
		alignSelf: "center",
		fontSize: fontSize(17),
		verticalAlign: "middle",
		color: "#fff",
	},
	conclusion__share: { right: width(4.5) },
	conclusion__close: { left: width(4.5) },
	conclusion__top_tabs__container: { flex: 1 },
	conclusion__top_tabs__menu: {
		flex: 1,
		flexDirection: "row",
		paddingLeft: width(0.8),
		paddingRight: width(0.8),
	},
	conclusion__top_tabs__menu__selected: {
		alignSelf: "center",
		justifyContent: "center",
		paddingVertical: height(0.7),
	},
	conclusion__item_separator: {
		marginRight: width(1.6),
	},
	conclusion__top_tabs__menu__item__text: {
		alignSelf: "center",
		justifyContent: "center",
		fontSize: fontSize(12),
		verticalAlign: "middle",
	},
	conclusion_seperator_text: {
		fontSize: fontSize(24),
		lineHeight: 24,
		color: "#EAECF0",
		verticalAlign: "middle",
	},
	conclusion_chip_container: { justifyContent: "center", flexDirection: "row", alignItems: "center" },
});

export default styles;
