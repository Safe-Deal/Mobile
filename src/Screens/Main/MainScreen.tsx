import { useAppStore } from "@services/States/Webview/StateWebview";
import React, { ReactElement, useEffect, useState } from "react";
import { View } from "react-native";
import { MainWebView } from "../../Components/Browser/BrowserWebView/BrowserWebView";
import { ConclusionModal } from "../../Components/ProductAnalysis/ConclusionModal";
import { TabTypes } from "../../Shared/Constants";
import { isValidUrl } from "../../Utils/Urls";
import HomeScreen from "../Home/HomeScreen";
import s from "./MainScreen.styles";

export const MainScreen = (): ReactElement => {
	const {
		webViewRef,
		onShare,
		activeUrl,
		setActiveUrl,
		setActiveUrlHTML: setActiveEventHTML,
		isAnalyticsModalVisible,
		toggleAnalyticsModal: onAnalyticsModal,
	} = useAppStore();

	const [search, setSearch] = useState<string>("");
	const [isHomeActive, setIsHomeActive] = useState<boolean>(true);
	const [selectedTab, setSelectedTab] = useState<TabTypes>(TabTypes.ANALYZE__PRODUCT_INSIGHTS);

	useEffect(() => {
		setSearch(activeUrl);
		setSelectedTab(TabTypes.ANALYZE__PRODUCT_INSIGHTS);
		const isValid = isValidUrl(activeUrl);
		if (isValid) {
			setIsHomeActive(false);
		} else {
			setIsHomeActive(true);
		}
	}, [activeUrl]);

	return (
		<View style={s.mainScreen__container}>
			{!isHomeActive && <MainWebView URL={activeUrl} ref={webViewRef} />}
			{isHomeActive && (
				<HomeScreen setIsHomeActive={setIsHomeActive} setActiveEventHTML={setActiveEventHTML} setUrl={setActiveUrl} />
			)}
			<ConclusionModal
				isModalVisible={isAnalyticsModalVisible}
				onClose={() => {
					onAnalyticsModal();
				}}
				onShare={onShare}
				search={search}
				selectedTab={selectedTab}
				url={activeUrl}
				setSelectedTab={setSelectedTab}
			/>
		</View>
	);
};

export default MainScreen;
