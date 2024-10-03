import { StyleSheet } from "react-native";
import Theme from "../../Theme/Theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primaryBackgroundColor,
		padding: 20,
	},
	contentTxt: {
		fontSize: 24,
		fontWeight: "600",
	},
	imgStyle: {
		margin: 20,
		height: 90,
		width: 90,
		resizeMode: "contain",
		alignSelf: "center",
	},
	profileText: {
		margin: 10,
		fontSize: 22,
		fontWeight: "bold",
		alignSelf: "center",
	},

	listStyle: {
		elevation: 2,
		justifyContent: "space-between",
		padding: 10,
		marginVertical: 10,
		alignItems: "center",
		backgroundColor: "#f0f1f3",
		borderRadius: 10,
		flexDirection: "row",
		height: 60,
		width: "100%",
		alignSelf: "center",
	},
	setting: {
		fontSize: 18,
		fontWeight: "500",
	},
	listText: {
		fontSize: 16,
		color: "#4d4d7c",
	},
	modalContainer: {
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: Theme.primaryBackgroundColor,
		height: 300,
		width: "100%",
	},
	details: {
		margin: 10,
	},
});

export default styles;
