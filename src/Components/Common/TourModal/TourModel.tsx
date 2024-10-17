import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TooltipProps } from "rn-tourguide";
import s from "./TourModal.styles";
import { useTranslation } from "@hooks/useTranslation";

export const TourModal = ({
	isFirstStep,
	isLastStep,
	handleNext,
	handlePrev,
	handleStop,
	currentStep,
	labels,
}: TooltipProps) => {
	const [title, description] = currentStep?.text.split("&").map((part) => part.trim()) || ["", ""];
	const { t } = useTranslation();

	return (
		<View style={s.tour_modal_container}>
			<View style={s.tooltip_container}>
				<Text testID="stepDescription" style={s.tooltip_title}>
					{title}
				</Text>
				<Text testID="stepDescription" style={s.tooltip_text}>
					{description}
				</Text>
			</View>
			<View style={s.bottom_bar}>
				{!isFirstStep && (
					<TouchableOpacity onPress={handlePrev} style={s.bottom_bar_button}>
						<Text style={s.bottom_bar_button_text}>{labels?.previous || t("TourPrevious")}</Text>
					</TouchableOpacity>
				)}
				{!isLastStep ? (
					<TouchableOpacity onPress={handleNext} style={s.bottom_bar_button}>
						<Text style={s.bottom_bar_button_text}>{labels?.next || t("TourNext")}</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={handleStop} style={s.bottom_bar_button}>
						<Text style={s.bottom_bar_button_text}>{labels?.finish || t("TourFinish")}</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

// export default TourModal;
