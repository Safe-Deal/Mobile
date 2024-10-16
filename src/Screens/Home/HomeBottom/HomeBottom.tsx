import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { nativeApplicationVersion } from "expo-application";
import SafeDealLogoSvg from "../../../Components/Common/Images/SafeDealLogoSvg";
import s from "./HomeBottom.styles";

export const LogoAndVersion: React.FC<{ style?: StyleProp<ViewStyle> }> = () => {
	const version = nativeApplicationVersion;
	return (
		<View style={s.homeBottom__container}>
			<SafeDealLogoSvg style={s.homeBottom__logo} />
			<View style={s.homeBottom__text_container}>
				<Text style={s.homeBottom__safeDealText}>Safe Deal</Text>
				<Text style={s.homeBottom__versionText}>{`v${version}`}</Text>
			</View>
		</View>
	);
};
