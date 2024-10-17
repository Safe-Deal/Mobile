import React, { useState } from "react";
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../Components/Common/CustomModal/CustomModal";
import { addLink, deleteLink, updateModalVisibility } from "../../Redux/HomeLinks/HomeLinks";
import { Images } from "../../Shared/Constants";
import s from "./HomeScreen.styles";
import { useTranslation } from "@hooks/useTranslation";

interface HomeScreenProps {
	setUrl: (url: string) => void;
	setIsHomeActive: (isHomeActive: boolean) => void;
	setActiveEventHTML: (activeEventHTML: string | null) => void;
}

const HomeScreen = ({ setUrl, setIsHomeActive, setActiveEventHTML }: HomeScreenProps) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const [newLinkTitle, setNewLinkTitle] = useState("");
	const [newLinkURL, setNewLinkURL] = useState("");
	const { homeLinks, modalVisible } = useSelector((state: any) => state?.HomeLinks);

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
		dispatch(
			addLink({
				icon: Images.googleIcon,
				text: newLinkTitle,
				link: newLinkURL,
			}),
		);
		dispatch(updateModalVisibility(false));
		setUrl(newLinkURL);
		setNewLinkTitle("");
		setNewLinkURL("");
	};

	const onCancelPress = () => {
		setNewLinkTitle("");
		setNewLinkURL("");
		dispatch(updateModalVisibility(false));
	};

	const closeLinkMenu = () => {
		setMenuVisible(Array(homeLinks.length).fill(false));
	};

	const onLinkItemClick = (link: string) => {
		setIsHomeActive(false);
		setActiveEventHTML(null);

		const urlMap: { [key: string]: string } = {
			AliExpress: "https://www.aliexpress.us/item/3256806683079972.html",
			Amazon: "https://www.amazon.com/n/dp/B0B6JC1L15",
			eBay: "https://www.ebay.com/itm/356127144832",
			"": "",
		};

		setUrl(urlMap[link] || link);
	};

	const openLinkMenu = (index: number): void => {
		const updatedMenuVisibility = [...menuVisible];
		updatedMenuVisibility[index] = true;
		setMenuVisible(updatedMenuVisibility);
	};

	const removeLink = (item: any): void => {
		dispatch(deleteLink(item));
		closeLinkMenu();
	};

	return (
		<View style={s.homePage__container}>
			<CustomModal
				style={s.homePage__modal}
				isModalVisible={modalVisible}
				onClose={() => dispatch(updateModalVisibility(false))}
			>
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
								dispatch(updateModalVisibility(true));
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
