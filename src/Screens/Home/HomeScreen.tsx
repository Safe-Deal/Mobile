import { useTranslation } from "@hooks/useTranslation";
import React, { useState } from "react";
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import CustomModal from "../../Components/Common/CustomModal/CustomModal";
import { DEFAULT_LINKS, Images } from "../../Shared/Constants";
import { useHomeLinksStore } from "../../Zustand/HomeLinks/HomeLinks";
import s from "./HomeScreen.styles";

interface HomeScreenProps {
	setUrl: (url: string) => void;
	setIsHomeActive: (isHomeActive: boolean) => void;
	setActiveEventHTML: (activeEventHTML: string | null) => void;
}

const HomeScreen = ({ setUrl, setIsHomeActive, setActiveEventHTML }: HomeScreenProps) => {
	const { t } = useTranslation();
	const { homeLinks, modalVisible, addLink, deleteLink, updateModalVisibility } = useHomeLinksStore();

	const [newLinkTitle, setNewLinkTitle] = useState("");
	const [newLinkURL, setNewLinkURL] = useState("");

	const [menuVisible, setMenuVisible] = useState(Array(homeLinks.length).fill(false));

	const addNewLink = (): void => {
		if (!newLinkTitle.trim()) {
			alert("Please enter a title for the Shortcut.");
			return;
		}

		if (!newLinkURL.trim()) {
			alert("Please enter a URL for the Shortcut");
			return;
		}

		addLink({
			icon: Images.googleIcon,
			text: newLinkTitle,
			link: newLinkURL,
		});
		updateModalVisibility(false);
		setUrl(newLinkURL);
		setNewLinkTitle("");
		setNewLinkURL("");
	};

	const onCancelPress = () => {
		setNewLinkTitle("");
		setNewLinkURL("");
		updateModalVisibility(false);
	};

	const closeLinkMenu = () => {
		setMenuVisible(Array(homeLinks.length).fill(false));
	};

	const onLinkItemClick = (link: string) => {
		setIsHomeActive(false);
		setActiveEventHTML(null);

		const urlMap: { [key: string]: string } = DEFAULT_LINKS;

		setUrl(urlMap[link] || link);
	};

	const openLinkMenu = (index: number): void => {
		const updatedMenuVisibility = [...menuVisible];
		updatedMenuVisibility[index] = true;
		setMenuVisible(updatedMenuVisibility);
	};

	const removeLink = (item: any): void => {
		deleteLink(item);
		closeLinkMenu();
	};

	return (
		<View style={s.homePage__container}>
			<CustomModal style={s.homePage__modal} isModalVisible={modalVisible} onClose={() => updateModalVisibility(false)}>
				<View style={s.homePage__modal__container}>
					<View>
						<Text style={s.homePage__modal__title_text}>{t("Add new link")}</Text>
						<TextInput
							style={s.homePage__modal__input}
							placeholder={t("Title like 'Temu'")}
							placeholderTextColor="gray"
							value={newLinkTitle}
							onChangeText={(text) => setNewLinkTitle(text)}
						/>
						<TextInput
							style={s.homePage__modal__input}
							placeholder={t("Link like https://www.temu.com/")}
							placeholderTextColor="gray"
							value={newLinkURL}
							onChangeText={(text) => {
								setNewLinkURL(text);
							}}
						/>

						<View style={s.row_view}>
							<View style={s.homePage__modal__cancel_button}>
								<Button
									title="Cancel"
									color={s.homePage__modal__cancel_button?.borderColor}
									onPress={() => onCancelPress()}
								/>
							</View>
							<View style={s.homePage__modal__button}>
								<Button title="Add" color={s.homePage__modal__button?.color} onPress={addNewLink} />
							</View>
						</View>
					</View>
				</View>
			</CustomModal>
			<View style={s.homePage__links}>
				<View style={s.homePage__links__row}>
					{homeLinks.map((item: any, index: any) => (
						<Menu
							key={index}
							visible={menuVisible[index]}
							onDismiss={closeLinkMenu}
							anchor={
								<>
									<TouchableOpacity
										style={s.homePage__links_box}
										onPress={() => onLinkItemClick(item.link)}
										onLongPress={() => openLinkMenu(index)}
									>
										<Image style={s.homePage__links_box__icon} source={item.icon} />
									</TouchableOpacity>
									<Text style={s.homePage__links_box__text}>{t(item.text)}</Text>
								</>
							}
						>
							<Menu.Item onPress={() => removeLink(item)} title={t("Delete")} leadingIcon="delete" />
						</Menu>
					))}
					<View style={s.homePage_addlink_container}>
						<TouchableOpacity
							style={s.homePage__links_box}
							onPress={() => {
								updateModalVisibility(true);
							}}
						>
							<Image style={s.homePage__links_box__icon} source={Images.add} />
						</TouchableOpacity>
						<Text style={s.homePage__links_box__text}>{t("Add Link")}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default HomeScreen;
