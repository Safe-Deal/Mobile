import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setProductAnalysis } from "../../../Redux/JoinSafeDeal/JoinSafeDeal";
import { fetchProductAnalysis } from "../service/ProductAnalysisService";

export const useProductAnalysis = () => {
	const queryClient = useQueryClient();
	const [mutationState, setMutationState] = useState<any>(null);
	const dispatch = useDispatch();
	const mutation = useMutation(fetchProductAnalysis, {
		onSuccess: (data) => {
			if (data) {
				dispatch(setProductAnalysis(data));
			}
		},
		mutationKey: "fetchProductAnalysis",
	});

	useEffect(() => {
		const unsubscribe = queryClient.getMutationCache().subscribe(() => {
			const fetchProductAnalysisMutation = queryClient
				.getMutationCache()
				.findAll({ mutationKey: "fetchProductAnalysis" })[0];
			setMutationState(fetchProductAnalysisMutation?.state);
		});

		return () => unsubscribe();
	}, []);

	const { error, status } = mutationState ?? {
		status: "idle", // Default status when there's no mutation state
		error: null,
		data: null,
	};

	const isLoading = status === "loading";
	const isError = status === "error";
	const isSuccess = status === "success";

	const resetMutation = () => {
		setMutationState(null); // Reset the local mutation state
	};

	const sendRequest = async (url) => {
		// Reset the cache for the specific query and then send request
		queryClient.getMutationCache().clear();
		queryClient.invalidateQueries("fetchProductAnalysis");
		await mutation.mutateAsync(url);
	};

	return {
		sendRequest: sendRequest,
		isLoading,
		isError,
		isSuccess,
		error,
		reset: resetMutation,
	};
};
