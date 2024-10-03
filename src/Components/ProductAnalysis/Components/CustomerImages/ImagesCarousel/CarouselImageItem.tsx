import React from "react";
import type { ImageSourcePropType, ImageURISource, StyleProp, ViewStyle } from "react-native";
import { ActivityIndicator, View } from "react-native";
import { Image } from "expo-image";
import s from "./CarouselImageItem.styles";

interface Props {
	style?: StyleProp<ViewStyle>;
	index?: number;
	img?: ImageSourcePropType;
}

export const CarouselImageItem: React.FC<Props> = ({ style, index: _index, img }) => {
	const index = _index ?? 0;
	const source = React.useRef<ImageURISource>({
		uri: `https://picsum.photos/id/${index}/400/300`,
	}).current;

	return (
		<View style={[s.container, style]}>
			<ActivityIndicator size="small" />
			<Image cachePolicy={"memory-disk"} key={index} style={s.image} source={img ?? source} contentFit="contain" />
		</View>
	);
};
