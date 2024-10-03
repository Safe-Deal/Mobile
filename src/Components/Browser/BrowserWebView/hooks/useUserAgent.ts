import { useEffect, useState } from "react";
import expoConst from "expo-constants";
import { Platform } from "react-native";
import { debug, logError } from "../../../../Utils/Analytics";

const DEFAULT_USER_AGENT = Platform.select({
	ios: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/15E148 Safari/604.1",
	android:
		"Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Chrome Safari/537.36 Mobile",
}) as string;

export const useUserAgent = (): string => {
	const [userAgent, setUserAgent] = useState<string>(DEFAULT_USER_AGENT);

	useEffect(() => {
		const fetchUserAgent = async () => {
			try {
				const ua = await expoConst.getWebViewUserAgentAsync();
				if (!ua) {
					setUserAgent(DEFAULT_USER_AGENT);
					return;
				}
				const modifiedUa = ua.replace("; wv", "").replace("Mobile", "Safari");
				const finalUa = Platform.select({
					ios: modifiedUa,
					android: `${modifiedUa} Mobile`,
				}) as string;
				setUserAgent(finalUa);
			} catch (error) {
				logError("useUserAgent", error);
				setUserAgent(DEFAULT_USER_AGENT);
			}
		};

		fetchUserAgent();
	}, []);

	return userAgent;
};
