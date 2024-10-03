import React, { useRef, useEffect, useCallback } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import { debug } from "../../../../Utils/Analytics";

const MAX_NAVIGATION_AMOUNT = 15;
const TIME_WINDOW_IN_MS = 10 * 1000;

type IUseLoopPrevention = {
	handleLoopPrevention: (navState: WebViewNavigation) => void;
};

export const useLoopPrevention = (webViewRef: React.RefObject<WebView>): IUseLoopPrevention => {
	const navigationCounts = useRef<{ [key: string]: number }>({});
	const navigationTimestamps = useRef<{ [key: string]: number[] }>({});

	const handleLoopPrevention = useCallback(
		(navState: WebViewNavigation) => {
			const url = navState.url;
			const now = Date.now();

			if (!navigationCounts.current[url]) {
				navigationCounts.current[url] = 1;
				navigationTimestamps.current[url] = [now];
			} else {
				navigationCounts.current[url] += 1;
				navigationTimestamps.current[url].push(now);
			}

			navigationTimestamps.current[url] = navigationTimestamps.current[url].filter(
				(timestamp) => now - timestamp < TIME_WINDOW_IN_MS,
			);

			navigationCounts.current[url] = navigationTimestamps.current[url].length;

			if (navigationCounts.current[url] > MAX_NAVIGATION_AMOUNT) {
				debug(
					"useLoopPrevention::",
					`Loop detected for ${url} visited ${navigationCounts.current[url]} -> stopping loading `,
				);
				webViewRef.current?.stopLoading();
			}
		},
		[webViewRef],
	);

	useEffect(() => {
		navigationCounts.current = {};
		navigationTimestamps.current = {};
	}, []);

	return { handleLoopPrevention };
};
