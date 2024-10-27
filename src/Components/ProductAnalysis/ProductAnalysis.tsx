import React, { ReactElement, useRef } from "react";
import { View, FlatList } from "react-native";
import { PanGestureHandler, ScrollView as GHScrollView } from "react-native-gesture-handler";
import Animated, {
	useAnimatedGestureHandler,
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	runOnJS,
} from "react-native-reanimated";
import { Chip, Text } from "react-native-paper";
import { ReviewsInsights } from "./Components/Reviews/ReviewsInsights";
import s from "./ProductAnalysis.styles";
import { ReviewsImages } from "./Components/CustomerImages/ReviewsImages";
import { ProductRulesListAndPrice } from "./Components/RulesAndPrice/ProductRulesListAndPrice";
import { TabTypes } from "../../Shared/Constants";
import ReviewsVideos from "./Components/Video/ReviewsVideos";
import Theme from "../../Theme/Theme";
import { useTranslation } from "@hooks/useTranslation";
import { SWIPE_THRESHOLD } from "../../Utils/Const";

interface SDAnalyzerProps {
	selectedTab: TabTypes;
	setSelectedTab: (tab: TabTypes) => void;
}

const tabOrder = [
	TabTypes.ANALYZE__PRODUCT_INSIGHTS,
	TabTypes.ANALYZE__AI_INSIGHTS,
	TabTypes.ANALYZE__IMAGES,
	TabTypes.ANALYZE__VIDEOS,
];

export const ProductInsights = ({ selectedTab, setSelectedTab }: SDAnalyzerProps): ReactElement => {
	const translateX = useSharedValue(0);
	const scrollViewRef = useRef<GHScrollView>(null);
	const flatListRef = useRef<FlatList>(null);
	const { t } = useTranslation();

	const handleSwipe = (direction: "left" | "right") => {
		const currentIndex = tabOrder.indexOf(selectedTab);
		let newIndex;

		if (direction === "left") {
			newIndex = currentIndex < tabOrder.length - 1 ? currentIndex + 1 : currentIndex;
		} else {
			newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
		}

		setSelectedTab(tabOrder[newIndex]);
		flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
	};

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, context: any) => {
			context.startX = translateX.value;
		},
		onActive: (event, context) => {
			translateX.value = context.startX + event.translationX;
		},
		onEnd: (event) => {
			if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
				if (event.translationX > 0) {
					runOnJS(handleSwipe)("right");
				} else {
					runOnJS(handleSwipe)("left");
				}
			}
			translateX.value = withSpring(0);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	const itemData = [
		{ text: t("analyze:product-insights"), type: TabTypes.ANALYZE__PRODUCT_INSIGHTS },
		{ text: t("analyze:ai-insights"), type: TabTypes.ANALYZE__AI_INSIGHTS },
		{ text: t("analyze:images"), type: TabTypes.ANALYZE__IMAGES },
		{ text: t("analyze:videos"), type: TabTypes.ANALYZE__VIDEOS },
	];

	return (
		<View style={s.product_analysis__container}>
			<View style={s.content_container}>
				<PanGestureHandler onGestureEvent={gestureHandler} simultaneousHandlers={scrollViewRef}>
					<Animated.View style={[{ flex: 1 }, animatedStyle]}>
						<GHScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
							{selectedTab === TabTypes.ANALYZE__PRODUCT_INSIGHTS && <ProductRulesListAndPrice />}
							{selectedTab === TabTypes.ANALYZE__AI_INSIGHTS && <ReviewsInsights />}
							{selectedTab === TabTypes.ANALYZE__IMAGES && <ReviewsImages />}
							{selectedTab === TabTypes.ANALYZE__VIDEOS && <ReviewsVideos />}
						</GHScrollView>
					</Animated.View>
				</PanGestureHandler>
			</View>
			<View style={s.tabs_container}>
				<FlatList
					ref={flatListRef}
					style={s.conclusion__top_tabs__menu}
					data={itemData}
					renderItem={({ item, index }) => (
						<Chip
							key={index}
							style={[
								s.conclusion__top_tabs__menu__selected,
								{
									backgroundColor: selectedTab === item.type ? Theme.mintCream : Theme.primaryBackgroundColor,
									borderBottomWidth: selectedTab === item.type ? 1 : 0,
									borderBottomColor: selectedTab === item.type ? Theme.darkGreen : Theme.primaryBackgroundColor,
								},
							]}
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
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};
