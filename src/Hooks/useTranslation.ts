import { useTranslation as useNextTranslation } from "react-i18next";

interface IUseTranslation {
	t: (key: string) => string;
}

export const useTranslation = (ns: string[] | string): IUseTranslation => {
	const { t } = useNextTranslation(ns, { nsMode: "fallback" });

	return {
		t,
	};
};
