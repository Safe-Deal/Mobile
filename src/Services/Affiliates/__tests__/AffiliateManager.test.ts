import { extractPathUrl } from "../../../Utils/SiteUtils";
import { getProductInfo } from "../../../Utils/SharedUtils";
import {
	AFF_PRODUCT_PAGE,
	shareAffiliateUrl,
	getAffiliateUrl,
	isAffiliateRedirect,
	getUrlFromAffiliateUrl,
	hasAffiliateParams,
} from "../AffiliateManager";
import { fetchAffiliateData } from "../AffiliateData";

describe("affiliateManager no [API]", () => {
	it("returns null when data is empty", async () => {
		const mockData = [];
		const url =
			"https://www.amazon.com/TPSOUM-Fashion-Designed-Calenda-Stainless/dp/B0CG1LH56R/ref=sr_1_2_sspa?crid=1ZUI4M7PTYZQU&th=1";
		expect(await getAffiliateUrl(mockData, url)).toBeNull();
	});

	it("returns null when no affiliate matches the URL", async () => {
		const mockData = [
			{ shown: true, name: "Amazon", domain: "amazon.", target: "[PRODUCT]", shutaf: "[API]" },
			{
				name: "Walmart.",
				domain: "www.walmart.com",
				target: "/",
				shutaf: "https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=",
			},
		];
		const url = "https://www.example.com";
		expect(await getAffiliateUrl(mockData, url)).toBeNull();
	});

	it("returns redirect URL for API affiliate", async () => {
		const mockData = [
			{ shown: true, name: "Amazon", domain: "amazon.", target: "[PRODUCT]", shutaf: "[API]" },
			{
				name: "Walmart.",
				domain: "www.walmart.com",
				target: "/",
				shutaf: "https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=",
			},
		];
		const url = "https://www.amazon.com/TPSOUM-Fashion-Designed-Calenda-Stainless/dp/B0CG1LH56R/ref=sr_1_2_sspa";
		expect(await getAffiliateUrl(mockData, url)).toBe(
			"https://safedeal.best/out?trackingId=mobile&url=https://www.amazon.com/dp/B0CG1LH56R",
		);
	});

	it("returns redirect URL for non-API affiliate", async () => {
		const mockData = [
			{ shown: true, name: "Amazon", domain: "amazon.", target: "[PRODUCT]", shutaf: "[API]" },
			{
				name: "Walmart.",
				domain: "www.walmart.com",
				target: "/",
				shutaf: "https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=",
			},
		];
		const url = "https://www.walmart.com/shop/deals/Newegg-Exclusive?cat_id=3944_1089430_3951_132960";
		expect(await getAffiliateUrl(mockData, url)).toBe(
			`https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=${url}`,
		);
	});

	it("determines if the user is on a product page for the affiliated store", async () => {
		expect(
			getProductInfo(
				extractPathUrl(
					"https://www.amazon.com/TPSOUM-Fashion-Designed-Calenda-Stainless/dp/B0CG1LH56R/ref=sr_1_2_sspa?crid=1ZUI4M7PTYZQU&dib=eyJ2IjoiMSJ9.QtmYg9uvPIA0gKXX6YbInRNb8AOEHDlefGFKhKREtkOB2KkDmc-gG2YnYa7evt6ez5eT4-3t1VPBt0MQYkSXMtnSr9AARMCA6OX_429LmxWHdM8rX1FXk8KBk8RvI109wuM1ZvGxANZL67er1LoPl_YE6FGZnq5_yXpapxHCpdeohKQTXKqT3H3VlD-VIZfse_yELuCl_0SYiHe0SfcT7An8-v7GPSRSua3FW1aWW_-7J3NShvxelbJPkb0ibT2SJDCCfdcnWK8YL1rq7iTFPcuHO_4UKY27kzTY7oYsO7A.zPBX_EAiaFYdvxoaJoks5XeWd6JtrLDMUC-aMK1z1Co&dib_tag=se&keywords=watch&qid=1712034298&sprefix=watcj%2Caps%2C347&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
				),
			),
		).toBeTruthy();

		expect(
			getProductInfo(
				extractPathUrl(
					"https://ultravpn.com/?utm_campaign=upn-aff-brandsite-oth-all--QQQ-awi&subid1=21029_1711517236_e42648e8585deacb9405e71200c07ad6&subid2=632098&subid5=awin&sv1=affiliate&sv_campaign_id=632098",
				),
			),
		).toBeFalsy();
	});

	it("verify the affiliate link in the app", async () => {
		const mockData = [
			{ shown: true, name: "Amazon", domain: "amazon.", target: "[PRODUCT]", shutaf: "[API]" },
			{
				name: "Walmart.",
				domain: "www.walmart.com",
				target: "/",
				shutaf: "https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=",
			},
		];

		const redirectUrl = await getAffiliateUrl(
			mockData,
			"https://www.amazon.com/TPSOUM-Fashion-Designed-Calenda-Stainless/dp/B0CG1LH56R/ref=sr_1_2_sspa?crid=1ZUI4M7PTYZQU&th=1",
		);

		expect(redirectUrl).toContain(
			"https://safedeal.best/out?trackingId=mobile&url=https://www.amazon.com/dp/B0CG1LH56R",
		);
	});

	it("identifies appropriate affiliate data based on the current URL's domain", async () => {
		const mockData = [
			{ shown: true, name: "Amazon", domain: "amazon.", target: "[PRODUCT]", shutaf: "[API]" },
			{
				name: "Walmart.",
				domain: "www.walmart.com",
				target: "/",
				shutaf: "https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=",
			},
		];

		expect(
			await getAffiliateUrl(
				mockData,
				"https://www.amazon.com/TPSOUM-Fashion-Designed-Calenda-Stainless/dp/B0CG1LH56R/ref=sr_1_2_sspa",
			),
		).toEqual("https://safedeal.best/out?trackingId=mobile&url=https://www.amazon.com/dp/B0CG1LH56R");
		expect(
			await getAffiliateUrl(
				mockData,
				"https://www.walmart.com/shop/deals/Newegg-Exclusive?cat_id=3944_1089430_3951_132960",
			),
		).toEqual(
			"https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=https://www.walmart.com/shop/deals/Newegg-Exclusive?cat_id=3944_1089430_3951_132960",
		);
		expect(await getAffiliateUrl(mockData, "https://example.com")).toBeNull();
	});
});

describe("affiliateManager sync methods", () => {
	const mockData = [
		{ domain: "amazon.com", target: AFF_PRODUCT_PAGE, name: "Example API Affiliate", shutaf: "[API]" },
		{
			domain: "testsite.com",
			target: "/",
			name: "Test Site Affiliate",
			shutaf: "http://testsite.com/affiliate?",
		},
	];

	it("returns null for empty data array", async () => {
		expect(await getAffiliateUrl([], "https://amazon.com")).toBeNull();
	});

	it("returns null for a URL that does not match any affiliate domain", async () => {
		expect(await getAffiliateUrl(mockData, "https://unmatchedsite.com")).toBeNull();
	});

	it("activates API affiliate for matching domain and API target", async () => {
		const url = "https://amazon.com/product/B0BCPK76VJ";
		const expected = "https://safedeal.best/out?trackingId=mobile&url=https://www.amazon.com/dp/B0BCPK76VJ"; // Assuming makeAffiliateUrl and extractPathUrl work correctly
		expect(await getAffiliateUrl(mockData, url)).toEqual(expected);
	});

	it("activates non-API affiliate for matching domain and redirect target", async () => {
		const url = "https://testsite.com/product/456";
		const expected = "http://testsite.com/affiliate?https://testsite.com/product/456";
		expect(await getAffiliateUrl(mockData, url)).toEqual(expected);
	});

	it("correctly identifies when no affiliate should be activated", async () => {
		const mockDataNoTarget = [
			{ domain: "example.com", target: "", name: "No Target Affiliate", shutaf: "noAffiliate/" },
		];
		expect(await getAffiliateUrl(mockDataNoTarget, "https://example.com")).toBeNull();
	});
});

describe("makeAffiliateUrl", () => {
	it("shareAffiliateUrl the expected URL for a given site URL", () => {
		const url = "https://www.amazon.com/TPSOUM-Fashion-Designed-Calenda-Stainless/dp/B0CG1LH56R";
		const expected = "https://safedeal.best/out?trackingId=mobile&url=https://www.amazon.com/dp/B0CG1LH56R";
		expect(shareAffiliateUrl(url)).toBe(expected);
	});

	it("isAffiliateRedirect identifies URLs with affiliation endpoint", () => {
		const url = "https://safedeal.best/out?trackingId=mobile&url=https://example.com";
		expect(isAffiliateRedirect(url)).toBe(true);
	});

	it("isAffiliateRedirect identifies URLs with affiliation endpoint", async () => {
		await fetchAffiliateData();
		const url = "https://offer.alibaba.com/cps/a621769c?bm=cps&src=saf";
		expect(isAffiliateRedirect(url)).toBe(true);
	});

	it("isAffiliateRedirect identifies URLs amazon", () => {
		const url = "https://www.amazon.com/TPSOUM-Fashion-Designed-Calenda-Stainless/dp/B0CG1LH56R/ref=sr_1_2_sspa";
		expect(isAffiliateRedirect(url)).toBe(false);
	});

	it("isAffiliateRedirect identifies URLs without affiliation endpoint", async () => {
		const url = "https://example.com";
		expect(isAffiliateRedirect(url)).toBe(false);
	});

	it("getUrlFromAffiliateUrl extracts the original URL from an affiliate URL", () => {
		const url = "https://safedeal.best/out?trackingId=mobile&url=https://example.com";
		expect(getUrlFromAffiliateUrl(url)).toBe("https://example.com");
	});

	it("getUrlFromAffiliateUrl returns null for non-affiliate URLs", () => {
		const url = "https://example.com";
		expect(getUrlFromAffiliateUrl(url)).toBeNull();
	});

	it("getUrlFromAffiliateUrl returns encoded url", () => {
		const url = "https://safedeal.best/out?trackingId=mobile&url=https%3A%2F%2Fexample.com";
		expect(getUrlFromAffiliateUrl(url)).toBe("https://example.com");
	});
});

describe("isAffiliateRedirect", () => {
	const mockData = [
		{ domain: "amazon.", target: "[PRODUCT]", name: "Amazon", shutaf: "[API]" },
		{
			domain: "walmart.com",
			target: "/",
			name: "Walmart",
			shutaf: "https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=",
		},
	];

	it("returns true for URLs with affiliate parameters", () => {
		const url = "https://www.example.com?shutaf=123&trackingId=456";
		expect(isAffiliateRedirect(url)).toBe(false);
		expect(hasAffiliateParams(url)).toBe(true);
	});

	it("returns true for URLs with affiliate domains", () => {
		const url = "https://safedeal.best";
		expect(isAffiliateRedirect(url)).toBe(true);
	});

	it("returns true for URLs with affiliate shutaf", () => {
		const url = "https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=";
		expect(isAffiliateRedirect(url)).toBe(true);
	});

	it("returns true for URLs with affiliate shutaf from mock data", () => {
		const url = "https://goto.walmart.com/c/2670192/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=";
		expect(isAffiliateRedirect(url, mockData)).toBe(true);
	});

	it("returns false for URLs without affiliate parameters, domains, or shutaf", () => {
		const url = "https://www.example.com";
		expect(isAffiliateRedirect(url)).toBe(false);
	});

	it("returns false for URLs without affiliate shutaf from mock data", () => {
		const url = "https://www.example.com";
		expect(isAffiliateRedirect(url, mockData)).toBe(false);
	});
});

describe("hasAffiliateParams", () => {
	it("returns true if the URL contains any affiliate parameters", () => {
		const url = "https://example.com?shutaf=123&trackingId=456";
		expect(hasAffiliateParams(url)).toBe(true);
	});

	it("returns true if the URL contains any affiliate parameters AliExpress", () => {
		const url =
			"https://www.aliexpress.us/item/3256806951972262.html?spm=a2g0n.productlist.0.0.6ec826a6M0qg6d&browser_id=e07de5522c0146d5b000939d2642cc92&aff_platform=msite&m_page_id=lzvrhtbdbecawitb190059d7d323b9afe1b1c8b276&gclid=&pdp_npi=4%40dis%21USD%2119.68%2112.79%21%21%2119.68%2112.79%21%402103273e17180811256666987e0ee1%2112000039536907582%21sea%21US%210%21AB&algo_pvid=a2463ff8-2fa4-42dd-8a70-34aeb6074b7b&search_p4p_id=202406102145252492558582821600011475519_16";
		expect(hasAffiliateParams(url)).toBe(true);
	});

	it("returns true if the URL contains any affiliate parameters Amazon", () => {
		const url =
			"https://www.amazon.com/Verdusa-Womens-Ruched-Spaghetti-Bodycon/dp/B094Y1F7HS/ref=mp_s_a_1_2_sspa?crid=2C6MET10J954X&dib=eyJ2IjoiMSJ9.HvtXdHYVPoYAM2IoGZuPaBvWDdj_JUumu-fZzLsZwrgeRJG0HMVOlkOAbsBdME5DFzUtkCIaiBGy02B933GOSmemkiezNEOgjUh1Mcp1AcwU_yFg6J62ZrpfJhzFCttGzqOvOFMrw3PqRSeWpuwu-1JJ1BYEt7FjNeh73Zn9MVrYbwY83XigfrjAvuo8_0ygoPDlvxXkNlGUPejV406rjK_eREWmVkU7mp0iHA4_Uakz1L_xaCWtMMLXbVxozeeljEw3FM6ORlgrNa1sVb9jHuq8LhzFoQyV6xQEVLC9YK8.poXHB5K9I02fYUuKa5KK6J2nSy8scAtFMrzXRcyPaec&dib_tag=se&keywords=short+dress+for+women&qid=1718081240&sprefix=short+dress%2Caps%2C161&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9waG9uZV9zZWFyY2hfYXRm&psc=1";
		expect(hasAffiliateParams(url)).toBe(true);
	});

	it("returns false if the URL does not contain any affiliate parameters", () => {
		const url = "https://example.com";
		expect(hasAffiliateParams(url)).toBe(false);
	});
});
