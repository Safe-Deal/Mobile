import { Text, View } from "react-native";
import { ReactElement } from "react";
import { useTranslation } from "@hooks/useTranslation";
import s from "./History.styles";

const History = (): ReactElement => {
	const { t } = useTranslation();

	return (
		<View style={s.container}>
			<Text style={s.contentTxt}>{t("History")}</Text>
		</View>
	);
};

export default History;
