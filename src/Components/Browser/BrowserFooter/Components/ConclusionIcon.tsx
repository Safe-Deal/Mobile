import React from "react";
import { ConclusionTypes } from "../../../../Shared/Constants";
import SafeDealLogoSvg from "../../../Common/Images/SafeDealLogoSvg";
import ShieldSvg from "../../../Common/Images/ShieldSvg";
import ShieldSvgError from "../../../Common/Images/ShieldSvgError";
import ShieldSvgNoData from "../../../Common/Images/ShieldSvgNoData";
import ShieldSvgWarning from "../../../Common/Images/ShieldSvgWarning";

interface ConclusionProps {
	conclusion: ConclusionTypes;
	BOTTOM_ICONS_SIZE: number;
}

const iconMap: { [key in ConclusionTypes]: React.FC<{ width: number; height: number }> } = {
	[ConclusionTypes.INSUFFICIENT_DATA]: ShieldSvgNoData,
	[ConclusionTypes.RECOMMENDED]: ShieldSvg,
	[ConclusionTypes.NOT_RECOMMENDED]: ShieldSvgError,
	[ConclusionTypes.DOUBTFUL]: ShieldSvgWarning,
};

export const ConclusionIcon: React.FC<ConclusionProps> = ({ conclusion, BOTTOM_ICONS_SIZE }) => {
	const IconComponent = iconMap[conclusion] || SafeDealLogoSvg;
	return <IconComponent width={BOTTOM_ICONS_SIZE} height={BOTTOM_ICONS_SIZE} />;
};
