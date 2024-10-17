import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useTranslation } from "@hooks/useTranslation";
import IconButton from "../../Common/Icons/IconButton";
import s from "../Menu.styles";
import { getUrlFromAffiliateUrl, isAffiliateRedirect } from "../../../Services/Affiliates/AffiliateManager";
import { height, width, widthByOs } from "../../../Theme/Theme";
import { logError } from "../../../Utils/Analytics";

interface URLInputProps {
	value?: string;
	onReload?: () => void;
	onChangeText?: (text: string) => void;
	onSubmitEditing?: () => void;
}
const DEFAULT_DISPLAY = "...";

const urlForDisplay = (url: string | undefined): string | undefined => {
	if (!url) {
		return undefined;
	}

	if (!url.startsWith("http://") && !url.startsWith("https://")) {
		return url;
	}

	try {
		const urlObj = new URL(url);
		if (isAffiliateRedirect(url)) {
			const path = getUrlFromAffiliateUrl(url);
			if (!path) {
				return DEFAULT_DISPLAY;
			}
			const urlObjAffiliate = new URL(path);
			const pathHostname = urlObjAffiliate.hostname.replace("www.", "");
			if (pathHostname) {
				return pathHostname;
			}
			return DEFAULT_DISPLAY;
		}
		return urlObj.hostname.replace("www.", "");
	} catch (error) {
		logError("SearchBarUrl:: urlForDisplay", error);
		return DEFAULT_DISPLAY;
	}
};

export const SearchBar = ({ value, onReload, onChangeText, onSubmitEditing }: URLInputProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [searchBoxText, setSearchBoxText] = useState(value);
	const { t } = useTranslation();
	const displayValue = isEditing ? searchBoxText : urlForDisplay(searchBoxText);

	useEffect(() => {
		setSearchBoxText(value);
	}, [value]);

	const handleReload = () => {
		if (onReload) {
			onReload();
			setIsEditing(false);
			Keyboard.dismiss();
		}
	};

	const handleSearch = () => {
		setIsEditing(false);
		if (onSubmitEditing) {
			onSubmitEditing();
		}
		Keyboard.dismiss();
	};

	const handleClear = () => {
		setSearchBoxText("");
		onChangeText?.("");
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
				setIsEditing(false);
			}}
		>
			<View style={s.top_toolbar_url__container}>
				<TextInput
					style={[
						s.top_toolbar_url__input,
						isEditing
							? { paddingRight: widthByOs({ ios: 9, android: 10 }), textAlign: "left" }
							: { paddingRight: width(3), textAlign: "center" },
					]}
					placeholder={t("Search or enter website")}
					value={displayValue}
					onChangeText={(text) => {
						onChangeText?.(text);
						setSearchBoxText(text);
					}}
					numberOfLines={1}
					multiline={false}
					onSubmitEditing={handleSearch}
					onFocus={() => setIsEditing(true)}
					onBlur={() => setIsEditing(false)}
				/>
				{isEditing ? (
					<View style={s.top_toolbar_url__action_btn}>
						<IconButton name={"close"} IOSsize={height(2.4)} AndroidSize={height(3.5)} onPress={handleClear} />
					</View>
				) : value ? (
					<View style={s.top_toolbar_url__action_btn}>
						<IconButton name={"refresh"} IOSsize={height(2.4)} AndroidSize={height(3.5)} onPress={handleReload} />
					</View>
				) : null}
			</View>
		</TouchableWithoutFeedback>
	);
};
