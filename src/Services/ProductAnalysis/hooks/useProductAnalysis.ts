import { useQuery, useQueryClient } from "react-query";
import { useProductsStore } from "../../../Zustand/JoinSafeDeal/JoinSafeDeal";
import { fetchProductAnalysis } from "../service/ProductAnalysisService";

// Hook to manage product analysis
export const useProductAnalysis = (url: string | null) => {
	const queryClient = useQueryClient();

	const { setProductAnalysis } = useProductsStore();
	// Function to trigger a fetch for product analysis data
	const sendRequest = (newUrl: string | null) => {
		if (newUrl) {
			queryClient.invalidateQueries(["productAnalysis", newUrl]); // Invalidate the query to trigger refetch
		}
	};

	// Function to access product analysis state (data, isLoading, etc.)
	const { data, error, isLoading, isError, isSuccess } = useQuery(
		["productAnalysis", url],
		() => {
			if (url === null) {
				return;
			}
			return fetchProductAnalysis(url);
		},
		{
			enabled: !!url, // Ensure the query only runs if a URL is provided
			onSuccess: (data) => {
				setProductAnalysis(data);
			},
		},
	);

	return {
		sendRequest,
		isLoading,
		isError,
		isSuccess,
		error,
		data,
		reset: () => queryClient.resetQueries(["productAnalysis", url]), // Reset the query cache if needed
	};
};
