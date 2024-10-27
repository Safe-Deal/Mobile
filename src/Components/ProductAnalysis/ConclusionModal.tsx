import React from "react";
import { ScrollView, View } from "react-native";
import { ConclusionTypes, TabTypes } from "../../Shared/Constants";
import Theme, { height } from "../../Theme/Theme";
import { useProductsStore } from "../../Services/States/Products/StateProducts";
import s from "./ConclusionModal.styles";
import { Conclusion } from "./Modal/Conclusion";
import DraggableModal from "./Modal/DraggableModal";
import { ProductInsights } from "./ProductAnalysis";

interface ConclusionModalProps {
	isModalVisible: boolean;
	url: string;
	selectedTab: TabTypes;
	onClose: () => void;
	setSelectedTab: (type: TabTypes) => void;
}

export const ConclusionModal: React.FC<ConclusionModalProps> = ({
	isModalVisible,
	url,
	selectedTab,
	setSelectedTab,
	onClose,
}) => {
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
		<DraggableModal
			selectedTab={selectedTab}
			isModalVisible={isModalVisible}
			style={s.conclusion__modal}
			onClose={onClose}
		>
			<ScrollView style={s.conclusion__container}>
				<View style={[s.conclusion__header, { borderColor: borderClr, backgroundColor: borderClr }]}>
					<Conclusion
						style={s.conclusion__title}
						conclusion={allProductsState?.product?.conclusion as ConclusionTypes}
						SHIELD_SIZE={height(4.1)}
					/>
				</View>
				<View style={s.sheet_list_view}>
					<ProductInsights selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
				</View>
			</ScrollView>
		</DraggableModal>
	);
};

export default ConclusionModal;
