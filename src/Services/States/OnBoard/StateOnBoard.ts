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
	setLoading: (value: boolean) => void; // Optional: create a setter for loading
}

// Create the Zustand store with the defined state type
export const useOnboardStore = create<OnboardState>()(
	persist(
		(set) => ({
			hideOnboard: false,
			showTooltip: true,
			loading: true,

			// Toggle the hideOnboard state
			toggleOnboard: (value: boolean) => {
				set({ hideOnboard: value });
			},

			// Toggle the showTooltip state
			toggleShowTooltip: (value: boolean) => {
				console.log(value, "ADAS");
				set({ showTooltip: value });
			},

			// Optional: add a function to set loading state
			setLoading: (value: boolean) => {
				set({ loading: value });
			},
		}),
		{
			name: "onboard-storage",
			storage: createJSONStorage(() => AsyncStorage),
			onRehydrateStorage: () => (state) => {
				// This will be called after the state is rehydrated
				state?.setLoading(false); // Set loading to false
			},
		},
	),
);
