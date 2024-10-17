import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import ShareGuideStep1 from "../../Common/Images/ShareGuideStep1";
import ShareGuideStep2 from "../../Common/Images/ShareGuideStep2";
import ShareGuideStep3 from "../../Common/Images/ShareGuideStep3";
import ShareGuideStep4 from "../../Common/Images/ShareGuideStep4";
import styles from "./ShareWalkthrough.styles";
import { useTranslation } from "@hooks/useTranslation";
interface ShareWalkthroughModalProps {
	visible: boolean;
	onClose: () => void;
}
const ShareWalkthroughModal: React.FC<ShareWalkthroughModalProps> = ({ visible, onClose }) => {
	const { t } = useTranslation();

	const steps = [
		{
			component: <ShareGuideStep1 />,
			stepTitle: t("TourShareStep1Title"),
			description: t("TourShareStep1Description"),
			alignRight: true,
		},
		{
			component: <ShareGuideStep2 />,
			stepTitle: t("TourShareStep2Title"),
			description: t("TourShareStep2Description"),
			alignRight: false,
		},
		{
			component: <ShareGuideStep3 />,
			stepTitle: t("TourShareStep3Title"),
			description: t("TourShareStep3Description"),
			alignRight: true,
		},
		{
			component: <ShareGuideStep4 />,
			stepTitle: t("TourShareStep4Title"),
			description: t("TourShareStep4Description"),
			alignRight: false,
		},
	];

	return (
		<Modal isVisible={visible} style={styles.share_walkthrough_modal} onBackdropPress={onClose}>
			<View style={styles.share_walkthrough_modalContainer}>
				{steps.map((step, index) => (
					<View key={index} style={styles.share_walkthrough_stepContainer}>
						{!step.alignRight && (
							<View style={styles.share_walkthrough_textContainer}>
								<Text style={styles.share_walkthrough_stepText}>{step.stepTitle}</Text>
								<Text style={styles.share_walkthrough_descriptionText}>{step.description}</Text>
							</View>
						)}
						{step.component}
						{step.alignRight && (
							<View style={styles.share_walkthrough_textContainer}>
								<Text style={styles.share_walkthrough_stepText}>{step.stepTitle}</Text>
								<Text style={styles.share_walkthrough_descriptionText}>{step.description}</Text>
							</View>
						)}
					</View>
				))}
				<TouchableOpacity style={styles.share_walkthrough_button} onPress={onClose}>
					<Text style={styles.share_walkthrough_buttonText}>Got it</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default ShareWalkthroughModal;
