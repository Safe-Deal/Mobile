import { ReactElement } from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { Popable } from "react-native-popable";
import { ConclusionTypes } from "../../../../Shared/Constants";
import Theme, { height } from "../../../../Theme/Theme";
import s from "../../ProductAnalysis.styles";
import { PriceChart } from "./PriceChart";
import { useProductsStore } from "../../../../Zustand/JoinSafeDeal/JoinSafeDeal";

export const ProductRulesListAndPrice = (): ReactElement => {
	const { allProductsState } = useProductsStore();

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
		<View style={[s.product_insights__container, { borderColor: borderClr }]}>
			<View style={s.product_insights__list}>
				{allProductsState &&
					allProductsState?.product?.rules.map(
						(item, index: number) =>
							item.i18n && (
								<View style={s.product_insights__list__item} key={index}>
									<Icon
										source="circle-medium"
										color={item.type === "SAFE" ? Theme.primary : Theme.negativeColor}
										size={height(2.8)}
									/>
									<Text key={index} style={s.product_insights__list__text}>
										{item.i18n}
									</Text>
									<Popable
										backgroundColor={Theme.invertedColorBackground}
										content={"" + item.i18nExplanation}
										style={s.product_insights__list__tooltip}
										wrapperStyle={{ flex: 1, display: "flex" }}
										position="left"
									>
										<Icon source="information-outline" size={height(2)} color={Theme.iconColor} />
									</Popable>
								</View>
							),
					)}
			</View>
			<PriceChart />
		</View>
	);
};
