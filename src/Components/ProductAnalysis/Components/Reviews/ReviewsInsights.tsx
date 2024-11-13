import { useTranslation } from "@hooks/useTranslation";
import { useProductAnalysis } from "@services/ProductAnalysis";
import { useAppStore } from "@services/States/Webview/StateWebview";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-actions-sheet";
import { ActivityIndicator, List, Text } from "react-native-paper";
import { useProductsStore } from "../../../../Services/States/Products/StateProducts";
import Theme from "../../../../Theme/Theme";
import { logError } from "../../../../Utils/Analytics";
import s from "./ReviewsInsights.style";

export const ReviewsInsights = (): React.ReactElement => {
	const { activeUrl } = useAppStore();
	const { isLoading: loading, error } = useProductAnalysis(activeUrl);
	const { allProductsState } = useProductsStore();
	const { t } = useTranslation();

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}

	if (error) {
		logError("ReviewsInsights", error);
		return <Text>{t("An error has occurred")}</Text>;
	}

	if (!allProductsState?.reviews?.reviewsSummary || allProductsState?.reviews?.reviewsSummary?.length === 0) {
		return (
			<View style={s.reviews_summary__no_reviews}>
				<Text style={s.reviews_summary__no_reviews__text} variant="titleMedium">
					{t("analyze:no-ai-insights")}
				</Text>
			</View>
		);
	}

	return (
		<ScrollView style={s.reviews_summary} contentContainerStyle={{ flexGrow: 1 }}>
			{allProductsState?.reviews.reviewsSummary.map((review, sectionIndex: number) => {
				if (!review.reviews || review.reviews.length === 0) {
					return null;
				}
				return (
					<List.Section title={review.section} key={sectionIndex} titleStyle={s.reviews_summary__list}>
						{review.reviews.map((item: string, index: number) => {
							const iconColor =
								sectionIndex === 0 ? Theme.doneGreen : sectionIndex === 1 ? Theme.negativeColor : Theme.americanGray;
							return (
								<View key={index} style={s.reviews_summary__list__item}>
									<List.Icon color={iconColor} icon="circle-medium" />
									<Text style={s.reviews_summary__list__item__text}>{item}</Text>
								</View>
							);
						})}
					</List.Section>
				);
			})}
		</ScrollView>
	);
};
