import { debug } from "@utils/Analytics";
import { Share } from "react-native";
import { create } from "zustand";

interface IWebViewRefProps {
	refresh: () => void;
	goToUrl: (url: string) => void;
}

interface IAppStore {
	webViewRef: React.MutableRefObject<IWebViewRefProps | undefined>;
	activeUrl: string;
	setActiveUrl: (val: string) => void;
	activeUrlHTML: string | null;
	setActiveUrlHTML: (val: string | null) => void;
	isAnalyticsModalVisible: boolean;
	toggleAnalyticsModal: () => void;
	onShare: (data: string) => void;
	history: string[];
	setHistory: (history: string[]) => void;
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
}

export const useAppStore = create<IAppStore>((set) => {
	const webViewRef = { current: undefined };

	return {
		webViewRef,
		activeUrl: "",
		setActiveUrl: (val) => {
			set({ activeUrl: val });
		},
		activeUrlHTML: null,
		setActiveUrlHTML: (val) => set({ activeUrlHTML: val }),
		isAnalyticsModalVisible: false,
		toggleAnalyticsModal: () => set((state) => ({ isAnalyticsModalVisible: !state.isAnalyticsModalVisible })),
		onShare: async (data: any) => {
			try {
				await Share.share({
					message: data,
				});
			} catch (error) {
				debug(error);
			}
		},
		history: [],
		setHistory: (history) => set({ history }),
		currentIndex: -1,
		setCurrentIndex: (index) => set({ currentIndex: index }),
	};
});
