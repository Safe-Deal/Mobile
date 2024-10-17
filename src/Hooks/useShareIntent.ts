import { IS_IN_EXPO_GO } from "../Shared/Constants";

interface ShareIntent {
	files: any[] | null;
	text: string | null;
	webUrl: string | null;
	type: string | null;
}

interface ShareIntentHook {
	isReady: boolean;
	hasShareIntent: boolean;
	shareIntent: ShareIntent;
	resetShareIntent: (clearNativeModule?: boolean) => void;
	error: string | null;
}

const mockShareIntentHook = {
	isReady: false,
	hasShareIntent: false,
	shareIntent: { files: null, text: null, webUrl: null, type: null },
	resetShareIntent: () => {},
	error: null,
};

export const useShareIntent = (options: any): ShareIntentHook => {
	if (IS_IN_EXPO_GO) {
		return mockShareIntentHook;
	} else {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { useShareIntent: realUseShareIntent } = require("expo-share-intent");
		return realUseShareIntent(options);
	}
};
