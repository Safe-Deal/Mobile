import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setProductAnalysis } from "../../../Redux/JoinSafeDeal/JoinSafeDeal";
import { fetchProductAnalysis, ProductAnalysisResponse, MutationError } from "../service/ProductAnalysisService";

// Hook to manage product analysis
export const useProductAnalysis = (url: string | null) => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();

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
				dispatch(setProductAnalysis(data)); // Dispatch to Redux store
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
