import { useTranslation as useNextTranslation } from "react-i18next";

interface IUseTranslation {
	t: (key: string) => string;
}
const ns = ["analyze", "search", "stores", "history", "settingList", "global", "menu", "WelcomeTour"];
export const useTranslation = (): IUseTranslation => {
	const { t } = useNextTranslation(ns, { nsMode: "fallback" });

	return {
		t,
	};
};
