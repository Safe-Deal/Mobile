import { Platform } from "react-native";
import { IOS } from "../../../Utils/Const";

const ICONS_MAP = {
	refresh: {
		feather: "refresh-cw",
		material: "refresh",
	},
	kebab: {
		feather: "more-vertical",
		material: "more-vert",
	},
	twitter: {
		feather: "twitter",
		material: "alternate-email",
	},
	facebook: {
		feather: "facebook",
		material: "facebook",
	},
	whatsapp: {
		feather: "message-circle",
		material: "message",
	},
	linkedin: {
		feather: "linkedin",
		material: "business",
	},
	telegram: {
		feather: "send",
		material: "telegram",
	},
	reddit: {
		feather: "message-square",
		material: "reddit",
	},
	email: {
		feather: "mail",
		material: "email",
	},
	close: {
		feather: "x",
		material: "close",
	},
	share: {
		feather: "share",
		material: "share",
	},
	info: {
		feather: "info",
		material: "info",
	},
	monitor: {
		feather: "monitor",
		material: "desktop-windows",
	},
	language: {
		feather: "globe",
		material: "language",
	},
};

export const getIconName = (name) =>
	Platform.OS === IOS ? ICONS_MAP[name]?.feather || name : ICONS_MAP[name]?.material || name;
