import React, { ReactElement } from "react";
import { ScrollView } from "react-native";
import { ReviewsInsights } from "./Components/Reviews/ReviewsInsights";
import s from "./ProductAnalysis.styles";
import { ReviewsImages } from "./Components/CustomerImages/ReviewsImages";
import { ProductRulesListAndPrice } from "./Components/RulesAndPrice/ProductRulesListAndPrice";
import { TabTypes } from "../../Shared/Constants";
import ReviewsVideos from "./Components/Video/ReviewsVideos";

interface SDAnalyzerProps {
	selectedTab: TabTypes;
}

export const ProductInsights = ({ selectedTab }: SDAnalyzerProps): ReactElement => {
	return (
		<ScrollView style={s.product_analysis__container} showsVerticalScrollIndicator={false}>
			{selectedTab === TabTypes.ANALYZE__PRODUCT_INSIGHTS && <ProductRulesListAndPrice />}
			{selectedTab === TabTypes.ANALYZE__AI_INSIGHTS && <ReviewsInsights />}
			{selectedTab === TabTypes.ANALYZE__IMAGES && <ReviewsImages />}
			{selectedTab === TabTypes.ANALYZE__VIDEOS && <ReviewsVideos />}
		</ScrollView>
	);
};
