import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "@screens/Welcome/Welcome";
import React, { ReactElement } from "react";

const Stack = createNativeStackNavigator();

export const WelcomeWindow = (): ReactElement => {
	return (
		<Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="WelcomeScreen" component={Welcome} />
		</Stack.Navigator>
	);
};
