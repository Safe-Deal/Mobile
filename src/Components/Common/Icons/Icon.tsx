import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Platform } from "react-native";
import Theme, { height } from "../../../Theme/Theme";
import { IOS } from "../../../Utils/Const";
import { getIconName } from "./IconsMapping";

export const Icon = ({
	name,
	size = height(3.5),
	IOSsize = size,
	AndroidSize = size,
	color = Theme.iconColor,
	disabled = false,
	style = {},
}: {
	name: string;
	size?: number;
	IOSsize?: number;
	AndroidSize?: number;
	color?: string;
	disabled?: boolean;
	style?: unknown;
}) => {
	const iconName = getIconName(name);
	const iconSize = Platform.OS === IOS ? IOSsize : AndroidSize;

	return (
		<>
			{Platform.OS === IOS ? (
				// @ts-expect-error - TS doesn't know about the iconMap
				<Feather name={iconName} size={iconSize} style={style} color={color} disabled={disabled} />
			) : (
				// @ts-expect-error - TS doesn't know about the iconMap
				<MaterialIcons name={iconName} size={iconSize} style={style} color={color} disabled={disabled} />
			)}
		</>
	);
};
