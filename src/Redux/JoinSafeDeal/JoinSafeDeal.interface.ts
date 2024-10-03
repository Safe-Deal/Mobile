interface IProductState {
	product: unknown;
	rules: unknown;
}

interface IJoinSafeDealStoreState {
	allProductsState: IProductState | null;
	loading: boolean;
	error: string | null;
}

export type { IJoinSafeDealStoreState, IProductState };
