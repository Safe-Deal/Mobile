import { StyleSheet } from "react-native";
import Theme from "../../../Theme/Theme";

const styles = StyleSheet.create({
	custom_modal: {
		margin: 0,
		width: "100%",
		justifyContent: "flex-end",
	},
	custom_modal__overlay: {
		marginBottom: 4,
		backgroundColor: Theme.darkGrey,
		width: 180,
		height: 6,
		alignSelf: "center",
		borderRadius: 10,
		zIndex: 999,
	},
});

export default styles;
