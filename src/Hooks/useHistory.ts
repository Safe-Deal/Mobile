import { getProductInfo, isOurRetailer } from "./../Utils/SharedUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler } from "react-native";
import { isAffiliateRedirect } from "../Services/Affiliates/AffiliateManager";
import { isValidUrl } from "../Utils/Urls";
import { WebViewNavigation } from "react-native-webview/src/WebViewTypes";

interface IUseHistory {
	updateHistory: (e: WebViewNavigation) => void;
	goBack: () => void;
	goForward: () => void;
	canGoBackward: boolean;
	canGoForward: boolean;
}

const isNavRedirect = (e: WebViewNavigation): boolean => e.navigationType === "other";

export const useHistory = (setCurrentUrl: (url: string) => void): IUseHistory => {
	const [history, setHistory] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(-1);

	const historyPush = useCallback(
		(url: string) => {
			const newHistory = history.slice(0, currentIndex + 1);
			newHistory.push(url);
			setHistory(newHistory);
			setCurrentIndex(newHistory.length - 1);
		},
		[history, currentIndex, setCurrentUrl],
	);

	const updateHistory = useCallback(
		(e: WebViewNavigation) => {
			const isRedirect = isNavRedirect(e);
			if (isRedirect) {
				return;
			}

			const { url } = e;
			const isUrl = isValidUrl(url);
			if (!isUrl) {
				return;
			}

			const isAffiliate = isAffiliateRedirect(url);
			if (isAffiliate) {
				return;
			}

			const topHistory = history[currentIndex];

			if (!topHistory) {
				historyPush(url);
				return;
			}

			const isSameAsCurrent = topHistory == url;
			if (isSameAsCurrent) {
				return;
			}

			const isOurRetailerUrl = isOurRetailer(url);
			if (isOurRetailerUrl) {
				const product = getProductInfo(url);
				if (product) {
					const { productId } = product;
					const isNotOnTopInHistory = !topHistory.includes(productId);
					if (isNotOnTopInHistory) {
						historyPush(url);
						return;
					}
				}
			} else {
				historyPush(url);
			}
		},
		[history, currentIndex, setCurrentUrl],
	);

	const canGoBackward = useMemo(() => currentIndex > 0, [currentIndex, history]);
	const canGoForward = useMemo(() => currentIndex >= 0 && currentIndex < history.length - 1, [currentIndex, history]);

	const goBack = useCallback(() => {
		if (canGoBackward) {
			const newUrl = history[currentIndex - 1];
			if (!isValidUrl(newUrl)) {
				return;
			}

			setCurrentIndex(currentIndex - 1);
			setCurrentUrl(newUrl);
		}
	}, [currentIndex, history, setCurrentUrl, canGoBackward]);

	const goForward = useCallback(() => {
		if (canGoForward) {
			const newUrl = history[currentIndex + 1];
			if (!isValidUrl(newUrl)) {
				return;
			}

			setCurrentIndex(currentIndex + 1);
			setCurrentUrl(newUrl);
		}
	}, [currentIndex, history, setCurrentUrl, canGoForward]);

	useEffect(() => {
		const handleBackButton = () => {
			if (canGoBackward) {
				goBack();
				return true;
			}
			return false;
		};

		const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackButton);
		return () => backHandler.remove();
	}, [goBack, canGoBackward]);

	return { updateHistory, goBack, goForward, canGoBackward, canGoForward };
};
