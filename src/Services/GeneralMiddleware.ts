import { debug, handleError } from "../Utils/Analytics";
import { API_KEY, API_URL } from "../Utils/Const";
import { LANG } from "../i18n/i18n";

const HTTP_TIMEOUT_IN_SEC = 4 * 60;

const authHeaders = new Headers();
authHeaders.append("Content-Type", "application/json");
authHeaders.append("Accept", "application/json");
authHeaders.append("api-key", API_KEY);

interface OptionsProps {
	method: string;
}

const fetchData = (url: string, options: OptionsProps) => {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), HTTP_TIMEOUT_IN_SEC * 1000);
	debug("fetchData::url", url);
	return fetch(url, {
		...options,
		headers: authHeaders,
		body: null,
		redirect: "follow",
		signal: controller.signal,
	})
		.then((response) => {
			clearTimeout(timeoutId);
			if (!response.ok) {
				return response.text().then((htmlContent) => {
					const errorMatch = htmlContent.match(/<pre>(.*?)<\/pre>/);
					const extractedError = errorMatch ? errorMatch[1] : "Unknown Error";
					return { success: false, error: extractedError };
				});
			}
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			handleError(error);
		});
};

export const get = (endpoint: string) => {
	const reqTarget = `${API_URL}${endpoint}?lang=${LANG()}`;
	return fetchData(reqTarget, { method: "GET" });
};

export const getByUrl = (url: string) => {
	return fetchData(url, { method: "GET" });
};
