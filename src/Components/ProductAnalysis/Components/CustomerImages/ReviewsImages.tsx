import { useTranslation } from "@hooks/useTranslation";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useProductsStore } from "../../../../Zustand/JoinSafeDeal/JoinSafeDeal";
import s from "../Reviews/ReviewsInsights.style";
import ImageCarousel from "./ImagesCarousel/ImageCarousel";

export const ReviewsImages = () => {
	const { allProductsState } = useProductsStore();
	const { t } = useTranslation();

	const imagesArray = allProductsState?.reviews?.reviewsImages || allProductsState?.product?.images || [];
	if (imagesArray.length < 1) {
		return (
			<View style={s.reviews_summary__no_reviews}>
				<Text style={s.reviews_summary__no_reviews__text} variant="titleMedium">
					{t("no-images")}
				</Text>
			</View>
		);
	}

	return (
		<View style={s.reviews_images__container}>
			<ImageCarousel images={imagesArray} />
		</View>
	);
};
