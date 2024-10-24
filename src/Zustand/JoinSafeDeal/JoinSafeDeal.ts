import { create } from "zustand";
import { ConclusionTypes } from "@shared/Constants";

// Define the ProductState type
type ProductState = {
	id?: string;
	conclusion?: ConclusionTypes;
	rules: Array<{
		i18n: string;
		i18nExplanation: string;
		type: "SAFE" | "UNSAFE";
	}>;
	product?: {
		conclusion?: ConclusionTypes;
		price?: {
			price: number;
			currency: string;
		};
	};
	reviews?: {
		reviewsSummary?: Array<{
			section: string;
			reviews: string[];
		}>;
	};
	images?: string[];
	title?: string;
	description?: string;
	domain?: string;
	source?: string;
	category?: string;
	createdAt?: string;
	updatedAt?: string;
};

interface ProductsStoreState {
	allProductsState: {
		product: ProductState | null;
		rules: ProductState["rules"] | null;
	};
	setProductAnalysis: (analysis: ProductsStoreState["allProductsState"]) => void;
	resetProductAnalysis: (product: ProductState) => void;
	resetAllProducts: () => void;
}

export const useProductsStore = create<ProductsStoreState>((set) => ({
	allProductsState: { product: null, rules: null },
	setProductAnalysis: (analysis: ProductsStoreState["allProductsState"]) => set({ allProductsState: analysis }),
	resetProductAnalysis: (product: ProductState) =>
		set((state) => {
			if (state.allProductsState.product === product) {
				return { allProductsState: { product: null, rules: null } };
			}
			return state;
		}),
	resetAllProducts: () => set({ allProductsState: { product: null, rules: null } }),
}));
