import { t } from "i18next";
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

	const itemData = useMemo(() => {
		const analyzeTabs = [
			{
				text: t("analyze:product-insights"),
				icon: "shopping-search",
				type: TabTypes.ANALYZE__PRODUCT_INSIGHTS,
				tourKeyText: t("tourKeys:InsightsTab"),
			},
		];
		if (summaryReviewSupportedSites.some((supportedUrl) => activeUrl.includes(supportedUrl))) {
			analyzeTabs.push({
				text: t("analyze:ai-insights"),
				icon: "creation",
				type: TabTypes.ANALYZE__AI_INSIGHTS,
				tourKeyText: t("tourKeys:ReviewsTab"),
			});
			analyzeTabs.push({
				text: t("analyze:images"),
				icon: "image",
				type: TabTypes.ANALYZE__IMAGES,
				tourKeyText: t("tourKeys:ImagesTab"),
			});
		}
		analyzeTabs.push({
			text: t("analyze:videos"),
			icon: "video",
			type: TabTypes.ANALYZE__VIDEOS,
			tourKeyText: t("tourKeys:VideosTab"),
		});
		return analyzeTabs;
	}, [activeUrl]);

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
		if (showTooltip) {
			if (tourKey == "tour2" && canStart) {
				setTimeout(() => {
					start(0);
				}, 100);
			}
		}
	}, [tourKey, canStart, showTooltip]);

	const handleOnStepChange = (event) => {
		if (event && event.order >= 0 && event.order < itemData.length) {
			setSelectedTab(itemData[event.order].type);
			flatListRef.current?.scrollToIndex({ index: itemData[event.order].type, animated: true });
		}
	};

	useEffect(() => {
		if (eventEmitter) {
			eventEmitter.on("stop", () => setShowShareWalkthroughModal(true));
			eventEmitter.on("stepChange", (event) => handleOnStepChange(event));

			return () => {
				eventEmitter.off("stop", () => null);
				eventEmitter.off("stepChange", handleOnStepChange);
			};
		}
	}, [eventEmitter]);

	const handleOnClose = () => {
		setShowShareWalkthroughModal(false);

		Alert.alert(t("tourKeys:FinishTitle"), t("tourKeys:FinishDescription"), [
			{
				text: "OK",
				onPress: () => {
					setActiveUrl("");
					dispatch(resetAllProducts());
					toggleShowTooltip(false);
					toggleOnboard(true);
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
