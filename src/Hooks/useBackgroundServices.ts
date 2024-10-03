import { useEffect, useState } from "react";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { BACKGROUND_FETCH_TASK } from "../Shared/Constants";

async function registerBackgroundFetchAsync(): Promise<void> {
	await TaskManager.unregisterAllTasksAsync();

	return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
		minimumInterval: 20,
		stopOnTerminate: false,
		startOnBoot: true,
	});
}

async function unregisterBackgroundFetchAsync(): Promise<void> {
	return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

function useBackgroundServices(): [boolean, (status: boolean) => void] {
	const [backgroundTaskStatus, setIsRegistered] = useState(false);

	useEffect(() => {
		checkStatusAsync();
	}, []);

	const checkStatusAsync = async (): Promise<void> => {
		const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
		setIsRegistered(isRegistered);
	};

	const onRegisterBackgroundTask = async (status: boolean): Promise<void> => {
		if (status) {
			await registerBackgroundFetchAsync();
		} else {
			await unregisterBackgroundFetchAsync();
		}
	};

	return [backgroundTaskStatus, onRegisterBackgroundTask];
}

export { useBackgroundServices };
