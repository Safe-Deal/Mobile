import { debug, logError } from "./Analytics";

export const cleanUrl = (url: string): string => {
	try {
		const urlObj = new URL(url);
		return urlObj.origin + urlObj.pathname;
	} catch (error) {
		debug(`cleanUrl :: error -> ${error} :: url -> ${url}`);
		return url;
	}
};

export const getUrlParameter = (url, paramName) => {
	try {
		const urlObj = new URL(url);
		const params = new URLSearchParams(urlObj.search);
		return params.get(paramName);
	} catch (error) {
		debug(`getUrlParameter :: error -> ${error}`);
		return null;
	}
};

export const followUrlRedirects = async (initialUrl) => {
	try {
		const response = await fetch(initialUrl, {
			method: "HEAD",
		});
		const finalUrl = response.url;
		return finalUrl;
	} catch (error) {
		debug(`followUrlRedirects :: error -> ${error}`);
		return initialUrl;
	}
};

export const postRequest = async (url, data, headers = {}) => {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			debug("Error making POST request:", response.statusText);
			return null;
		}

		return await response.json();
	} catch (error) {
		debug(`Error making POST request: ${error}`);
		return null;
	}
};

export const isValidUrl = (url: string): boolean => {
	if (!url || url.trim() === "" || url === "about:blank") {
		return false;
	}

	try {
		new URL(url);
		return true;
	} catch (error) {
		logError("isValidUrl :: error", error);
		return false;
	}
};
