import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../../Context/AppContext";
import { useOnboardContext } from "../../Context/onBoardContext";
import styles from "./Welcome.styles";

const Welcome = (): ReactElement => {
	const { t } = useTranslation("welcome");
	const { setActiveUrl } = useAppContext();

	const { toggleOnboard, toggleShowTooltip } = useOnboardContext();

	const handleSkip = () => {
		toggleOnboard(true);
		toggleShowTooltip(false);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.container__welcome__text}>{t("Welcome to Wise Decisions in Seconds")}</Text>

			<Text style={styles.container__description}>
				{t(
					"Safe Deal: Streamline your decisions with AI insights that validate every purchase and seller, saving you time and boosting profitability for personal or business buys.",
				)}
			</Text>

			<TouchableOpacity
				onPress={() => {
					setActiveUrl("https://www.aliexpress.com/item/1005006595351136.html?gatewayAdapt=4itemAdapt");
					toggleOnboard(true);
					toggleShowTooltip(true);
				}}
				style={styles.container__show}
			>
				<Text style={styles.container__button__text}>{t("Show me how it works")}</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={handleSkip} style={styles.container__skip}>
				<Text style={styles.container__button__text}>{t("Skip Tutorial")}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Welcome;
