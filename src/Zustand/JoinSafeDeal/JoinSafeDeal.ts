import { create } from "zustand";
import { IJoinSafeDealStoreState } from "./JoinSafeDeal.interface";

interface ProductsStore extends IJoinSafeDealStoreState {
	setProductAnalysis: (analysis: any) => void;
	resetProductAnalysis: (product: any) => void;
	resetAllProducts: () => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
	allProductsState: { product: null, rules: null },
	setProductAnalysis: (analysis) => set({ allProductsState: analysis }),
	resetProductAnalysis: (product) =>
		set((state) => {
			if (state.allProductsState.product === product) {
				return { allProductsState: { product: null, rules: null } };
			}
			return state;
		}),
	resetAllProducts: () => set({ allProductsState: { product: null, rules: null } }),
}));
