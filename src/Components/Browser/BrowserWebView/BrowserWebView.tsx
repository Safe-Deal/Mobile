import { useProductAnalysis } from "@services/ProductAnalysis";
import { getProductInfo, isValidDomain } from "@utils/SharedUtils";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { WebView, WebViewProps } from "react-native-webview";
import { ShouldStartLoadRequest, WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes";
import { WebViewErrorEvent, WebViewNavigation } from "react-native-webview/src/WebViewTypes";
import { useAppContext } from "../../../Context/AppContext";
import { useAffiliate } from "../../../Services/Affiliates/AffiliateData";
import {
	getAffiliateUrl,
	hasAffiliateParams,
	isAffiliateRedirect,
} from "../../../Services/Affiliates/AffiliateManager";
import Theme from "../../../Theme/Theme";
import { debug } from "../../../Utils/Analytics";
import { isValidUrl } from "../../../Utils/Urls";
import { styles } from "./BrowserWebView.styles";
import { useLoopPrevention } from "./hooks/useLoopPrevention";
import { useUserAgent } from "./hooks/useUserAgent";
import { INJECTED_SCRIPTS } from "./scripts/scripts";
import { useProductsStore } from "@services/States/Products/StateProducts";

interface MainWebViewProps {
	URL: string;
}

const ALLOWED_SCHEMES = ["http://", "https://"];
const ORIGIN_WHITELIST = ["*", "aliexpress://*", "ebay://*", "amazon://*"];
const NAV_TIMEOUT_IN_SECONDS = 120;
const DISPLAY_WHEN_LOADED = 0.65;

const WEB_VIEW_SETTINGS: WebViewProps = {
	javaScriptEnabled: true,
	domStorageEnabled: true,
	allowUniversalAccessFromFileURLs: true,
	mediaPlaybackRequiresUserAction: true,
	allowsInlineMediaPlayback: true,
	scalesPageToFit: true,
	decelerationRate: "normal",
	renderLoading: () => <></>,
	bounces: true,
	startInLoadingState: true,
	originWhitelist: ORIGIN_WHITELIST,
	injectedJavaScriptBeforeContentLoaded: INJECTED_SCRIPTS,
	injectedJavaScriptBeforeContentLoadedForMainFrameOnly: true,
	mixedContentMode: "always",
	setSupportMultipleWindows: false,
	contentMode: "recommended",
};

const WebviewLoader = () => (
	<View style={styles.webView__loading}>
		<ActivityIndicator color={Theme.primary} size="large" />
	</View>
);

const isNavClick = (e: ShouldStartLoadRequest): boolean => e.isTopFrame && e.navigationType === "click";

export const MainWebView = forwardRef(({ URL }: MainWebViewProps, ref) => {
	const { handleUrlChange, handleWebViewMessage, setActiveUrl } = useAppContext();
	const webViewRef = useRef<WebView>(null);
	const [currentUrl, setCurrentUrl] = useState<string>(URL);
	const [isWebViewLoading, setIsWebViewLoading] = useState(false);
	const { handleLoopPrevention } = useLoopPrevention(webViewRef);
	const userAgent = useUserAgent();
	const { sendRequest } = useProductAnalysis(null);
	const { data: affiliates, isLoading: isAffiliatesLoading } = useAffiliate();
	const { resetAllProducts } = useProductsStore();

	const onUrlChange = (url: string) => {
		affiliationRedirect(url)
			.then((affUrl) => {
				if (affUrl) {
					setCurrentUrl(affUrl);
					debug("SDWebView::affiliationRedirect", affUrl);
					sendRequest(affUrl);
				}
			})
			.catch((error) => {
				debug("SDWebView::affiliationRedirect::Error", error);
			})
			.finally(() => {
				setActiveUrl(url);
			});
	};

	useEffect(() => {
		if (URL) {
			setCurrentUrl(URL);
			resetAllProducts();
			const product = getProductInfo(URL);
			if (product && Object.keys(product).length > 0) {
				sendRequest(URL);
			} else if (isValidDomain(URL)) {
				sendRequest(URL);
			} else {
				console.log("not valid url");
			}
		}
	}, [URL]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (isWebViewLoading) {
				webViewRef?.current?.stopLoading();
				setIsWebViewLoading(false);
			}
		}, NAV_TIMEOUT_IN_SECONDS * 1000);

		return () => clearTimeout(timeout);
	}, [isWebViewLoading]);

	useImperativeHandle(ref, () => ({
		refresh: () => {
			resetAllProducts();
			webViewRef?.current?.reload();
		},
		goToUrl: (targetUrl: string) => {
			setCurrentUrl(targetUrl);
		},
	}));

	const onNavStateChange = async (navState: WebViewNavigation): Promise<void> => {
		debug("SDWebView::NavState:navigated: ", navState.url);
		handleUrlChange(navState);
		handleLoopPrevention(navState);
	};

	const shouldStartLoadWithRequest = (request: ShouldStartLoadRequest) => {
		const isAllowed = ALLOWED_SCHEMES.some((scheme) => request.url.startsWith(scheme));
		if (!isAllowed) {
			return false;
		}

		if (request.url.includes("login")) {
			return false;
		}

		const isAffiliate = hasAffiliateParams(request.url);

		if (isAffiliate) {
			return true;
		}

		if (isNavClick(request)) {
			setCurrentUrl(request.url);
			debug("SDWebView::shouldStartLoadWithRequest::Aborted URL", { url: request.url, aborted: true });
			return false;
		}

		return true;
	};

	const affiliationRedirect = async (url: string): Promise<string | null> => {
		try {
			const redirectUrl: string | null = await getAffiliateUrl(affiliates, url);
			if (redirectUrl) {
				return redirectUrl;
			}
		} catch (e) {
			debug("SDWebView::Affiliate::Error", e);
		}
		return null;
	};

	const onLoadStart = (syntheticEvent) => {
		const { nativeEvent } = syntheticEvent;
		const { url } = nativeEvent;
		setIsWebViewLoading(true);
		const isValid = isValidUrl(url);
		if (!isValid) {
			debug("SDWebView::InvalidUrl", url);
			return;
		}
		if (isAffiliateRedirect(url)) {
			return;
		} else {
			onUrlChange(url);
			setCurrentUrl(url);
		}
	};

	const onLoadEnd = () => {
		setIsWebViewLoading(false);
	};

	const onLoadProgress = (event: WebViewProgressEvent): void => {
		const progress = event.nativeEvent.progress;
		if (progress >= DISPLAY_WHEN_LOADED) {
			setIsWebViewLoading(false);
		}
	};

	return (
		<>
			{isWebViewLoading && !isAffiliatesLoading && <WebviewLoader />}
			<View style={styles.webView__container}>
				<WebView
					ref={webViewRef}
					onMessage={handleWebViewMessage}
					source={{ uri: currentUrl }}
					style={styles.webview}
					onNavigationStateChange={onNavStateChange}
					onError={(error: WebViewErrorEvent): void => {
						debug("SDWebView::Error", error);
						setIsWebViewLoading(false);
					}}
					scrollEnabled
					showsVerticalScrollIndicator
					onHttpError={(error): void => {
						debug("SDWebView::HttpError", error);
						setIsWebViewLoading(false);
					}}
					onLoadStart={onLoadStart}
					onLoadEnd={onLoadEnd}
					onLoadProgress={onLoadProgress}
					onShouldStartLoadWithRequest={shouldStartLoadWithRequest}
					userAgent={userAgent}
					{...WEB_VIEW_SETTINGS}
				/>
			</View>
		</>
	);
});
