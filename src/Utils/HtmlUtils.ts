import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackgroundFetchResult } from "expo-background-fetch";

const parseHTMLInBackground = async () => {
	try {
		const url = await AsyncStorage.getItem("activeURL");

		if (url) {
			const response = await fetch(url);
			const html = await response.text();
			await AsyncStorage.setItem("urlHTMLResponse", JSON.stringify(html));
		}
		return BackgroundFetchResult.NewData;
	} catch (err) {
		return BackgroundFetchResult.Failed;
	}
};

export { parseHTMLInBackground };
