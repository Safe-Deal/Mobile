import { useTranslation } from "@hooks/useTranslation";
import { language } from "@shared/Constants";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { getAppLanguage, setAppLanguage } from "../../../i18n/i18n";
import CustomModal from "../CustomModal/CustomModal";
import s from "./LanguageModal.styles";

interface LanguageModalProps {
	modalVisible: boolean;
	onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ modalVisible, onClose }) => {
	const { t } = useTranslation();
	const [selectedLanguage, setSelectedLanguage] = useState("");

	useEffect(() => {
		const fetchCurrentLanguage = async () => {
			const lang = await getAppLanguage();
			setSelectedLanguage(lang || "en");
		};
		fetchCurrentLanguage();
	}, []);

	const handleLangChange = (lang: string): void => {
		setSelectedLanguage(lang);
		setAppLanguage(lang);
		onClose();
	};

	return (
		<CustomModal isModalVisible={modalVisible} onClose={onClose} style={s.language_modal_modal_container}>
			<View style={s.language_modal_inner_container}>
				<Text style={s.language_modal_title}>{t("AppLanguage")}</Text>
				<ScrollView>
					{language.map((item, index) => (
						<TouchableOpacity
							key={item.id}
							style={[
								s.language_modal_details,
								index % 2 === 0 ? s.language_modal_item_even : s.language_modal_item_odd,
								selectedLanguage === item.link && s.language_modal_item_selected,
							]}
							onPress={() => handleLangChange(item.link)}
						>
							<Text
								style={[s.language_modal_item_text, selectedLanguage === item.link && s.language_modal_selected_text]}
							>
								{t(item.title)}
							</Text>
							<Text style={s.language_modal_sub_text}>{item.nativeName}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
				<TouchableOpacity style={s.language_modal_close_button} onPress={onClose}>
					<Text style={s.language_modal_close_button_text}>{t("Close")}</Text>
				</TouchableOpacity>
			</View>
		</CustomModal>
	);
};

export default LanguageModal;
