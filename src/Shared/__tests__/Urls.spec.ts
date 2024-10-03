import { Urls } from "../Urls";

describe("Urls constant", () => {
	it("should have correctly formatted URL patterns", () => {
		// This is an example; adjust according to what "correctly formatted" means for your application
		expect(Urls.ALI_EXPRESS_CHECKOUT_URL).toContain("order/confirm_order");
		expect(Urls.ALI_EXPRESS_DOMAIN_URL).toContain("aliexpress.com");
		expect(Urls.ALI_EXPRESS_WHOLESALE_PATH_URL).toContain(
			"/wholesale|/af|/popular|/premium|/category|/popular|/premium",
		);
		expect(Urls.ALI_EXPRESS_PRODUCT_PATH_URL).toContain("/item/");
		expect(Urls.ALI_EXPRESS_STORE_PATH_URL).toContain("/store/");

		expect(Urls.AMAZON_WHOLESALE_PATH_URL).toContain("/s|/b");
		expect(Urls.AMAZON_ITEM_URL_STRINGS).toContain("/dp/|/gp/|/product/");

		expect(Urls.EBAY_PRODUCT_PATH_URL).toContain("/itm|/i/");
	});
});
