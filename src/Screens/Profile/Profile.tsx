import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import i18n from "../../i18n/i18n";
import { useTranslation } from "@hooks/useTranslation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import CustomModal from "../../Components/Common/CustomModal/CustomModal";
import { actionList, Images, language } from "../../Shared/Constants";
import s from "./Profile.styles";

const Profile = (): ReactElement => {
	const [selectedLanguage, setSelectedLanguage] = useState("en");
	const [selectedAction, setSelectedAction] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		const fetchCurrentLanguage = async () => {
			const lang = await AsyncStorage.getItem("lang");
			setSelectedLanguage(lang || "en");
		};
		fetchCurrentLanguage();
	}, []);

	const openModal = (item: string): void => {
		setSelectedAction(item);
		setModalVisible(true);
	};

	const closeModal = (): void => {
		setSelectedAction(null);
		setModalVisible(false);
	};

	const handleLangChange = (lang: string): void => {
		setSelectedLanguage(lang);
		i18n.changeLanguage(lang);
		AsyncStorage.setItem("lang", lang);

		closeModal();
	};
	return (
		<View style={s.container}>
			<CustomModal isModalVisible={modalVisible} onClose={closeModal}>
				<View style={s.modalContainer}>
					{selectedAction === "language" && (
						<>
							{language.map((item) => (
								<View key={item.id} style={s.details}>
									<Text
										style={{ color: selectedLanguage === item.link ? "blue" : "black" }}
										onPress={() => handleLangChange(item.link)}
									>
										{t(item.title)}
									</Text>
								</View>
							))}
						</>
					)}
					{selectedAction === "help" && <Text>Help Center</Text>}
				</View>
			</CustomModal>
			<Text style={s.profileText}>{t("profile")}</Text>
			<Image source={Images.profile} style={s.imgStyle} />

			<Text style={s.setting}>{t("Settings")}</Text>
			{actionList.map((item) => (
				<TouchableOpacity key={item.id} onPress={() => openModal(item.action)} style={s.listStyle}>
					<Text style={s.listText}>{t(item.title)}</Text>
					<MaterialIcons name="arrow-forward-ios" size={24} color="black" />
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Profile;
