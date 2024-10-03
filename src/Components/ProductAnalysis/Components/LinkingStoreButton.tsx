import * as React from "react";
import { useMemo, useState } from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import { Images } from "../../../Shared/Constants";
import { getAffiliateByApi } from "../../../Services/Affiliates/AffiliateManager";
import { logError } from "../../../Utils/Analytics";
import { isAliExpressSite, isEbaySite } from "../../../Utils/SiteUtils";
import { SpinnerLoader } from "../../Common/Loaders/SpinnerLoader";

interface LinkingStoreButtonProps {
	activeUrl?: string;
}

export const LinkingStoreButton: React.FC<LinkingStoreButtonProps> = ({ activeUrl = "" }) => {
	const [isLoading, setIsLoading] = useState(false);
	const StoreImage = useMemo(() => {
		if (isAliExpressSite(activeUrl)) {
			return { src: Images.aliexpress, height: 44, width: 44 };
		} else if (isEbaySite(activeUrl)) {
			return { src: Images.eBay, height: 44, width: 44 };
		}
		return { src: Images.amazonLogo, height: 60, width: 60 };
	}, [activeUrl]);

	const handlePress = () => {
		setIsLoading(true);
		getAffiliateByApi(activeUrl)
			.then((res) => {
				const url = res || activeUrl;
				Linking.openURL(url).finally(() => setIsLoading(false));
			})
			.catch((err) => {
				Linking.openURL(activeUrl).finally(() => setIsLoading(false));
				logError("Failed to get affiliate URL:", err);
			});
	};

	return (
		<TouchableOpacity onPress={handlePress} disabled={isLoading}>
			<View>
				{isLoading ? (
					<SpinnerLoader />
				) : (
					<Image
						source={StoreImage.src}
						style={{
							height: StoreImage.height,
							width: StoreImage.width,
							resizeMode: "contain",
							alignSelf: "center",
						}}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};
