import { useEffect, useState } from "react";
import { useTranslation as useNextTranslation } from "react-i18next";
import { getAppLanguage, LANG } from "../i18n/i18n";

interface IUseTranslation {
	t: (key: string) => string;
	language?: string;
}
const ns = ["analyze", "search", "stores", "history", "settingList", "global", "menu", "WelcomeTour"];
export const useTranslation = (): IUseTranslation => {
	const { t } = useNextTranslation(ns, { nsMode: "fallback" });
	const [language, setLanguage] = useState<string>(LANG());

	useEffect(() => {
		const loadLang = async () => {
			const lang = await getAppLanguage();
			setLanguage(lang);
		};
		loadLang();
	}, []);

	return {
		t,
		language,
	};
};
