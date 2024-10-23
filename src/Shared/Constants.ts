import Constants from "expo-constants";
import { Platform } from "react-native";
import { LANGUAGES } from "../i18n/i18nResources";

const BACKGROUND_FETCH_TASK = "fetch-html-background";
const IS_IN_EXPO_GO = Constants.appOwnership === "expo";

const basePath = "../../assets";

const Images = {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	amazonLogo: require(`${basePath}/amazon.png`),
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	aliexpress: require(`${basePath}/aliexpress.png`),
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	eBay: require(`${basePath}/ebay.png`),
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	profile: require(`${basePath}/profile.png`),
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	add: require(`${basePath}/add.png`),
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	googleIcon: require(`${basePath}/googleIcon.png`),
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	home: require(`${basePath}/home.png`),
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	share: require(`${basePath}/share.png`),
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	surface: require(`${basePath}/surface.png`),
	// eslint-disable-next-line @typescript-eslint/no-require-imports
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

const language = LANGUAGES.map((item) => ({
	id: item.intCode,
	title: item.enName,
	nativeName: item.name,
	link: item.code,
}));

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

export const DEFAULT_LINKS = {
	AliExpress: "https://www.aliexpress.com/item/1005006671814456.html",
	Amazon: "https://www.amazon.com/TOZO-T6-Bluetooth-Headphones-Waterproof/dp/B07RGZ5NKS",
	eBay: "https://www.ebay.com/itm/395813621868",
	"": "",
};

export const DEFAULT_LINKS_PATTERNS = {
	aliexpress: /https:\/\/www\.aliexpress\.com\/item\/(\d+)/,
	ebay: /https:\/\/www\.ebay\.com\/itm\/(\d+)/,
	temu: /https:\/\/www\.temu\.com\/product-detail\/(\d+)/,
	amazon: /https:\/\/www\.amazon\.com\/dp\/(\w+)/,
};

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
