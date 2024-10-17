import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, FlatList, ScrollView, Text, View } from "react-native";
import { Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { TourGuideZone, useTourGuideController } from "rn-tourguide";
import { IAppContext, useAppContext } from "../../Context/AppContext";
import { useOnboardContext } from "../../Context/onBoardContext";
import { resetAllProducts } from "../../Redux/JoinSafeDeal/JoinSafeDeal";
import { ConclusionTypes, TabTypes } from "../../Shared/Constants";
import Theme, { height } from "../../Theme/Theme";
import s from "./ConclusionModal.styles";
import { Conclusion } from "./Modal/Conclusion";
import ShareWalkthrough from "./Modal/ShareWalkthrough";
import { ProductInsights } from "./ProductAnalysis";
import { useTranslation } from "@hooks/useTranslation";

export const ConclusionView = (props) => {
	const { allProductsState } = useSelector((state: any) => state.Products);
	const summaryReviewSupportedSites: string[] = ["aliexpress", "amazon", "ebay"];
	const [selectedTab, setSelectedTab] = useState<TabTypes>(TabTypes.ANALYZE__PRODUCT_INSIGHTS);
	const { start, canStart, tourKey, eventEmitter } = useTourGuideController("tour2");
	const [showShareWalkthroughModal, setShowShareWalkthroughModal] = useState(false);
	const { activeUrl, setActiveUrl }: IAppContext = useAppContext();
	const { showTooltip, toggleShowTooltip, toggleOnboard } = useOnboardContext();
	const flatListRef = useRef<FlatList>(null);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const itemData = useMemo(() => {
		const analyzeTabs = [
			{
				text: t("analyze:product-insights"),
				icon: "shopping-search",
				type: TabTypes.ANALYZE__PRODUCT_INSIGHTS,
				tourKeyText: t("TourInsightsTab"),
			},
		];
		if (summaryReviewSupportedSites.some((supportedUrl) => activeUrl.includes(supportedUrl))) {
			analyzeTabs.push({
				text: t("analyze:ai-insights"),
				icon: "creation",
				type: TabTypes.ANALYZE__AI_INSIGHTS,
				tourKeyText: t("TourReviewsTab"),
			});
			analyzeTabs.push({
				text: t("analyze:images"),
				icon: "image",
				type: TabTypes.ANALYZE__IMAGES,
				tourKeyText: t("TourImagesTab"),
			});
		}
		analyzeTabs.push({
			text: t("analyze:videos"),
			icon: "video",
			type: TabTypes.ANALYZE__VIDEOS,
			tourKeyText: t("TourVideosTab"),
		});
		return analyzeTabs;
	}, []);

	const borderClr: string =
		allProductsState?.product?.conclusion === ConclusionTypes.INSUFFICIENT_DATA
			? Theme.americanGray
			: allProductsState?.product?.conclusion === ConclusionTypes.RECOMMENDED
				? Theme.primary
				: allProductsState?.product?.conclusion === ConclusionTypes.NOT_RECOMMENDED
					? Theme.stuckRed
					: allProductsState?.product?.conclusion === ConclusionTypes.DOUBTFUL
						? Theme.warningColor
						: Theme.primary;

	useEffect(() => {
		if (itemData && itemData.length > 0) {
			if (showTooltip && tourKey == "tour2" && canStart) {
				start(0);
			}
		}
	}, [tourKey, canStart, showTooltip, itemData]);

	const handleOnStepChange = (event) => {
		if (event && event.order != 0) {
			if (event && event.order > 0 && event.order < itemData.length) {
				setSelectedTab(itemData[event.order].type);
				flatListRef.current?.scrollToIndex({ index: itemData[event.order].type, animated: true });
			}
		}
	};

	useEffect(() => {
		if (itemData && itemData.length > 0 && eventEmitter) {
			eventEmitter.on("stop", () => setShowShareWalkthroughModal(true));
			eventEmitter.on("stepChange", (event) => handleOnStepChange(event));

			return () => {
				eventEmitter.off("stop", () => null);
				eventEmitter.off("stepChange", handleOnStepChange);
			};
		}
	}, [eventEmitter, itemData]);

	const handleOnClose = () => {
		setShowShareWalkthroughModal(false);

		Alert.alert(t("TourFinishTitle"), t("TourFinishDescription"), [
			{
				text: t("OK"),
				onPress: () => {
					toggleShowTooltip(false);
					toggleOnboard(true);
					setActiveUrl("");
					dispatch(resetAllProducts());
					props.navigation.goBack();
				},
			},
		]);
	};

	return (
		<View style={s.conclusion__view}>
			<View style={[s.conclusion__header, { borderColor: borderClr, backgroundColor: borderClr }]}>
				<Conclusion
					style={s.conclusion__title}
					conclusion={allProductsState?.product?.conclusion}
					SHIELD_SIZE={height(4.1)}
				/>
			</View>

			<ScrollView style={s.conclusion__top_tabs__container} scrollEnabled={true}>
				<FlatList
					style={s.conclusion__top_tabs__menu}
					data={itemData}
					ref={flatListRef}
					ItemSeparatorComponent={() => <View style={s.conclusion__item_separator} />}
					renderItem={({ item, index }) => (
						<TourGuideZone tourKey="tour2" zone={index} text={item.tourKeyText} borderRadius={16}>
							<View style={s.conclusion_chip_container}>
								<Chip
									key={index}
									style={[
										s.conclusion__top_tabs__menu__selected,
										{
											backgroundColor: selectedTab === item.type ? Theme.mintCream : Theme.primaryBackgroundColor,
											borderBottomWidth: showTooltip ? 0 : selectedTab === item.type ? 1 : 0,
											borderBottomColor: selectedTab === item.type ? Theme.darkGreen : Theme.primaryBackgroundColor,
										},
									]}
									rippleColor={"transparent"}
									onPress={() => {
										setSelectedTab(item.type);
										flatListRef.current?.scrollToIndex({ index, animated: true });
									}}
								>
									<Text
										style={[
											s.conclusion__top_tabs__menu__item__text,
											{ color: selectedTab === item.type ? Theme.darkGreen : Theme.auroMetalSaurus },
										]}
									>
										{item.text}
									</Text>
								</Chip>
							</View>
						</TourGuideZone>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					bounces={true}
				/>
				<ProductInsights selectedTab={selectedTab} />
			</ScrollView>
			<ShareWalkthrough visible={showShareWalkthroughModal} onClose={() => handleOnClose()} />
		</View>
	);
};

export default ConclusionView;
