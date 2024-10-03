import React, { Context, createContext, useContext, useEffect, useRef, useState } from "react";
import { Share } from "react-native";
import { WebViewMessageEvent, WebViewNavigation } from "react-native-webview";
import { useShareIntent } from "../Hooks/useShareIntent";
import { debug } from "../Utils/Analytics";
import { useHistory } from "../Hooks/useHistory";
import { extractLastUrlFromString } from "../Utils/SharedUtils";

export interface IWebViewRefProps {
	refresh: () => void;
	goToUrl: (url: string) => void;
}

export interface IAppContext {
	webViewRef: React.MutableRefObject<IWebViewRefProps | undefined>;
	activeUrl: string;
	setActiveUrl: (val: string) => void;
	activeUrlHTML: HTMLElement | string | null;
	historyCanGoBackward: boolean;
	historyCanGoForward: boolean;
	historyGoBack: () => void;
	historyGoForward: () => void;
	handleUrlChange: (e: WebViewNavigation) => void;
	handleWebViewMessage: (data: WebViewMessageEvent) => void;
	setActiveUrlHTML: (val: string | null) => void;
	isAnalyticsModalVisible: boolean;
	toggleAnalyticsModal: () => void;
	onShare: (data: string) => void;
}

const AppContext: Context<IAppContext> = createContext<IAppContext>({
	webViewRef: { current: undefined },
	activeUrl: "",
	setActiveUrl: () => {},
	activeUrlHTML: null,
	setActiveUrlHTML: () => {},
	handleUrlChange: () => {},
	handleWebViewMessage: () => {},
	isAnalyticsModalVisible: false,
	toggleAnalyticsModal: () => {},
	onShare: () => {},
	historyCanGoBackward: false,
	historyCanGoForward: false,
	historyGoBack: () => {},
	historyGoForward: () => {},
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const webViewRef = useRef<IWebViewRefProps>();
	const [activeUrl, setActiveUrl] = useState<string>("");
	const [activeUrlHTML, setActiveUrlHTML] = useState<string | null>(null);
	const [isAnalyticsModalVisible, setAnalyticsModalVisible] = useState<boolean>(false);

	const {
		hasShareIntent,
		shareIntent,
		resetShareIntent,
		error: shareIntentError,
	} = useShareIntent({
		debug: false,
		resetOnBackground: true,
	});

	useEffect(() => {
		if (webViewRef?.current) {
			webViewRef.current.goToUrl(activeUrl);
		}
	}, [activeUrl]);

	const handleUrlChange = async (e: WebViewNavigation) => {
		updateHistory(e);
	};

	const {
		updateHistory,
		goBack,
		goForward,
		canGoBackward: historyCanGoBackward,
		canGoForward: historyCanGoForward,
	} = useHistory(setActiveUrl);

	useEffect(() => {
		if (hasShareIntent) {
			if (shareIntent?.text) {
				const textOrLink = shareIntent?.webUrl || shareIntent?.text;
				const sharedUrl = extractLastUrlFromString(textOrLink);
				debug("AppContextProvider:: sharedUrl", sharedUrl);
				if (sharedUrl) {
					setActiveUrl(sharedUrl);
				}
			}
			if (shareIntentError) {
				debug("AppContextProvider:: shareIntent", shareIntentError);
			}
			resetShareIntent();
		}
	}, [hasShareIntent]);

	const toggleAnalyticsModal = () => {
		setAnalyticsModalVisible(!isAnalyticsModalVisible);
	};

	const handleShare = async (data: any) => {
		try {
			await Share.share({
				message: data,
			});
		} catch (error) {
			debug(error);
		}
	};

	const historyGoBack = () => {
		goBack();
	};

	const historyGoForward = () => {
		goForward();
	};

	return (
		<AppContext.Provider
			value={{
				webViewRef,
				activeUrl,
				setActiveUrl,
				activeUrlHTML,
				setActiveUrlHTML,
				historyCanGoBackward,
				historyCanGoForward,
				historyGoBack,
				historyGoForward,
				handleUrlChange,
				isAnalyticsModalVisible,
				toggleAnalyticsModal,
				onShare: handleShare,
				handleWebViewMessage: () => {},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = (): IAppContext => {
	return useContext(AppContext);
};
