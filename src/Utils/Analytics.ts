export const IS_DEBUG = __DEV__;

export const debug = (message: string | Error | unknown, ...params: any[]) => {
	if (!IS_DEBUG) {
		return;
	}

	if (message instanceof Error) {
		console.error(`${message.message}`, message.stack);
		return;
	}

	try {
		let data = "";

		if (params.length === 1) {
			const param = params[0];
			data = JSON.stringify(param, null, 2);
		} else if (params.length > 1) {
			const paramObject = params.reduce((acc, param) => {
				if (typeof param === "object" && param !== null && !Array.isArray(param)) {
					Object.assign(acc, param);
				} else {
					acc[Object.keys(acc).length] = param;
				}
				return acc;
			}, {});
			data = JSON.stringify(paramObject, null, 2);
		}

		console.log(`${message}`, data);
	} catch (e) {
		console.error(`debug__ERR::${message}`, params);
	}
};

export const logError = (message: string, error: Error | unknown) => {
	if (!IS_DEBUG) {
		return;
	}

	console.error(`logError__ERR::${message}`, error);
};
