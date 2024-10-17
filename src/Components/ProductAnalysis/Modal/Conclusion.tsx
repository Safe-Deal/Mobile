import { View, Text } from "react-native";
import { ConclusionTypes } from "../../../Shared/Constants";
import ShieldSvg from "../../Common/Images/ShieldSvg";
import ShieldSvgError from "../../Common/Images/ShieldSvgError";
import ShieldSvgNoData from "../../Common/Images/ShieldSvgNoData";
import ShieldSvgWarning from "../../Common/Images/ShieldSvgWarning";
import s from "../ConclusionModal.styles";
import { useTranslation } from "@hooks/useTranslation";

interface IConclusion {
	conclusion: ConclusionTypes;
	SHIELD_SIZE: number;
	style?: object;
}

export const Conclusion = ({ conclusion, SHIELD_SIZE, style }: IConclusion): JSX.Element => {
	const { t } = useTranslation();

	if (!conclusion) {
		return <></>;
	}
	return (
		<View style={style}>
			{conclusion === ConclusionTypes.DOUBTFUL ? (
				<ShieldSvgWarning width={SHIELD_SIZE} height={SHIELD_SIZE} />
			) : conclusion === ConclusionTypes.RECOMMENDED ? (
				<ShieldSvg width={SHIELD_SIZE} height={SHIELD_SIZE} />
			) : conclusion === ConclusionTypes.NOT_RECOMMENDED ? (
				<ShieldSvgError width={SHIELD_SIZE} height={SHIELD_SIZE} />
			) : conclusion === ConclusionTypes.INSUFFICIENT_DATA ? (
				<ShieldSvgNoData width={SHIELD_SIZE} height={SHIELD_SIZE} />
			) : (
				<ShieldSvg width={SHIELD_SIZE} height={SHIELD_SIZE} />
			)}
			<Text style={s.conclusion__title__text}>{t("TourProductStatus")}</Text>
		</View>
	);
};
