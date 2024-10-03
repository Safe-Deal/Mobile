import "react-native-url-polyfill/auto";
import { siteNames } from "../Shared/Constants";
import { Urls } from "../Shared/Urls";
import { debug } from "./Analytics";

const CONDITION_SPLITTER = "|";

const containsAny = (url: string, pattern: string): boolean => {
	if (!url) {
		return false;
	}
	url = url.toString();
	if (pattern.includes(CONDITION_SPLITTER)) {
		const items = pattern.split(CONDITION_SPLITTER);
		return items.some((v) => url.includes(v));
	}
	return url.includes(pattern);
};

export const replaceAll = (str: string, matches: string, replacement: string): string => {
	let result = str;
	if (Array.isArray(matches)) {
		for (const match of matches) {
			result = String(result).split(match).join(replacement);
		}
		return result;
	}
	return String(str).split(matches).join(replacement);
};

const getAsinFromUrl = (url: string, ignoreFailure: boolean = false): string | null => {
	const asin = url.replace("#", "/").match("/([a-zA-Z0-9]{10})(?:[/?]|$)");
	if (asin && asin.length > 0) {
		const result = replaceAll(asin[0], "/", "");
		return replaceAll(result, "?", "");
	}
	if (ignoreFailure) {
		return null;
	}
	debug("getAsinFromUrl", "Failed to get ASIN from URL", url);
	return null;
};

const isAliExpressSite = (url: string): boolean => containsAny(url, siteNames.ALI_EXPRESS);
const isAmazonSite = (url: string): boolean => containsAny(url, siteNames.AMAZON);
const isAmazonItemDetails = (url: string): boolean =>
	containsAny(url, Urls.AMAZON_ITEM_URL_STRINGS) && getAsinFromUrl(url, true) != null;

const isAliExpressItemDetails = (url: string): boolean =>
	containsAny(url, Urls.ALI_EXPRESS_PRODUCT_PATH_URL) && !isAmazonItemDetails(url);

const isEbaySite = (url: string): boolean => containsAny(url, siteNames.EBAY);
const isEbayItemDetails = (url: string): boolean => containsAny(url, Urls.EBAY_PRODUCT_PATH_URL);
const isItemDetails = (url: string): boolean => {
	return (
		(isAliExpressSite(url) && isAliExpressItemDetails(url)) ||
		(isAmazonSite(url) && isAmazonItemDetails(url)) ||
		(isEbaySite(url) && isEbayItemDetails(url) && !url.includes("api.joinsafedeal.com"))
	);
};

// before:https://www.aliexpress.com/item/1005006452882733.html?spm=a2g0n.productlist.0.0
// after: https://www.aliexpress.com/item/1005006452882733.html
const extractPathUrl = (urlString: string = ""): string => {
	if (!urlString) {
		return urlString;
	}

	try {
		const url = new URL(urlString);
		return `${url.protocol}//${url.host}${url.pathname}`;
	} catch (error) {
		return urlString;
	}
};

// Function to extract the product ID from a URL using a regular expression
// before:https://www.aliexpress.com/item/1005006452882733.html?spm=a2g0n.productlist.0.0
// after: 1005006452882733
const getAliExpressProductIDFromURL = (urlString: string = ""): string | null => {
	const match = urlString.match(/\/item\/(\d+)\.html/);
	return match ? match[1] : null;
};

export {
	containsAny,
	extractPathUrl,
	getAliExpressProductIDFromURL,
	isAliExpressSite,
	isEbaySite,
	isAmazonSite,
	isItemDetails,
};
