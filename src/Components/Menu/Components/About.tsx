import React, { useEffect } from "react";
import { Keyboard, Linking, ScrollView, View } from "react-native";
import { Button, Card, Portal, Text } from "react-native-paper";
import { useTranslation } from "@hooks/useTranslation";
import IconButton from "../../Common/Icons/IconButton";
import s from "./About.styles";
import Theme from "../../../Theme/Theme";
import CustomModal from "../../Common/CustomModal/CustomModal";
import { logError } from "../../../Utils/Analytics";

const AboutPage = ({ onClose }) => {
	const { t } = useTranslation(["menu", "global"]);

	const handleOpenLink = (url) => {
		Linking.openURL(url).catch((err) => logError("Failed to open URL:", err));
	};

	useEffect(() => {
		Keyboard.dismiss();
	}, []);

	return (
		<ScrollView style={s.about__container}>
			<Card style={s.about__card}>
				<Card.Content>
					<Text style={s.about__card__headerText}>{t("aboutTitle")}</Text>
					<View style={s.about__shareButton__container}>
						<IconButton
							name="facebook"
							onPress={() =>
								handleOpenLink(
									"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.joinsafedeal.com%2Fgo%3Ftype%3Dextension-share-button",
								)
							}
							style={s.about__shareButton}
							color="#3b5998"
						/>
						<IconButton
							name="twitter"
							onPress={() =>
								handleOpenLink(
									"https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.joinsafedeal.com%2Fgo%3Ftype%3Dextension-share-button",
								)
							}
							style={s.about__shareButton}
							color="#00aced"
						/>
						<IconButton
							name="whatsapp"
							onPress={() =>
								handleOpenLink(
									"https://api.whatsapp.com/send?text=https%3A%2F%2Fwww.joinsafedeal.com%2Fgo%3Ftype%3Dextension-share-button",
								)
							}
							style={s.about__shareButton}
							color="#25D366"
						/>
						<IconButton
							name="linkedin"
							onPress={() =>
								handleOpenLink(
									"https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fwww.joinsafedeal.com%2Fgo%3Ftype%3Dextension-share-button",
								)
							}
							style={s.about__shareButton}
							color="#0077B5"
						/>
						<IconButton
							name="telegram"
							onPress={() =>
								handleOpenLink(
									"https://telegram.me/share/url?url=https%3A%2F%2Fwww.joinsafedeal.com%2Fgo%3Ftype%3Dextension-share-button",
								)
							}
							style={s.about__shareButton}
							color="#25A3E3"
						/>
						<IconButton
							name="reddit"
							onPress={() =>
								handleOpenLink(
									"https://reddit.com/submit?url=https%3A%2F%2Fwww.joinsafedeal.com%2Fgo%3Ftype%3Dextension-share-button",
								)
							}
							style={s.about__shareButton}
							color="#FF5700"
						/>
						<IconButton
							name="email"
							onPress={() =>
								handleOpenLink("mailto:?body=https%3A%2F%2Fwww.joinsafedeal.com%2Fgo%3Ftype%3Dextension-share-button")
							}
							style={s.about__shareButton}
							color="#7f7f7f"
						/>
					</View>
					<Text
						style={s.about__suggestionText}
						onPress={() => handleOpenLink("https://www.joinsafedeal.com/contact-us")}
					>
						{t("suggestFeature")}
					</Text>
				</Card.Content>
			</Card>
			<Card style={s.about__card}>
				<Card.Content>
					<Text style={s.about__card__headerText}>{t("freeToUseTitle")}</Text>
					<Text style={s.about__normalText}>{t("freeToUseDesc")}</Text>
					<Text style={s.about__normalText}>{t("dataPrivacyDesc")}</Text>
				</Card.Content>
			</Card>
			<View style={s.about__close}>
				<Button mode="contained" onPress={onClose} buttonColor={Theme.doneGreen} labelStyle={s.about__close__btn}>
					{t("Close")}
				</Button>
			</View>
		</ScrollView>
	);
};

export const AboutModal = ({ isVisible, onClose }) => {
	return (
		<Portal>
			<CustomModal isModalVisible={isVisible} onClose={onClose}>
				<View style={s.about__modal}>
					<AboutPage onClose={onClose} />
				</View>
			</CustomModal>
		</Portal>
	);
};
