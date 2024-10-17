import LanguageModal from "@components/Common/LanguageModal/LanguageModal";
import { useOnboardContext } from "@context/onBoardContext";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { ConclusionTypes, Images } from "@shared/Constants";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TourGuideZone, useTourGuideController } from "rn-tourguide";
import { useAppContext } from "../../../Context/AppContext";
import { resetAllProducts } from "../../../Redux/JoinSafeDeal/JoinSafeDeal";
import { RootState } from "../../../Redux/Store";
import { MainScreen } from "../../../Screens/Main/MainScreen";
import Theme, { height } from "../../../Theme/Theme";
import { createGoogleSearchUrl, getProductInfo, getWebProductUrl } from "../../../Utils/SharedUtils";
import { isItemDetails } from "../../../Utils/SiteUtils";
import IconButton from "../../Common/Icons/IconButton";
import SafeDealLogoSvg from "../../Common/Images/SafeDealLogoSvg";
import { SpinnerLoader } from "../../Common/Loaders/SpinnerLoader";
import { Menu } from "../../Menu/Menu";
import { SearchBar } from "../../Menu/Components/UrlTextbox";
import s from "./BrowserFooter.styles";
import { ConclusionIcon } from "./Components/ConclusionIcon";
import { useTranslation } from "@hooks/useTranslation";
import { debug } from "@utils/Analytics";

const Tab = createBottomTabNavigator();
const BOTTOM_ICONS_SIZE = height(4);
const DEFAULT_ICON = (
	<SafeDealLogoSvg
		style={[s.browser_footer__action_btn, { opacity: 0.25 }]}
		width={BOTTOM_ICONS_SIZE}
		height={BOTTOM_ICONS_SIZE}
	/>
);

const BrowserFooterToolbar = () => {
	const {
		historyGoBack,
		historyGoForward,
		historyCanGoForward,
		historyCanGoBackward,
		webViewRef,
		setActiveUrlHTML: setActiveEventHTML,
		setActiveUrl,
		activeUrl,
	} = useAppContext();
	const [search, setSearch] = useState<string>("");

	const handleBackward = () => {
		historyGoBack();
	};

	const handleForward = () => {
		historyGoForward();
	};

	const handleReload = (): void => {
		if (webViewRef?.current) {
			webViewRef?.current?.refresh();
		}
	};

	const handleSearch = async () => {
		setActiveEventHTML(null);
		if (search === "") {
			setActiveUrl("");
		} else {
			const googleUrl = createGoogleSearchUrl(search);
			setSearch(googleUrl);
			setActiveUrl(googleUrl);
		}
	};

	const isBackwardDisabled = !historyCanGoBackward;
	const isForwardDisabled = !historyCanGoForward;
	return (
		<View style={s.browser_footer}>
			<View style={s.browser_footer__left__container}>
				<IconButton
					name="chevron-left"
					onPress={handleBackward}
					style={s.browser_footer__navigation_btn}
					size={BOTTOM_ICONS_SIZE}
					color={isBackwardDisabled ? Theme.disabled : Theme.colorBlackish}
					disabled={isBackwardDisabled}
				/>
				<SearchBar
					value={search || activeUrl}
					onReload={handleReload}
					onChangeText={(text: string) => setSearch(text)}
					onSubmitEditing={handleSearch}
				/>
				<IconButton
					name="chevron-right"
					onPress={handleForward}
					style={s.browser_footer__navigation_btn}
					color={isForwardDisabled ? Theme.disabled : Theme.colorBlackish}
					size={BOTTOM_ICONS_SIZE}
					disabled={isForwardDisabled}
				/>
			</View>
		</View>
	);
};

const BrowserFooterContent = () => {
	const { activeUrl, toggleAnalyticsModal, onShare, setActiveUrl } = useAppContext();
	const { allProductsState, loading } = useSelector((state: RootState) => state.Products);
	const dispatch = useDispatch();
	const { showTooltip } = useOnboardContext();
	const { start, canStart, eventEmitter, stop } = useTourGuideController("tour1");
	const navigation = useNavigation();
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
	const { t } = useTranslation();
	useEffect(() => {
		if (showTooltip && canStart && allProductsState?.product?.conclusion) {
			start();
		}
	}, [canStart, showTooltip, allProductsState?.product?.conclusion]);

	useEffect(() => {
		if (eventEmitter) {
			const handleOnStart = () => {
				debug("start");
			};
			const handleOnStop = () => {
				debug("stop");
			};
			const handleOnStepChange = (event) => {
				if (event?.order > 1) {
					stop();
					navigation.navigate("ConclusionView" as never);
				}
			};

			eventEmitter.on("start", handleOnStart);
			eventEmitter.on("stop", handleOnStop);
			eventEmitter.on("stepChange", handleOnStepChange);

			return () => {
				eventEmitter.off("start", handleOnStart);
				eventEmitter.off("stop", handleOnStop);
				eventEmitter.off("stepChange", handleOnStepChange);
			};
		}
	}, [eventEmitter]);

	const backgroundColor: string =
		allProductsState?.product?.conclusion === ConclusionTypes.INSUFFICIENT_DATA
			? Theme.americanGray
			: allProductsState?.product?.conclusion === ConclusionTypes.RECOMMENDED
				? Theme.primary
				: allProductsState?.product?.conclusion === ConclusionTypes.NOT_RECOMMENDED
					? Theme.stuckRed
					: allProductsState?.product?.conclusion === ConclusionTypes.DOUBTFUL
						? Theme.warningColor
						: Theme.primaryBackgroundColor;

	const renderProductIcon = (allProductsState, activeUrl, loading) => {
		if (!allProductsState?.product) {
			return DEFAULT_ICON;
		}
		const productId = allProductsState?.product?.id;
		const productIdFromUrl = getProductInfo(activeUrl)?.productId;
		if (productId !== productIdFromUrl) {
			return DEFAULT_ICON;
		}

		const Conclusion = () => (
			<TouchableOpacity
				disabled={!allProductsState || loading || !isItemDetails(activeUrl)}
				onPress={toggleAnalyticsModal}
				style={s.browser_footer__action_btn}
			>
				<ConclusionIcon conclusion={allProductsState?.product?.conclusion} BOTTOM_ICONS_SIZE={BOTTOM_ICONS_SIZE} />
			</TouchableOpacity>
		);

		const result = <Conclusion />;
		return result;
	};

	const BrowserFooterAction = () => {
		if (!isItemDetails(activeUrl) && !loading) {
			return DEFAULT_ICON;
		}

		return (
			<>
				{loading ? (
					<SpinnerLoader size={BOTTOM_ICONS_SIZE} style={s.browser_footer__action_btn} />
				) : (
					renderProductIcon(allProductsState, activeUrl, loading)
				)}
			</>
		);
	};

	return (
		<View style={s.main_tab_container}>
			<Tab.Navigator
				tabBar={(props) => {
					return (
						<>
							<TourGuideZone tourKey="tour1" isTourGuide zone={2} text={t("")} borderRadius={16} />
							<BrowserFooterToolbar />
							<BottomTabBar {...props} />
						</>
					);
				}}
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: [s.browser_tab_container, { backgroundColor }],
				}}
				initialRouteName="Home"
			>
				<Tab.Screen
					options={{
						tabBarIcon: () => (
							<TourGuideZone
								tourKey="tour1"
								isTourGuide
								zone={1}
								text={t("TourProductStatus")}
								borderRadius={4}
								style={s.borwser_footer_tourguide_style}
							>
								<BrowserFooterAction />
							</TourGuideZone>
						),
					}}
					name="Surface"
					component={MainScreen}
				/>

				<Tab.Screen
					options={{
						tabBarIcon: () => (
							<TourGuideZone
								tourKey="tour1"
								zone={0}
								text={t("TourHomeScreen")}
								borderRadius={16}
								style={s.borwser_footer_tourguide_style}
							>
								<TouchableOpacity
									onPress={() => {
										setActiveUrl("");
										dispatch(resetAllProducts());
									}}
								>
									<Image
										style={[
											s.browser_footer__tab__icon,
											{
												tintColor:
													backgroundColor == Theme.primaryBackgroundColor ? Theme.colorBlackish : Theme.antiFlashWhite,
											},
										]}
										source={Images.home}
									/>
								</TouchableOpacity>
							</TourGuideZone>
						),
					}}
					name="Home"
					component={MainScreen}
				/>

				<Tab.Screen
					options={{
						tabBarIcon: () => (
							<TouchableOpacity
								disabled={!activeUrl}
								onPress={() => {
									const shareUrl = getWebProductUrl(activeUrl);
									if (shareUrl) {
										onShare(shareUrl);
									}
								}}
							>
								<Image
									style={[
										s.browser_footer__tab__icon,
										{
											tintColor:
												backgroundColor == Theme.primaryBackgroundColor ? Theme.colorBlackish : Theme.antiFlashWhite,
										},
									]}
									source={Images.share}
								/>
							</TouchableOpacity>
						),
					}}
					name="Share"
					component={MainScreen}
				/>

				<Tab.Screen
					options={{
						tabBarIcon: () => (
							<Menu
								hasDecision={allProductsState?.product?.conclusion}
								onSharePress={(value: string) => {
									onShare(value);
								}}
								onLanguagePress={() => setIsLanguageModalVisible(true)}
							/>
						),
					}}
					name="Menu"
					component={MainScreen}
				/>
			</Tab.Navigator>

			<LanguageModal modalVisible={isLanguageModalVisible} onClose={() => setIsLanguageModalVisible(false)} />
		</View>
	);
};

export const BrowserFooter = () => {
	return <BrowserFooterContent />;
};
