import Modal from "react-native-modal";
import s from "./CustomModal.styles";
import { Pressable, View } from "react-native";
import { ReactElement } from "react";

type CustomModalProps = {
	onClose: () => void;
	isModalVisible: boolean;
	children: ReactElement;
	style?: object;
};

const CustomModal = ({ onClose, isModalVisible, children, style }: CustomModalProps): ReactElement => {
	return (
		<Modal style={[s.custom_modal, style]} onBackdropPress={onClose} isVisible={isModalVisible}>
			<Pressable style={s.custom_modal__overlay}>
				<View />
			</Pressable>
			{children}
		</Modal>
	);
};

export default CustomModal;
