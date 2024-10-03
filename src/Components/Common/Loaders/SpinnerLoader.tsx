import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import Theme, { height, width } from "../../../Theme/Theme";
import { View } from "react-native";

const CHANGE_INTERVAL_MS = 450;

const colors = [
	Theme.primary,
	Theme.warningColor,
	Theme.positiveColor,
	Theme.negativeColor,
	Theme.doneGreenHover,
	Theme.stuckRed,
];

const styleDefault = {
	height: height(7),
	width: width(14),
	justifyContent: "center",
	alignItems: "center",
	selfAlign: "center",
	flex: 1,
};

export const SpinnerLoader = ({
	style = styleDefault,
	size = "large",
}: {
	style?: object;
	size?: "small" | "large" | number;
}) => {
	const [colorIndex, setColorIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setColorIndex((currentIndex) => (currentIndex + 1) % colors.length);
		}, CHANGE_INTERVAL_MS);

		return () => clearInterval(interval);
	}, []);

	return (
		<View style={style}>
			<ActivityIndicator size={size} color={colors[colorIndex]} />
		</View>
	);
};
