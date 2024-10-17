import React, { useMemo, useRef } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { Chip } from "react-native-paper";
import { useSelector } from "react-redux";
import { ConclusionTypes, TabTypes } from "../../Shared/Constants";
import Theme, { height, width } from "../../Theme/Theme";
import s from "./ConclusionModal.styles";
import { Conclusion } from "./Modal/Conclusion";
import DraggableModal from "./Modal/DraggableModal";
import { ProductInsights } from "./ProductAnalysis";
import { useTranslation } from "@hooks/useTranslation";

interface ConclusionModalProps {
	isModalVisible: boolean;
	search: string;
	url: string;
	selectedTab: TabTypes;
	onClose: () => void;
	onShare: (url: string) => void;
	setSelectedTab: (type: TabTypes) => void;
}

const SHIELD_SIZE = height(4.1);
export const ConclusionModal = ({
	isModalVisible,
	url,
	selectedTab,
	setSelectedTab,
	onClose,
}: ConclusionModalProps) => {
	const { allProductsState } = useSelector((state: any) => state.Products);
	const summaryReviewSupportedSites: string[] = ["aliexpress", "amazon", "ebay"];
	const { t } = useTranslation();

	const itemData = useMemo(() => {
		const analyzeTabs = [
			{
				text: t("analyze:product-insights"),
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				icon: require("../../../assets/box-search.png"),
				type: TabTypes.ANALYZE__PRODUCT_INSIGHTS,
			},
		];
		if (summaryReviewSupportedSites.some((supportedUrl) => url.includes(supportedUrl))) {
			analyzeTabs.push({
				text: t("analyze:ai-insights"),
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				icon: require("../../../assets/bubble.png"),
				type: TabTypes.ANALYZE__AI_INSIGHTS,
			});
			analyzeTabs.push({
				text: t("analyze:images"),
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				icon: require("../../../assets/gallery.png"),
				type: TabTypes.ANALYZE__IMAGES,
			});
		}
		analyzeTabs.push({
			text: t("analyze:videos"),
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			icon: require("../../../assets/video.png"),
			type: TabTypes.ANALYZE__VIDEOS,
		});
		return analyzeTabs;
	}, [url]);

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

	const flatListRef = useRef<FlatList>(null);

	return (
		<DraggableModal
			selectedTab={selectedTab}
			isModalVisible={isModalVisible}
			style={s.conclusion__modal}
			onClose={() => onClose()}
		>
			<ScrollView style={s.conclusion__container}>
				<View style={[s.conclusion__header, { borderColor: borderClr, backgroundColor: borderClr }]}>
					<Conclusion
						style={s.conclusion__title}
						conclusion={allProductsState?.product?.conclusion}
						SHIELD_SIZE={SHIELD_SIZE}
					/>
				</View>

				<View style={s.sheet_list_view}>
					<ProductInsights selectedTab={selectedTab} />
				</View>
				<FlatList
					ref={flatListRef}
					style={s.conclusion__top_tabs__menu}
					data={itemData}
					ItemSeparatorComponent={() => <View style={s.conclusion__item_separator} />}
					renderItem={({ item, index }) => {
						return (
							<View style={s.conclusion_chip_container}>
								<Chip
									key={index}
									icon={() => (
										<Image
											source={item?.icon}
											style={{
												height: width(5),
												width: width(5),
												tintColor: selectedTab !== item.type ? Theme.auroMetalSaurus : Theme.darkGreen,
											}}
										/>
									)}
									style={[
										s.conclusion__top_tabs__menu__selected,
										{
											backgroundColor: selectedTab === item.type ? Theme.mintCream : Theme.primaryBackgroundColor,
											borderBottomWidth: selectedTab === item.type ? 1 : 0,
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
								{index < itemData.length - 1 && <Text style={s.conclusion_seperator_text}>|</Text>}
							</View>
						);
					}}
					horizontal
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					bounces={true}
				/>
			</ScrollView>
		</DraggableModal>
	);
};

export default ConclusionModal;
