import * as React from "react";
import { useTranslation } from "@hooks/useTranslation";
import { View, Text } from "react-native";
import Animated, { interpolate, SharedValue, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { CarouselItem } from "./CarouselItem";
import Theme, { height, width } from "../../../../../Theme/Theme";
import s from "./ImageCarousel.styles";

interface ImageCarouselProps {
	images?: string[];
}

const CAROUSEL_OPTIONS = {
	vertical: false,
	width: width(100),
	height: width(100) * 0.6,
} as const;

const PaginationItem: React.FC<{
	index: number;
	backgroundColor: string;
	length: number;
	animValue: SharedValue<number>;
	isRotate?: boolean;
}> = (props) => {
	const { animValue, index, length, backgroundColor, isRotate } = props;
	const dotWidth = width(2);

	const animStyle = useAnimatedStyle(() => {
		let inputRange = [index - 1, index, index + 1];
		let outputRange = [-dotWidth, 0, dotWidth];

		if (index === 0 && animValue?.value > length - 1) {
			inputRange = [length - 1, length, length + 1];
			outputRange = [-dotWidth, 0, dotWidth];
		}

		return {
			transform: [
				{
					translateX: interpolate(animValue?.value, inputRange, outputRange, "clamp"),
				},
			],
		};
	}, [animValue, index, length]);

	return (
		<View
			style={[
				s.images_carousel__dot__container,
				{
					transform: [
						{
							rotateZ: isRotate ? "90deg" : "0deg",
						},
					],
				},
			]}
		>
			<Animated.View style={[s.images_carousel__dot, { backgroundColor }, animStyle]} />
		</View>
	);
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images = [] }: ImageCarouselProps) => {
	const [pagingEnabled] = React.useState<boolean>(true);
	const [snapEnabled] = React.useState<boolean>(true);
	const progressValue = useSharedValue<number>(0);
	const { t } = useTranslation(["analyze"]);

	return (
		<View style={s.images_carousel__container}>
			<Text style={s.images_carousel__title}>{t("Photos from Customers")}</Text>
			{!!progressValue && (
				<View style={s.images_carousel__pagination}>
					{images.map((_, index) => {
						return (
							<PaginationItem
								backgroundColor={Theme.colorBlackish}
								animValue={progressValue}
								index={index}
								key={index}
								length={images.length}
							/>
						);
					})}
				</View>
			)}
			<View style={s.images_carousel__slider__container}>
				<Carousel
					{...CAROUSEL_OPTIONS}
					loop={false}
					pagingEnabled={pagingEnabled}
					snapEnabled={snapEnabled}
					onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
					height={height(60)}
					modeConfig={{
						parallaxScrollingScale: 0.9,
						parallaxScrollingOffset: 50,
						parallaxAdjacentItemScale: 0.5,
					}}
					data={images}
					renderItem={({ index, item }) => <CarouselItem index={index} img={{ uri: item }} />}
				/>
			</View>
		</View>
	);
};

export default ImageCarousel;
