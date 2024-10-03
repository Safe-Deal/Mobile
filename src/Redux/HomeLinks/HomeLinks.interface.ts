interface IHomeLinkState {
	icon: any;
	text: string;
	link: string;
}

interface IHomeLinksStoreState {
	homeLinks: IHomeLinkState[];
	modalVisible: boolean;
}

export type { IHomeLinksStoreState };
