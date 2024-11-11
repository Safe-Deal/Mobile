import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the state type
interface OnboardState {
	hideOnboard: boolean;
	showTooltip: boolean;
	loading: boolean;
	toggleOnboard: (value: boolean) => void;
	toggleShowTooltip: (value: boolean) => void;
	setLoading: (value: boolean) => void;
}

export const useOnboardStore = create<OnboardState>()(
	persist(
		(set) => ({
			hideOnboard: false,
			showTooltip: true,
			loading: true,

			toggleOnboard: (value: boolean) => {
				set({ hideOnboard: value });
			},

			toggleShowTooltip: (value: boolean) => {
				set({ showTooltip: value });
			},

			setLoading: (value: boolean) => {
				set({ loading: value });
			},
		}),
		{
			name: "onboard-storage",
			storage: createJSONStorage(() => AsyncStorage),
			onRehydrateStorage: () => (state) => {
				state?.setLoading(false);
			},
		},
	),
);
