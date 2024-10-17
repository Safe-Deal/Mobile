import { useTranslation } from "@hooks/useTranslation";
import React, { useState } from "react";
import { Linking } from "react-native";
import { List, Menu as MenuPaper } from "react-native-paper";
import { Icon } from "../Common/Icons/Icon";
import { IconButton } from "../Common/Icons/IconButton";
import s from "./Menu.styles";
import { AboutModal } from "./Components/About";
import { useOnboardContext } from "@context/onBoardContext";

interface MenuProps {
	onSharePress?: (value: string) => void;
	onLanguagePress?: () => void;
	hasDecision?: boolean;
}
const SUPPORT_LINK = "https://chat.whatsapp.com/Dr0Zr8gvVbh4j2pouD9LP7";
const DESKTOP_LINK = "https://www.joinsafedeal.com/desktop";

export const Menu = ({ onSharePress, onLanguagePress, hasDecision = false }: MenuProps) => {
	const { t } = useTranslation();
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isAboutModalVisible, setAboutModalVisible] = useState(false);
	const { toggleOnboard } = useOnboardContext();

	const openAboutModal = () => {
		setAboutModalVisible(true);
		setMenuOpen(false);
	};

	const closeAboutModal = () => setAboutModalVisible(false);

	const handleSupport = () => {
		Linking.openURL(SUPPORT_LINK);
		handleCloseMenu();
	};

	const handleDesktop = () => {
		Linking.openURL(DESKTOP_LINK);
		handleCloseMenu();
	};

	const handleOpenMenu = () => setMenuOpen(true);
	const handleCloseMenu = () => setMenuOpen(false);

	const handleShare = () => {
		if (onSharePress) {
			onSharePress(t("share-to-friends"));
		}
		handleCloseMenu();
	};

	const handleLanguage = () => {
		if (onLanguagePress) {
			onLanguagePress();
		}
		handleCloseMenu();
	};

	const handleHowToUse = () => {
		toggleOnboard(false);
		handleCloseMenu();
	};

	return (
		<>
			<MenuPaper
				visible={isMenuOpen}
				onDismiss={handleCloseMenu}
				anchor={
					<IconButton
						style={hasDecision ? s.top_toolbar__menu_btn_decision : s.top_toolbar__menu_btn_no_decision}
						name="kebab"
						onPress={handleOpenMenu}
					/>
				}
			>
				<List.Item
					title={t("Support")}
					left={() => <Icon name="whatsapp" style={s.top_toolbar__menu_icon} />}
					onPress={handleSupport}
				/>
				<List.Item
					title={t("AppLanguage")}
					left={() => <Icon name="language" style={s.top_toolbar__menu_icon} />}
					onPress={handleLanguage}
				/>
				<List.Item
					title={t("Share")}
					left={() => <Icon name="share" style={s.top_toolbar__menu_icon} />}
					onPress={handleShare}
				/>
				<List.Item
					title={t("Desktop App")}
					left={() => <Icon name="monitor" style={s.top_toolbar__menu_icon} />}
					onPress={handleDesktop}
				/>
				<List.Item
					title={t("How to use Safe-Deal")}
					left={() => <Icon name="help-circle" style={s.top_toolbar__menu_icon} />}
					onPress={handleHowToUse}
				/>
				<List.Item
					title={t("What is  Safe-Deal")}
					left={() => <Icon name="info" style={s.top_toolbar__menu_icon} />}
					onPress={openAboutModal}
				/>
			</MenuPaper>
			<AboutModal isVisible={isAboutModalVisible} onClose={closeAboutModal} />
		</>
	);
};
