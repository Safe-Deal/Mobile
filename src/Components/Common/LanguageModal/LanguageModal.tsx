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
	const { t } = useTranslation("languageModal");
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
					{language.map((item) => (
						<View key={item.id} style={s.language_modal_details}>
							<Text
								style={[
									{ color: selectedLanguage === item.link ? s.language_modal_selected_text.color : "black" },
									s.language_modal_item_text,
								]}
								onPress={() => handleLangChange(item.link)}
							>
								{t(item.title)}
							</Text>
							<Text style={s.language_modal_sub_text}>{item.nativeName}</Text>
						</View>
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
