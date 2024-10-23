import { useQuery, useMutation } from "react-query";
import { detectProductURL } from "../service/ProductMetadataService";
import { useProductAnalysis } from "@services/ProductAnalysis";

export const useProductMetadata = (currentUrl) => {
	const { sendRequest } = useProductAnalysis();
	const { data: metaData, isLoading } = useQuery(["fetchMetaData", currentUrl], {
		enabled: !!currentUrl && detectProductURL(currentUrl),
		retry: 1,
		onSuccess: (data) => {
			if (data) {
				sendRequest(currentUrl);
			}
		},
	});

	return {
		metaData,
		isLoading,
	};
};
