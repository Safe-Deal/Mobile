interface IProductState {
	product: unknown;
	rules: unknown;
}

interface IJoinSafeDealStoreState {
	allProductsState: IProductState;
}

export type { IJoinSafeDealStoreState, IProductState };
