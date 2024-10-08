import Constants from "expo-constants";
import { Platform } from "react-native";

const BACKGROUND_FETCH_TASK = "fetch-html-background";
const IS_IN_EXPO_GO = Constants.appOwnership === "expo";

const basePath = "../../assets";
const Images = {
	amazonLogo: require(`${basePath}/amazon.png`),
	aliexpress: require(`${basePath}/aliexpress.png`),
	eBay: require(`${basePath}/ebay.png`),
	profile: require(`${basePath}/profile.png`),
	add: require(`${basePath}/add.png`),
	googleIcon: require(`${basePath}/googleIcon.png`),
	home: require(`${basePath}/home.png`),
	share: require(`${basePath}/share.png`),
	surface: require(`${basePath}/surface.png`),
	kebab: require(`${basePath}/kebab.png`),
};
const NAV_TYPE_CLICK = "click";

const siteNames = Object.freeze({
	ALI_EXPRESS: "aliexpress",
	EBAY: "ebay",
	AMAZON: "amazon",
	WALMART: "walmart",
});

const defaultLink = [
	{
		icon: Images.aliexpress,
		text: "AliExpress",
		link: "AliExpress",
	},
	{
		icon: Images.amazonLogo,
		text: "Amazon",
		link: "Amazon",
	},
	{
		icon: Images.eBay,
		text: "eBay",
		link: "eBay",
	},
];

const language = [
	{
		id: 1,
		title: "english",
		nativeName: "English",
		link: "en",
	},
	{
		id: 2,
		title: "French",
		nativeName: "French",
		link: "fr",
	},
];

const actionList = [
	{
		id: 1,
		title: "Change Language",
		action: "language",
	},
	{
		id: 2,
		title: "Help Center",
		action: "help",
	},
];

enum ConclusionTypes {
	"INSUFFICIENT_DATA" = "INSUFFICIENT_DATA",
	"RECOMMENDED" = "RECOMMENDED",
	"NOT_RECOMMENDED" = "NOT_RECOMMENDED",
	"DOUBTFUL" = "DOUBTFUL",
}

enum TabTypes {
	ANALYZE__PRODUCT_INSIGHTS,
	ANALYZE__AI_INSIGHTS,
	ANALYZE__IMAGES,
	ANALYZE__VIDEOS,
}

const isWeb: boolean = Platform.OS === "web";
const isIos: boolean = Platform.OS === "ios";
const isAndroid: boolean = Platform.OS === "android";

export {
	BACKGROUND_FETCH_TASK,
	NAV_TYPE_CLICK,
	defaultLink,
	isWeb,
	isAndroid,
	isIos,
	language,
	actionList,
	siteNames,
	ConclusionTypes,
	TabTypes,
	IS_IN_EXPO_GO,
	Images,
};
