import { useEffect, useState } from "react";
import { getAppLanguage, setAppLanguage } from "../i18n";

type IUseRTLInit = boolean;

export const useI18nInit = (): IUseRTLInit => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const initializeLanguage = async () => {
			const language = await getAppLanguage();
			console.log(language, "language");
			await setAppLanguage(language);

			setIsReady(true);
		};

		initializeLanguage();
	}, []);

	return isReady;
};

export default useI18nInit;
