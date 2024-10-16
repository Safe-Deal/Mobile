import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import { getObject, setObject } from "../Services/StorageService";

interface IOnboardContext {
	hideOnboard: boolean;
	showTooltip: boolean;
	toggleOnboard: (value: boolean) => void;
	toggleShowTooltip: (value: boolean) => void;
	loading: boolean;
}

const defaultState: IOnboardContext = {
	hideOnboard: false,
	showTooltip: true,
	toggleOnboard: () => {},
	toggleShowTooltip: () => {},
	loading: true,
};

const OnboardContext = createContext<IOnboardContext>(defaultState);

export const OnboardProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [hideOnboard, setHideOnBoard] = useState<boolean>(false);
	const [showTooltip, setShowTooltip] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getStorageValue = async () => {
			const hideOnboardValue = await getObject("hideOnboard");
			const showTooltipValue = await getObject("showTooltip");

			// if (hideOnboardValue !== null) {
			// 	setHideOnBoard(hideOnboardValue);
			// }
			// if (showTooltipValue !== null) {
			// 	setShowTooltip(showTooltipValue);
			// }
			setLoading(false);
		};
		getStorageValue();
	}, []);

	const toggleOnboard = async (value: boolean) => {
		await setObject("hideOnboard", value);
		setHideOnBoard(value);
	};

	const toggleShowTooltip = async (value: boolean) => {
		await setObject("showTooltip", value);
		setShowTooltip(value);
	};

	return (
		<OnboardContext.Provider value={{ hideOnboard, showTooltip, toggleOnboard, toggleShowTooltip, loading }}>
			{children}
		</OnboardContext.Provider>
	);
};

export const useOnboardContext = (): IOnboardContext => {
	return useContext(OnboardContext);
};
