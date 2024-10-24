import React, { ReactElement, useMemo } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ConclusionTypes } from "../../../../Shared/Constants";
import Theme, { height, hexToRgb, screenWidth } from "../../../../Theme/Theme";
import { calculateMonthlyAverageOneYearBack, formatDate } from "../../../../Utils/SharedUtils";
import { useProductsStore } from "../../../../Zustand/JoinSafeDeal/JoinSafeDeal";
import s from "../../ProductAnalysis.styles";

export const PriceChart = (): ReactElement | null => {
	const { allProductsState } = useProductsStore();
	const { product } = allProductsState || {};
	const { conclusion, price } = product?.product || {};

	if (!product || !price?.price) {
		return null;
	}

	const borderClr = useMemo(() => {
		const colorMap = {
			[ConclusionTypes.INSUFFICIENT_DATA]: Theme.americanGray,
			[ConclusionTypes.RECOMMENDED]: Theme.primary,
			[ConclusionTypes.NOT_RECOMMENDED]: Theme.stuckRed,
			[ConclusionTypes.DOUBTFUL]: Theme.warningColor,
		};

		return colorMap[conclusion] || Theme.primary;
	}, [conclusion]);

	const calculateChartColor = (opacity: number): string => {
		const color = hexToRgb(borderClr);
		return color ? `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})` : "";
	};

	const { labels, data } = useMemo(() => {
		const weeklyData = calculateMonthlyAverageOneYearBack(price?.price)
			.sort((a, b) => (a.weekStart < b.weekStart ? 1 : -1))
			.slice(0, 6)
			.reverse();

		return {
			labels: weeklyData.map((d) => formatDate(d.weekStart.split("T")[0])),
			data: weeklyData.map((d) => d.averagePrice),
		};
	}, [allProductsState]);

	return (
		<View style={s.product_insights__chart__container}>
			{!data.includes(NaN) && (
				<LineChart
					data={{
						labels,
						datasets: [
							{
								data,
								color: (opacity = 1) => `rgba(0, 166, 96, ${1})`,
							},
						],
					}}
					width={screenWidth()}
					height={height(40)}
					yAxisSuffix={price.currency}
					chartConfig={{
						backgroundColor: Theme.primaryBackgroundColor,
						backgroundGradientFrom: Theme.primaryBackgroundColor,
						backgroundGradientTo: Theme.primaryBackgroundColor,
						decimalPlaces: 2,
						color: calculateChartColor,
						labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						propsForDots: { r: "0" },
						propsForBackgroundLines: { strokeWidth: 1, strokeDasharray: "0", stroke: "#F2F4F7" },
					}}
					bezier
					withInnerLines={true}
					withDots={false}
					withVerticalLines={false}
				/>
			)}
		</View>
	);
};
