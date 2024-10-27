import { create } from "zustand";
import { IHomeLinksStoreState } from "./StateFaivoriteLinks.interface";
import { defaultLink } from "@shared/Constants";

interface HomeLinksStore extends IHomeLinksStoreState {
	addLink: (link: any) => void;
	deleteLink: (link: any) => void;
	updateModalVisibility: (visible: boolean) => void;
}

export const useHomeLinksStore = create<HomeLinksStore>((set) => ({
	homeLinks: defaultLink,
	modalVisible: false,
	addLink: (link) =>
		set((state) => ({
			homeLinks: [...state.homeLinks, link],
		})),
	deleteLink: (link) =>
		set((state) => ({
			homeLinks: state.homeLinks.filter((l) => l.text !== link.text),
		})),
	updateModalVisibility: (visible) => set({ modalVisible: visible }),
}));
