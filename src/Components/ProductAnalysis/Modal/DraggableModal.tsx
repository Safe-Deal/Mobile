import React, { ReactNode, useEffect, useRef } from "react";
import { View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { TabTypes, isIos } from "../../../Shared/Constants";
import { height, width } from "../../../Theme/Theme";

type DraggableModalProps = {
	onClose: () => void;
	isModalVisible: boolean;
	children: React.ReactNode;
	style?: object;
	selectedTab: TabTypes;
};

const DraggableModal = ({ selectedTab, onClose, isModalVisible, children }: DraggableModalProps): ReactNode => {
	const actionSheetRef = useRef<ActionSheetRef>(null);

	useEffect(() => {
		if (isModalVisible) {
			actionSheetRef.current?.show();
		} else {
			actionSheetRef.current?.hide();
		}
	}, [isModalVisible]);

	return (
		isModalVisible && (
			<ActionSheet
				useBottomSafeAreaPadding={true}
				drawUnderStatusBar={true}
				ref={actionSheetRef}
				// snapPoints={[90, 100]}
				closeOnPressBack={true}
				closeOnTouchBackdrop={true}
				gestureEnabled={(selectedTab !== TabTypes.ANALYZE__VIDEOS && !isIos) || isIos}
				containerStyle={{
					height: height(70),
					// backgroundColor: "red",
				}}
				indicatorStyle={{ marginTop: -height(10), width: width(21) }}
				onClose={() => {
					onClose();
				}}
			>
				{(!isIos && selectedTab === TabTypes.ANALYZE__VIDEOS) || selectedTab === TabTypes.ANALYZE__AI_INSIGHTS ? (
					<View style={{ height: 1000 }}>{children}</View>
				) : (
					<>{children}</>
				)}
			</ActionSheet>
		)
	);
};

export default DraggableModal;
