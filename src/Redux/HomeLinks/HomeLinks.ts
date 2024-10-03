import { IHomeLinksStoreState } from "./HomeLinks.interface";
import { createSlice } from "@reduxjs/toolkit";
import { defaultLink } from "../../Shared/Constants";

const initialState: IHomeLinksStoreState = {
	homeLinks: defaultLink,
	modalVisible: false,
};

export const HomeLinksSlice = createSlice({
	name: "HomeLinks",
	initialState,
	reducers: {
		addLink: (state, action) => {
			state.homeLinks = [...state.homeLinks, action.payload];
		},
		deleteLink: (state, action) => {
			const currentItemTextSelected = action.payload?.text;
			state.homeLinks = state.homeLinks.filter((link) => link.text !== currentItemTextSelected);
		},
		updateModalVisibility: (state, action) => {
			state.modalVisible = action.payload;
		},
	},
});

export const { addLink, deleteLink, updateModalVisibility } = HomeLinksSlice.actions;

export default HomeLinksSlice.reducer;
