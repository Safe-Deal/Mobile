import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { ReactElement } from "react";
import { BrowserFooter } from "./BrowserFooter/BrowserFooter";
import ConclusionView from "../ProductAnalysis/ConclusionView";

const Stack = createNativeStackNavigator();

export const MainWindow = (): ReactElement => {
	return (
		<Stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MainScreen" component={BrowserFooter} />
			<Stack.Screen name="ConclusionView" component={ConclusionView} />
		</Stack.Navigator>
	);
};
