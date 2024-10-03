import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cache } from "react-native-cache";
import { useQuery } from "react-query";
import { getByUrl } from "../../Services/GeneralMiddleware";
import { debug, logError } from "../../Utils/Analytics";
import URL from "../../Services/ServicesUrls";

const SHUTAF_URL = URL.AFFILIATE_REMOTE_URL;
const CACHE_MAX_ENTRIES = 1000;
const CACHE_MAX_AGE = 86400;
const EXPIRATION_TIME_IN_MS = 64800;
const AFFILIATE_DATA_KEY = "SHUTAF_JSON";

interface AffiliateData {
	name: string;
	domain: string;
	target: string;
	shutaf: string;
}

interface ApiResponse {
	data: AffiliateData[];
	timestamp: number;
}

const affiliationCacheInstance: Cache = new Cache({
	namespace: "SafeDealApp",
	policy: { maxEntries: CACHE_MAX_ENTRIES, stdTTL: CACHE_MAX_AGE },
	backend: AsyncStorage,
});

let affiliateDataCache: AffiliateData[] | null = null;

const hasValidAffiliateDuration = (timestamp: number) => {
	const isValidCachedDuration = new Date().getTime() - timestamp < EXPIRATION_TIME_IN_MS;
	return isValidCachedDuration;
};

const getAffiliateCache = () => affiliationCacheInstance;

const loadAffiliateData = async (key): Promise<ApiResponse | null> => {
	const data = await getAffiliateCache().get(key);
	if (!data) {
		return null;
	}
	const json = JSON.parse(data);
	return json;
};

const setAffiliateData = async (key, data) => {
	await getAffiliateCache().set(key, data);
};

export const fetchAffiliateDataSync = () => {
	if (affiliateDataCache) {
		return affiliateDataCache;
	}
	return null;
};

export const fetchAffiliateData = async () => {
	if (affiliateDataCache) {
		return affiliateDataCache;
	}

	const cachedData = await loadAffiliateData(AFFILIATE_DATA_KEY);
	if (cachedData) {
		const { data, timestamp } = cachedData;
		const isValid = hasValidAffiliateDuration(timestamp);
		if (isValid) {
			affiliateDataCache = data;
			return data;
		}
	}

	const response = await getByUrl(SHUTAF_URL);
	const cacheEntry = JSON.stringify({ data: response, timestamp: new Date().getTime() });
	setAffiliateData(AFFILIATE_DATA_KEY, cacheEntry);
	affiliateDataCache = response;
	debug("Affiliate Data:: loaded data from remote");
	return response;
};

export const useAffiliate = () => {
	return useQuery("affiliate", fetchAffiliateData, {
		onError: (error) => {
			logError("Error fetching affiliate data:", error);
		},
	});
};
