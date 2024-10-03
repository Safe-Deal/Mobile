import { View } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";
import React from "react";
import { useTranslation } from "@hooks/useTranslation";
import ImageCarousel from "./ImagesCarousel/ImageCarousel";
import s from "../Reviews/ReviewsInsights.style";

export const ReviewsImages = () => {
	const { allProductsState } = useSelector((state: any) => state.Products);
	const { reviews, product } = allProductsState;
	const { t } = useTranslation(["analyze"]);

	const imagesArray = reviews?.reviewsImages || product?.images || [];
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
