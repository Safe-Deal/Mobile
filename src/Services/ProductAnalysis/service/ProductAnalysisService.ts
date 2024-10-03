import URL from "../../ServicesUrls";
import { get } from "../../GeneralMiddleware";
import { extractDomain, getProductInfo, isValidDomain } from "../../../Utils/SharedUtils";
import { debug } from "../../../Utils/Analytics";

export interface ProductAnalysisResponse {
	success: boolean;
	error?: string;
	key: string;
}

export interface MutationError {
	status: boolean;
	message: string;
}

export const fetchProductAnalysis = async (url: string): Promise<ProductAnalysisResponse | MutationError> => {
	const product = getProductInfo(url);
	const EndPoint = URL.END_POINT;

	try {
		let response;
		if (product && Object.keys(product).length > 0) {
			response = await get(`${product.domain}/${product.productId}`);
		} else if (isValidDomain(url)) {
			response = await get(`${EndPoint.domain}/${extractDomain(url)}`);
		} else {
			throw new Error("Whitelisted URL");
		}

		return response;
	} catch (error) {
		debug("Error fetching product analysis data:", error);
		return { status: false, message: "Error fetching product analysis data" };
	}
};
