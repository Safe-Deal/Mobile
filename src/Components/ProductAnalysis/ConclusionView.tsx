import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { ConclusionTypes, TabTypes } from "../../Shared/Constants";
import Theme, { height } from "../../Theme/Theme";
import { useProductsStore } from "../../Services/States/Products/StateProducts";
import s from "./ConclusionModal.styles";
import { Conclusion } from "./Modal/Conclusion";
import { ProductInsights } from "./ProductAnalysis";

export const ConclusionView = () => {
	const { allProductsState } = useProductsStore();
	const [selectedTab, setSelectedTab] = useState<TabTypes>(TabTypes.ANALYZE__PRODUCT_INSIGHTS);

	const borderClr: string =
		allProductsState?.product?.conclusion === ConclusionTypes.INSUFFICIENT_DATA
			? Theme.americanGray
			: allProductsState?.product?.conclusion === ConclusionTypes.RECOMMENDED
				? Theme.primary
				: allProductsState?.product?.conclusion === ConclusionTypes.NOT_RECOMMENDED
					? Theme.stuckRed
					: allProductsState?.product?.conclusion === ConclusionTypes.DOUBTFUL
						? Theme.warningColor
						: Theme.primary;

	return (
		<View style={s.conclusion__view}>
			<View style={[s.conclusion__header, { borderColor: borderClr, backgroundColor: borderClr }]}>
				<Conclusion
					style={s.conclusion__title}
					conclusion={allProductsState?.product?.conclusion as ConclusionTypes}
					SHIELD_SIZE={height(4.1)}
				/>
			</View>
			<ScrollView style={s.conclusion__top_tabs__container} scrollEnabled={true}>
				<ProductInsights selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			</ScrollView>
		</View>
	);
};

export default ConclusionView;
