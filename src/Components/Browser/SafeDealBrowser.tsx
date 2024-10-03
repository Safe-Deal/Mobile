import React, { ReactElement } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { useOnboardContext } from "../../Context/onBoardContext";
import { SpinnerLoader } from "../Common/Loaders/SpinnerLoader";
import { MainWindow } from "./MainWindow";
import { WelcomeWindow } from "./WelcomeWindow";

const SafeDealBrowser = (): ReactElement => {
	const { hideOnboard, loading } = useOnboardContext();

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<SpinnerLoader />
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} animated={true} />
			{hideOnboard ? <MainWindow /> : <WelcomeWindow />}
		</SafeAreaView>
	);
};

export default SafeDealBrowser;
