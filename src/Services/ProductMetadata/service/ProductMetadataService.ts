import { DEFAULT_LINKS_PATTERNS } from "@shared/Constants";

export const detectProductURL = (url) => {
	for (const pattern of Object.values(DEFAULT_LINKS_PATTERNS)) {
		if (pattern.test(url)) {
			return true;
		}
	}
	return false;
};
