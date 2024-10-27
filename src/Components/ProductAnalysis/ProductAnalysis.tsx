import React, { ReactElement, useRef } from "react";
import { ScrollView, View } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
	useAnimatedGestureHandler,
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	runOnJS,
} from "react-native-reanimated";
import { ReviewsInsights } from "./Components/Reviews/ReviewsInsights";
import s from "./ProductAnalysis.styles";
import { ReviewsImages } from "./Components/CustomerImages/ReviewsImages";
import { ProductRulesListAndPrice } from "./Components/RulesAndPrice/ProductRulesListAndPrice";
import { TabTypes } from "../../Shared/Constants";
import ReviewsVideos from "./Components/Video/ReviewsVideos";

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
	const scrollViewRef = useRef<ScrollView>(null);

	const handleSwipe = (direction: "left" | "right") => {
		const currentIndex = tabOrder.indexOf(selectedTab);
		let newIndex;

		if (direction === "left") {
			newIndex = currentIndex < tabOrder.length - 1 ? currentIndex + 1 : currentIndex;
		} else {
			newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
		}

		setSelectedTab(tabOrder[newIndex]);
		scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
	};

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, context: any) => {
			context.startX = translateX.value;
		},
		onActive: (event, context) => {
			translateX.value = context.startX + event.translationX;
		},
		onEnd: (event) => {
			if (Math.abs(event.translationX) > 50) {
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

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PanGestureHandler onGestureEvent={gestureHandler}>
				<Animated.View style={[s.product_analysis__container, animatedStyle]}>
					<ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
						{selectedTab === TabTypes.ANALYZE__PRODUCT_INSIGHTS && <ProductRulesListAndPrice />}
						{selectedTab === TabTypes.ANALYZE__AI_INSIGHTS && <ReviewsInsights />}
						{selectedTab === TabTypes.ANALYZE__IMAGES && <ReviewsImages />}
						{selectedTab === TabTypes.ANALYZE__VIDEOS && <ReviewsVideos />}
					</ScrollView>
				</Animated.View>
			</PanGestureHandler>
		</GestureHandlerRootView>
	);
};
