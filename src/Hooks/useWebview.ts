import { IWebViewRefProps } from "@context/AppContext";
import { useAppStore } from "@services/States/Webview/StateWebview";
import { useEffect, useRef } from "react";
import { WebViewMessageEvent, WebViewNavigation } from "react-native-webview";
import { useHistory } from "../Hooks/useHistory";
import { useShareIntent } from "../Hooks/useShareIntent";
import { debug } from "../Utils/Analytics";
import { extractLastUrlFromString } from "../Utils/SharedUtils";

export const useApp = () => {
	const store = useAppStore();
	const {
		hasShareIntent,
		shareIntent,
		resetShareIntent,
		error: shareIntentError,
	} = useShareIntent({
		debug: false,
		resetOnBackground: true,
	});

	const handleUrlChange = async (e: WebViewNavigation) => {
		updateHistory(e);
	};

	return {
		handleUrlChange,
		historyGoBack: goBack,
		historyGoForward: goForward,
		historyCanGoBackward,
		historyCanGoForward,
		handleWebViewMessage: () => {},
	};
};
