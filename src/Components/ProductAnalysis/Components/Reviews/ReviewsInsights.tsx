import { useTranslation } from "@hooks/useTranslation";
import { useProductAnalysis } from "@services/ProductAnalysis";
import { screenHeight, screenWidth } from "@theme/Theme";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-actions-sheet";
import { ActivityIndicator, List, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import Theme from "../../../../Theme/Theme";
import { logError } from "../../../../Utils/Analytics";
import s from "./ReviewsInsights.style";

export const ReviewsInsights = (): React.ReactElement => {
	const { isLoading: loading, error } = useProductAnalysis();
	const { allProductsState } = useSelector((state: any) => state.Products);
	const { reviews } = allProductsState;
	const { t } = useTranslation(["stores", "analyze", "global"]);

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}

	if (error) {
		logError("ReviewsInsights", error);
		return <Text>{t("An error has occurred")}</Text>;
	}

	if (!reviews?.reviewsSummary || reviews?.reviewsSummary?.length === 0) {
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
			{reviews.reviewsSummary.map((review, sectionIndex: number) => {
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
