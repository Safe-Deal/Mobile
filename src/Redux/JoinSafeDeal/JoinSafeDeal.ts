import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../Services/GeneralMiddleware";
import { extractDomain, getProductInfo, isValidDomain } from "../../Utils/SharedUtils";
import { IJoinSafeDealStoreState } from "./JoinSafeDeal.interface";
import URL from "../../Services/ServicesUrls";

const EndPoint = URL.END_POINT;
export const fetchProductAnalysis = createAsyncThunk("allProducts", async (url: string, { rejectWithValue }) => {
	const product = getProductInfo(url);

	try {
		if (product && Object.keys(product).length > 0) {
			const response = await get(`${product.domain}/${product.productId}`);

			if (response.success === false) {
				return rejectWithValue({ status: response.success, message: response.error });
			}
			return response;
		} else if (isValidDomain(url)) {
			const response = await get(`${EndPoint.domain}/${extractDomain(url)}`);

			if (response.success === false) {
				return rejectWithValue({ status: response.success, message: response.error });
			}
			return response;
		} else {
			return rejectWithValue({ status: true, message: "Whitelisted URL" });
		}
	} catch (error) {
		if (error) {
			return rejectWithValue({ status: false, message: error });
		}
	}
});

const initialState: IJoinSafeDealStoreState = {
	allProductsState: { product: null, rules: null },
	loading: false,
	error: null,
};

export const ProductsSlice = createSlice({
	name: "Products",
	initialState,
	reducers: {
		resetProductAnalysis: (state, action): void => {
			if (state?.allProductsState?.product === action.payload) {
				state.allProductsState = { product: null, rules: null };
			}
		},
		resetAllProducts: (state): void => {
			state.allProductsState = { product: null, rules: null };
		},
		setLoading: (state, action): void => {
			state.loading = action.payload;
		},
		setProductAnalysis: (state, action): void => {
			state.allProductsState = action.payload;
		},
	},
	extraReducers: (builders): void => {
		builders.addCase(fetchProductAnalysis.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builders.addCase(fetchProductAnalysis.fulfilled, (state, action) => {
			state.loading = false;
			state.allProductsState = action.payload;
			state.error = null;
		});
		builders.addCase(fetchProductAnalysis.rejected, (state, action: any) => {
			state.loading = false;
			state.error = action?.payload?.message || null;
		});
	},
});
export const { resetAllProducts, resetProductAnalysis, setProductAnalysis } = ProductsSlice.actions;

export default ProductsSlice.reducer;
