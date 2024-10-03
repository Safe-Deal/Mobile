import { configureStore, Reducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ProductsReducer from "./JoinSafeDeal/JoinSafeDeal";
import HomeLinksReducer from "./HomeLinks/HomeLinks";

const reducers: Reducer = combineReducers({
	Products: ProductsReducer,
	HomeLinks: HomeLinksReducer,
});

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
