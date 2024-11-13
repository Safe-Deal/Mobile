import { useOnboardStore } from "@services/States/OnBoard/StateOnBoard";
import { useAppStore } from "@services/States/Webview/StateWebview";
import { DEFAULT_LINKS } from "@shared/Constants";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import Theme from "../../Theme/Theme";
import styles from "./Welcome.styles";

const Welcome = (): ReactElement => {
	const { t } = useTranslation();
	const { setActiveUrl } = useAppStore();

	const { toggleOnboard, toggleShowTooltip } = useOnboardStore();

	const handleSkip = () => {
		toggleOnboard(true);
		toggleShowTooltip(false);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.container__welcome__text}>{t("Welcome to Wise Decisions in Seconds")}</Text>

			<Text style={styles.container__description}>
				{t(
					"SafeDeal App adds an additional sharing option, allowing you to analyze reviews within other apps and on websites",
				)}
			</Text>

			<TouchableOpacity
				onPress={() => {
					setActiveUrl(DEFAULT_LINKS.Amazon);
					toggleOnboard(true);
					toggleShowTooltip(true);
				}}
				style={[styles.container__show, { backgroundColor: Theme.goGreen }]}
			>
				<Text style={[styles.container__button__text, { color: Theme.primaryBackgroundColor }]}>
					{t("Show me how it works")}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={handleSkip} style={[styles.container__skip, { backgroundColor: "#F0F0F0" }]}>
				<Text style={[styles.container__button__text, { color: Theme.colorBlackish }]}>{t("Skip Tutorial")}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Welcome;
