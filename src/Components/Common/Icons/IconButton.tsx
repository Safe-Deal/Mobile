import React from "react";
import { TouchableOpacity } from "react-native";
import { height } from "../../../Theme/Theme";
import { Icon } from "./Icon";

export const IconButton = ({
	onPress,
	name,
	color,
	size = height(3.5),
	IOSsize = size,
	AndroidSize = size,
	disabled = false,
	style = {},
}: {
	onPress: () => void;
	name: string;
	size?: number;
	IOSsize?: number;
	AndroidSize?: number;
	color?: string;
	disabled?: boolean;
	style?: unknown;
}) => {
	return (
		<TouchableOpacity onPress={onPress} disabled={disabled}>
			<Icon name={name} size={size} IOSsize={IOSsize} AndroidSize={AndroidSize} color={color} style={style} />
		</TouchableOpacity>
	);
};

export default IconButton;
