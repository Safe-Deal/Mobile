import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Theme, { height, width } from "../../../Theme/Theme";

const DEFAULT = {
	height: height(7),
	width: width(14),
	borderRadius: height(5),
	style: {},
};

export const SkeletonLoader = ({
	height = DEFAULT.height,
	width = DEFAULT.width,
	borderRadius = DEFAULT.borderRadius,
	style = DEFAULT.style,
}) => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.timing(animatedValue, {
				toValue: 1,
				duration: 1500,
				useNativeDriver: true,
			}),
		);

		animation.start();
		return () => animation.stop();
	}, []);

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [-width, width],
	});

	return (
		<View style={[styles.skeleton, { height, width, borderRadius }, style]}>
			<Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
				<LinearGradient
					colors={[Theme.lightGrey, Theme.darkGrey, Theme.lightGrey]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={StyleSheet.absoluteFill}
				/>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	skeleton: {
		backgroundColor: Theme.lightGrey,
		overflow: "hidden",
	},
});
