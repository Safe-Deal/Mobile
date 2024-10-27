import { create } from "zustand";
import { ConclusionTypes } from "@shared/Constants";

type ReviewState = {
	reviewsSummary?: Array<{
		section: string;
		reviews: string[];
	}>;
	reviewsImages?: any[];
	createdAt?: string;
	lang?: string;
	product_id?: string;
	store?: string;
	updatedAt?: string;
};

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
		price?: any;
	};
	reviews?: ReviewState;
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
		reviews?: ReviewState | null;
	};
	setProductAnalysis: (analysis: ProductsStoreState["allProductsState"]) => void;
	resetAllProducts: () => void;
}

export const useProductsStore = create<ProductsStoreState>((set) => ({
	allProductsState: { product: null, rules: null },
	setProductAnalysis: (analysis: ProductsStoreState["allProductsState"]) => set({ allProductsState: analysis }),
	resetAllProducts: () => set({ allProductsState: { product: null, rules: null } }),
}));
