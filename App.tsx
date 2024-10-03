import { NavigationContainer } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { TooltipProps, TourGuideProvider } from "rn-tourguide";
import SafeDealBrowser from "./src/Components/Browser/SafeDealBrowser";
import { SpinnerLoader } from "./src/Components/Common/Loaders/SpinnerLoader";
import { TourModal } from "./src/Components/Common/TourModal/TourModel";
import { AppContextProvider } from "./src/Context/AppContext";
import { OnboardProvider } from "./src/Context/onBoardContext";
import { store } from "./src/Redux/Store";
import { ErrorBoundary } from "./src/Shared/ErrorBoundary";
import SafeDealTheme from "./src/Theme/SafeDealTheme";
import useI18nInit from "./src/i18n/hooks/useI18nInit";
import i18n from "./src/i18n/i18n";

const App = (): ReactElement => {
	const isI18nReady = useI18nInit();
	if (!isI18nReady) {
		return <SpinnerLoader />;
	}

	return (
		<ErrorBoundary>
			<QueryClientProvider client={new QueryClient()}>
				<PaperProvider theme={SafeDealTheme as never}>
					<AppContextProvider>
						<I18nextProvider i18n={i18n}>
							<OnboardProvider>
								<GestureHandlerRootView style={{ flex: 1 }}>
									<NavigationContainer>
										<ReduxProvider store={store}>
											<TourGuideProvider
												preventOutsideInteraction={true}
												borderRadius={16}
												{...{
													tooltipComponent: (props: TooltipProps) => <TourModal {...props}></TourModal>,
												}}
											>
												<SafeDealBrowser />
											</TourGuideProvider>
										</ReduxProvider>
									</NavigationContainer>
								</GestureHandlerRootView>
							</OnboardProvider>
						</I18nextProvider>
					</AppContextProvider>
				</PaperProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	);
};

export default App;
