import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Text, View } from "react-native";
import s from "./CarouselTextItem.styles";

interface Props {
	style?: StyleProp<ViewStyle>;
	index?: number;
}

export const CarouselTextItem: React.FC<Props> = ({ style, index }) => {
	return (
		<View style={[s.container, style]}>
			{typeof index === "number" && <Text style={{ fontSize: 30, color: "black" }}>{index}</Text>}
		</View>
	);
};
