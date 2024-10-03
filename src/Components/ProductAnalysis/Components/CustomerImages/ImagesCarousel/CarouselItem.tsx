import React from "react";
import type { ImageSourcePropType, StyleProp, ViewProps, ViewStyle } from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import type { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import Constants from "expo-constants";

import { CarouselImageItem } from "./CarouselImageItem";
import { CarouselTextItem } from "./CarouselTextItem";

interface Props extends AnimateProps<ViewProps> {
	style?: StyleProp<ViewStyle>;
	index?: number;
	pretty?: boolean;
	showIndex?: boolean;
	img?: ImageSourcePropType;
}

export const CarouselItem: React.FC<Props> = (props: Props) => {
	const { style, showIndex = true, index, pretty, img, testID, ...animatedViewProps } = props;
	const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;
	const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);
	return (
		<LongPressGestureHandler
			onActivated={() => {
				setIsPretty(!isPretty);
			}}
		>
			<Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
				{isPretty || img ? (
					<CarouselImageItem style={style} index={index} img={img} />
				) : (
					<CarouselTextItem style={style} index={index} />
				)}
			</Animated.View>
		</LongPressGestureHandler>
	);
};
