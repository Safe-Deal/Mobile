import { API_URL } from "../ServicesUrls";
import { extractPathUrl } from "../../Utils/SiteUtils";
import { getTimedObject, setTimedObject } from "../StorageService";
import { debug } from "../../Utils/Analytics";
import { cleanUrl, getUrlParameter, postRequest } from "../../Utils/Urls";
import { getProductInfo, getProductKey, getProductUrl, isOurRetailer } from "../../Utils/SharedUtils";
import { fetchAffiliateDataSync } from "./AffiliateData";

const AFFILIATION_API_ENDPOINT = "https://safedeal.best";
const AFFILIATION_DOMAINS = ["safedeal.best", "api.joinsafedeal.com", "s.click.aliexpress.com", "joinsafedeal.com"];

export const AFF_PRODUCT_PAGE = "[PRODUCT]";
export const AFF_VIA_API = "[API]";

const MOBILE_TRACKING_ID = "mobile";
const NO_AFFILIATE_URL = "NOT_POSSIBLE_TO_GET_SHUTAFF_LINK";
const TWO_DAYS_IN_MS = 1 * 86400000; // 1 days in milliseconds
const REGEX_PAGE_TESTER = "regexp:";

interface AffiliateProps {
	domain: string;
	target: string;
	name: string;
	shutaf: string;
}

const constructAffiliateUrl = (url: string): string => {
	const product = getProductInfo(url);
	if (!product) {
		return url;
	}

	const finalUrl = getProductUrl(product);
	const result = `${AFFILIATION_API_ENDPOINT}/out?trackingId=${MOBILE_TRACKING_ID}&url=${finalUrl}`;
	return result;
};

const getUrlFromAffiliateUrl = (url: string) => {
	return getUrlParameter(url, "url");
};

const getAffiliateByApi = async (links) => {
	const apiUrl = `${API_URL}/links`;
	const data = {
		links: [links],
		trackingId: MOBILE_TRACKING_ID,
	};
	try {
		const result = await postRequest(apiUrl, data);
		if (result && result?.length > 0) {
			const [link] = result;
			if (link?.shutaff !== NO_AFFILIATE_URL) {
				return link.shutaff;
			}
			return null;
		}
		return result;
	} catch (error) {
		debug("fetchAffiliateLinks:: error ->", error);
		return null;
	}
};

const getAffStorageKey = (url: string) => {
	const isRetailer = isOurRetailer(url);

	if (isRetailer) {
		const key = getProductKey(url);
		if (key) {
			return `r_${key}`;
		}
	}
	const cleanHref = cleanUrl(url);
	const redirectKey = `r_${cleanHref}`;
	return redirectKey;
};

const getAffiliateUrl = async (data: AffiliateProps[], url: string): Promise<string | null> => {
	if (!Array.isArray(data) || data.length === 0) {
		return null;
	}

	if (isAffiliateRedirect(url)) {
		return null;
	}

	const cashKey = getAffStorageKey(url);

	const isActionable = isAffiliated(url, data);
	if (!isActionable) {
		return null;
	}

	const isAlreadyRedirected = await getTimedObject(cashKey);
	if (isAlreadyRedirected) {
		return null;
	}

	const affiliate = data.find(({ domain }) => url.includes(domain));
	if (!affiliate) {
		return null;
	}

	const affiliateRedirectUrl = await resolveRedirectUrl(affiliate, url);
	if (affiliateRedirectUrl) {
		await setTimedObject(cashKey, true, TWO_DAYS_IN_MS);
		return affiliateRedirectUrl;
	}
	return null;
};

const resolveRedirectUrl = async (affiliate: AffiliateProps, cleanHref: string): Promise<string | null> => {
	if (affiliate.target === AFF_PRODUCT_PAGE) {
		const product = getProductInfo(extractPathUrl(cleanHref));
		return product ? buildRedirectUrl(affiliate, cleanHref) : null;
	}

	if (affiliate.target) {
		const matcher = affiliate.target.toLowerCase();
		const testPage = cleanHref.toLowerCase();
		return resolveMatcherRedirect(matcher, testPage, affiliate, cleanHref);
	}

	return null;
};

const buildRedirectUrl = (affiliate: AffiliateProps, cleanHref: string): string => {
	return affiliate.shutaf === AFF_VIA_API ? constructAffiliateUrl(cleanHref) : `${affiliate.shutaf}${cleanHref}`;
};

const resolveMatcherRedirect = (
	matcher: string,
	testPage: string,
	affiliate: AffiliateProps,
	cleanHref: string,
): string | null => {
	if (matcher.startsWith(REGEX_PAGE_TESTER)) {
		const expression = matcher.replace(REGEX_PAGE_TESTER, "");
		const regexp = new RegExp(expression);
		if (regexp.test(testPage)) {
			return `${affiliate.shutaf}${cleanHref}`;
		}
	}

	if (testPage.includes(matcher)) {
		return `${affiliate.shutaf}${cleanHref}`;
	}

	return null;
};

const isAffiliated = (url: string, affData?: AffiliateProps[]): boolean => {
	const data = affData && affData.length > 0 ? affData : fetchAffiliateDataSync();
	const isOut = isOurRetailer(url);

	if (!data) {
		return isOut;
	}

	const affiliate = data.some(({ domain }) => url.includes(domain));

	if (affiliate) {
		return true;
	}

	return false;
};

const shareAffiliateUrl = (url: string): string => {
	const isAffExists = isAffiliateRedirect(url);
	if (isAffExists) {
		return url;
	}
	const urlAff = constructAffiliateUrl(url);
	return urlAff;
};
const AFF_PARAMS = [
	"shutaf",
	"trackingId",
	"aff_platform",
	"aff_trace_key",
	"aff_fcid",
	"aff_ffuid",
	"tag",
	"ascsubtag",
	"camp",
	"asc",
	"node",
	"ref",
	"mkrid",
	"campid",
	"customid",
	"pub",
	"toolid",
	"mkevt",
	"siteid",
	"crlp",
	"ul_noapp",
];

export const hasAffiliateParams = (url: string): boolean => {
	const hasParams = AFF_PARAMS.some((param) => url.includes(`${param}=`));
	if (hasParams) {
		return true;
	}
	return false;
};

const isAffiliateRedirect = (url: string, affData?: AffiliateProps[]): boolean => {
	const data = affData && affData.length > 0 ? affData : fetchAffiliateDataSync();
	const isAffiliationDomain = AFFILIATION_DOMAINS.some((domain) => url.includes(domain));
	const isOut = url.includes(AFFILIATION_API_ENDPOINT) || isAffiliationDomain;

	if (!data) {
		return isOut;
	}
	const isAffiliated = data.some(({ shutaf }) => url.includes(shutaf));
	const result = isAffiliated || isOut;
	return result;
};

export { shareAffiliateUrl, getAffiliateUrl, getAffiliateByApi, getUrlFromAffiliateUrl, isAffiliateRedirect };
