import { StyleSheet } from "react-native";
import Theme from "../../Theme/Theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primaryBackgroundColor,
		justifyContent: "center",
		alignItems: "center",
	},
	contentTxt: {
		fontSize: 24,
		fontWeight: "600",
	},
});

export default styles;
