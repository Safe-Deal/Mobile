import { StyleSheet } from "react-native";
import { height, screenHeight, screenWidth } from "../../../../Theme/Theme";

const styles = StyleSheet.create({
	review_video_container: {
		width: screenWidth(),
		height: screenHeight(),
	},
	review_video: {
		width: screenWidth(),
		height: height(60),
	},
});

export default styles;
