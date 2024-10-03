import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { RESOURCES, RTL_LANGUAGES, LANGUAGES } from "./i18nResources";
import { getObject, setObject } from "@services/StorageService";
import { I18nManager } from "react-native";

const LANGUAGE_KEY = "app-language";
let currentLang;

export const IS_RTL = (): boolean => {
	return RTL_LANGUAGES.includes(i18n.language);
};

export const LANG = (): string => {
	return currentLang;
};

export const setAppLanguage = async (languageCode: string): Promise<string> => {
	const supportedLanguages = LANGUAGES.map((language) => language.code);
	const finalLang = supportedLanguages.includes(languageCode) ? languageCode : "en";
	await i18n.changeLanguage(finalLang);
	const isRTL = RTL_LANGUAGES.includes(finalLang);
	I18nManager.forceRTL(isRTL);
	currentLang = finalLang;
	await setObject(LANGUAGE_KEY, finalLang);

	return finalLang;
};

export const getAppLanguage = async (): Promise<string> => {
	const storedLanguage = await getObject(LANGUAGE_KEY);
	if (storedLanguage) {
		currentLang = storedLanguage;
		return storedLanguage;
	} else {
		const locales = Localization.getLocales();
		const deviceLocale = locales[0]?.languageCode || "en";
		const supportedLanguages = LANGUAGES.map((language) => language.code);
		const deviceLanguage = supportedLanguages.includes(deviceLocale) ? deviceLocale : "en";

		await setObject(LANGUAGE_KEY, deviceLanguage);
		currentLang = deviceLanguage;
		return deviceLanguage;
	}
};

i18n.use(initReactI18next).init({
	resources: RESOURCES,
	lng: currentLang,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	compatibilityJSON: "v3",
});

export default i18n;
