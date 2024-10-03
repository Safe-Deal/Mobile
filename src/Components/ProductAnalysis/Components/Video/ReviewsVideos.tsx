import React from "react";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import { INJECTED_SCRIPTS } from "../../../Browser/BrowserWebView/scripts/scripts";
import { View } from "react-native";
import s from "./ReviewsVideos.style";

export const ReviewsVideos = () => {
	const { allProductsState } = useSelector((state: any) => state.Products);
	const productTitle = `${allProductsState?.product?.title} reviews` || "";

	const videoUrl = `https://www.youtube.com/results?search_query=${productTitle}&autoplay=0`;
	return (
		<WebView
			style={s.review_video}
			injectedJavaScriptBeforeContentLoaded={INJECTED_SCRIPTS}
			source={{ uri: videoUrl }}
			mediaPlaybackRequiresUserAction={true}
			decelerationRate="normal"
			mediaPlaybackRequiresUserGesture={true}
			allowsInlineMediaPlayback={true}
			scrollEnabled={true}
			mixedContentMode="always"
			setSupportMultipleWindows={false}
			contentMode="recommended"
		/>
	);
};

export default ReviewsVideos;
