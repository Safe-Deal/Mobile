import { get } from "./../Services/GeneralMiddleware";
import { logError } from "./Analytics";
import { isValidUrl } from "./Urls";
import { isDomainWhitelisted } from "./WhitelistedUrls";

export const createGoogleSearchUrl = (input: string): string => {
	const trimmedSearch = input.trim();
	const isUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(trimmedSearch);
	return !isUrl ? `https://www.google.com/search?q=${encodeURIComponent(trimmedSearch)}` : trimmedSearch;
};

export const extractDomain = (url: string) => {
	try {
		let toParse = url;
		if (!toParse.startsWith("http")) {
			toParse = `http://${toParse}`;
		}
		const isValid = isValidUrl(toParse);
		if (!isValid) {
			return null;
		}
		const parsedUrl = new URL(toParse);
		return parsedUrl.hostname.replace(/^www\./i, "");
	} catch (error) {
		logError(`extractDomain:: Error parsing URL: ${url}`, error);
		return null;
	}
};

export const extractLastUrlFromString = (text: string) => {
	const regex = /(https?:\/\/[^\s,]+)(?!.*https?:\/\/[^\s,]+)/;
	const match = text.match(regex);

	return match ? match[0] : null;
};

export const isOurRetailer = (url: string): boolean => {
	const product = getProductInfo(url);
	return product ? true : false;
};

export const getProductKey = (url: string) => {
	const product = getProductInfo(url);
	const domainKeyMap: { [key: string]: string } = {
		amazon: "amazon",
		ebay: "ebay",
		aliexpress: "aliexpress",
	};

	if (product) {
		const { domain, productId } = product;
		const matchedDomain = Object.keys(domainKeyMap).find((key) => domain.includes(key));
		return matchedDomain ? `${domainKeyMap[matchedDomain]}-${productId}` : null;
	}
	return null;
};

type IProductInfo = {
	domain: string;
	productId: string;
};

export const getProductInfo = (url: string): IProductInfo | null => {
	const domain = extractDomain(url)?.toLocaleLowerCase();
	/* eslint-disable no-useless-escape */
	if (domain?.includes("amazon.")) {
		const asin = url.replace("#", "/").match("/([a-zA-Z0-9]{10})(?:[/?]|$)");
		return asin ? { domain: domain, productId: asin[1] } : null;
	} else if (domain?.includes("ebay.")) {
		const regex = /\/itm\/([^\/?]+)/;
		const match = url.match(regex);
		return match ? { domain: domain, productId: match[1] } : null;
	} else if (domain?.includes("aliexpress.")) {
		const regex = /\/item\/([^\/?]+)/;
		const match = url.match(regex);
		return match ? { domain: domain, productId: match[1].split(".")[0] } : null;
	} else {
		return null;
	}
};

type ISupportedSites = "amazon" | "ebay" | "ali-express" | string;

const getSiteName = (url: string): ISupportedSites => {
	const domain = extractDomain(url)?.toLocaleLowerCase();
	if (!domain) {
		return url;
	}

	if (domain.includes("amazon")) {
		return "amazon";
	}

	if (domain.includes("ebay")) {
		return "ebay";
	}

	if (domain.includes("aliexpress")) {
		return "ali-express";
	}

	return domain;
};
export const getProductUrl = (product: IProductInfo) => {
	if (!product) return null;

	const { domain, productId } = product;
	const siteName = getSiteName(domain);

	const urlMap: { [key: string]: string } = {
		amazon: `https://www.amazon.com/dp/${productId}`,
		ebay: `https://www.ebay.com/itm/${productId}`,
		"ali-express": `https://www.aliexpress.com/item/${productId}.html`,
	};

	return urlMap[siteName] || null;
};

export const getWebProductUrl = (url: string) => {
	const productInfo = getProductInfo(url);
	if (productInfo && productInfo.domain) {
		const siteName = getSiteName(productInfo.domain);
		const currentTime = new Date().getTime();
		const formattedDate = new Date().toISOString().split("T")[0];
		return `https://www.joinsafedeal.com/product/m/s/${siteName}/${productInfo.productId}/reviews-price-history?createdAt=${currentTime}&date=${formattedDate}`;
	} else {
		return null;
	}
};

export const formatDate = (dateString: string) => {
	const [year, month] = dateString.split("-");

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const abbreviatedMonth = monthNames[parseInt(month, 10) - 1];

	return `${abbreviatedMonth}'${year.slice(-2)}`;
};

export const isValidDomain = (url: string) => {
	const isValid = isValidUrl(url);

	if (!isValid) {
		return false;
	}

	const keywordsToCheck = ["aliexpress.com/w/wholesale-"];
	/* eslint-disable no-useless-escape */
	const pattern = new RegExp(`(?=.*${keywordsToCheck.map((keyword) => `\\b${keyword}\\b`).join(")(?=.*")})`, "i");
	const domain = extractDomain(url);
	const isValidKeywords = pattern.test(url);
	const isWhitelisted = isDomainWhitelisted(domain);
	return !isValidKeywords && !isWhitelisted;
};

export const calculateMonthlyAverageOneYearBack = (dataArray: { date: string; price: number }[]) => {
	if (!dataArray || dataArray.length === 0) {
		return [];
	}

	const oneYearBack = new Date();
	oneYearBack.setFullYear(oneYearBack.getFullYear() - 1);

	const getStartOfWeek = (date: Date): Date => {
		const day = date.getDay();
		const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
		return new Date(date.setDate(diff));
	};

	const filteredData = dataArray
		.filter(({ date }) => new Date(date) >= oneYearBack)
		.map(({ date, price }) => ({
			weekStart: getStartOfWeek(new Date(date)).toISOString().slice(0, 7),
			price,
		}))
		.sort((a, b) => (a.weekStart > b.weekStart ? 1 : -1));

	const weeklyAverages: { [key: string]: { sum: number; count: number } } = {};

	for (const { weekStart, price } of filteredData) {
		if (!weeklyAverages[weekStart]) {
			weeklyAverages[weekStart] = { sum: 0, count: 0 };
		}
		weeklyAverages[weekStart].sum += price;
		weeklyAverages[weekStart].count++;
	}

	let result = Object.entries(weeklyAverages).map(([weekStart, data]) => ({
		weekStart,
		averagePrice: data.sum / data.count,
	}));

	if (result.length === 1) {
		const { weekStart, averagePrice } = result[0];
		const date = new Date(weekStart);
		const addWeeks = (date: Date, weeks: number): string => {
			const result = new Date(date);
			result.setDate(result.getDate() + weeks * 7);
			return result.toISOString().slice(0, 10);
		};
		result = [
			{ weekStart: addWeeks(date, -1), averagePrice: averagePrice },
			{ weekStart: date.toISOString().slice(0, 10), averagePrice },
			{ weekStart: addWeeks(date, 1), averagePrice: averagePrice },
		];
	}

	return result;
};

export const capitalizeFirstLetter = (str: string = "") => {
	const formatStr = str.split("_").join(" ");
	return formatStr.charAt(0).toUpperCase() + formatStr.slice(1).toLowerCase();
};
