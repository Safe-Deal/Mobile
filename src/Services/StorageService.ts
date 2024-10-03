import AsyncStorage from "@react-native-async-storage/async-storage";
import { debug, logError } from "../Utils/Analytics";

export const setObject = async (key: string, value: any) => {
	const stringValue = JSON.stringify(value);
	try {
		await AsyncStorage.setItem(key, stringValue);
	} catch (e) {
		logError(`StorageService:: Error storing the object under key: ${key}`, e);
	}
};

export const getObject = async (key: string): Promise<any> => {
	try {
		const stringValue = await AsyncStorage.getItem(key);
		return stringValue ? JSON.parse(stringValue) : null;
	} catch (e) {
		logError(`StorageService:: Error retrieving the object under key: ${key}`, e);
		return null;
	}
};

export const setTimedObject = async (key: string, value: any, durationMs: number) => {
	const objectToStore = {
		data: value,
		expiry: new Date().getTime() + durationMs,
	};
	await setObject(key, objectToStore);
};

export const getTimedObject = async (key: string): Promise<any> => {
	try {
		const storedObject = await getObject(key);
		if (storedObject && new Date().getTime() < storedObject.expiry) {
			return storedObject.data;
		}
		return null;
	} catch (e) {
		debug(`Error retrieving the timed object under key: ${key}`);
		return null;
	}
};
