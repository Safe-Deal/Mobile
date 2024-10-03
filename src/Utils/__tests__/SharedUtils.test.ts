import { extractDomain, extractLastUrlFromString, getProductInfo } from "../SharedUtils";

describe("extractDomain function", () => {
	it("should extract the domain from a URL with www and https", () => {
		const url = "https://www.example.com";
		const result = extractDomain(url);
		expect(result).toEqual("example.com");
	});

	it("should extract the domain from a URL with http and www", () => {
		const url = "http://www.example.com";
		const result = extractDomain(url);
		expect(result).toEqual("example.com");
	});

	it("should extract the subdomain", () => {
		const url = "http://he.aliexpress.com";
		const result = extractDomain(url);
		expect(result).toEqual("he.aliexpress.com");
	});

	it("should extract the domain even without http", () => {
		const url = "aliexpress.com";
		const result = extractDomain(url);
		expect(result).toEqual("aliexpress.com");
	});

	it("should return undefined when the input is not a valid URL", () => {
		const url = "not a valid url";
		const result = extractDomain(url);
		expect(result).toBeNull();
	});

	it("should return undefined when the input is an empty string", () => {
		const url = "";
		const result = extractDomain(url);
		expect(result).toBeNull();
	});
});

describe("getProductInfo", () => {
	it("should extract product ID from Amazon URL", () => {
		const url = "https://www.amazon.com/dp/B08K2S1G8Z";
		const result = getProductInfo(url);
		expect(result).toEqual({ domain: "amazon.com", productId: "B08K2S1G8Z" });
	});

	it("should extract product ID from Amazon URL with promoted ASIN", () => {
		const url =
			"https://www.amazon.com/gp/aw/d/B0BCPK76VJ/?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=9c3536e4ef074484b47d78c64eb4dd90&hsa_cr_id=0&qid=1717453524&sr=1-1-3c6b3b04-89d4-46ee-857c-1e2f0de6a70e&ref_=sbx_be_s_sparkle_sccm_asin_0_rating&pd_rd_w=fEYAO&content-id=amzn1.sym.4870a952-0dfa-4beb-9d2a-7a52537f019d%3Aamzn1.sym.4870a952-0dfa-4beb-9d2a-7a52537f019d&pf_rd_p=4870a952-0dfa-4beb-9d2a-7a52537f019d&pf_rd_r=2BM6Y3GP25TG3YZY98YM&pd_rd_wg=CjQFS&pd_rd_r=15cdcedf-be36-46dd-8320-12913d643052#customerReviews";
		const result = getProductInfo(url);
		expect(result).toEqual({ domain: "amazon.com", productId: "B0BCPK76VJ" });
	});

	it("should detect not product url", () => {
		const url =
			"https://www.amazon.in/s?i=apparel&bbn=29945467031&rh=n%3A1571271031%2Cn%3A1953602031%2Cn%3A11400137031%2Cn%3A29945467031%2Cp_n_specials_match%3A21618256031%2Cp_85%3A10440599031%2Cp_n_feature_nineteen_browse-bin%3A11301357031&s=apparel&dc&ds=v1%3A%2BhVZPdaILyY6IoUQroogq80u3hsE0%2FFUKKfM3PNzT2c&_encoding=UTF8&content-id=amzn1.sym.74f25a9d-e850-443b-a26a-da459bed7e95&pd_rd_r=7a3385d4-0bef-471f-a772-9fd4da581e83&pd_rd_w=HwEt1&pd_rd_wg=bbTec&pf_rd_p=74f25a9d-e850-443b-a26a-da459bed7e95&pf_rd_r=0MRMBJR42512CQK6TAWZ&qid=1668003576&rnid=11301356031&ref=pd_hp_d_atf_unk";
		const result = getProductInfo(url);
		expect(result).toBeNull();
		const sectionUrl =
			"https://www.amazon.in/gp/browse.html?node=6648217031&ref_=nav_cs_fashion&discounts-widget=%2522%257B%255C%2522state%255C%2522%253A%257B%255C%2522refinementFilters%255C%2522%253A%257B%257D%257D%252C%255C%2522version%255C%2522%253A1%257D%2522";
		const sectionResult = getProductInfo(sectionUrl);
		expect(sectionResult).toBeNull();
	});

	it("should return null for invalid Amazon URL", () => {
		const url = "https://www.amazon.com/some/invalid/url";
		const result = getProductInfo(url);
		expect(result).toBeNull();
	});

	it("should extract product ID from eBay URL", () => {
		const url = "https://www.ebay.com/itm/1234567890";
		const result = getProductInfo(url);
		expect(result).toEqual({ domain: "ebay.com", productId: "1234567890" });
	});

	it("should return null for invalid eBay URL", () => {
		const url = "https://www.ebay.com/some/invalid/url";
		const result = getProductInfo(url);
		expect(result).toBeNull();
	});

	it("should extract product ID from AliExpress URL", () => {
		const url = "https://www.aliexpress.com/item/1234567890.html";
		const result = getProductInfo(url);
		expect(result).toEqual({ domain: "aliexpress.com", productId: "1234567890" });
	});

	it("should return null for invalid AliExpress URL", () => {
		const url = "https://www.aliexpress.com/some/invalid/url";
		const result = getProductInfo(url);
		expect(result).toBeNull();
	});

	it("should return null for unknown domain", () => {
		const url = "https://www.unknown.com/product/12345";
		const result = getProductInfo(url);
		expect(result).toBeNull();
	});

	it("should extract product ID from mobile AliExpress URL", () => {
		const url = "https://m.aliexpress.com/item/1234567890.html";
		const result = getProductInfo(url);
		expect(result).toEqual({ domain: "m.aliexpress.com", productId: "1234567890" });
	});
});

describe("extractLastUrlFromString", () => {
	it("should return the last URL in the string", () => {
		const text = "Here is a link http://example.com and another one https://example.org";
		const result = extractLastUrlFromString(text);
		expect(result).toBe("https://example.org");
	});

	it("should return null if no URL is found", () => {
		const text = "This string has no URLs.";
		const result = extractLastUrlFromString(text);
		expect(result).toBeNull();
	});

	it("should return the last URL even with multiple URLs", () => {
		const text = "First link http://example.com second link http://example.org third link https://example.net";
		const result = extractLastUrlFromString(text);
		expect(result).toBe("https://example.net");
	});

	it("should return the last URL when text ends with URL", () => {
		const text = "Here is the last link https://example.net";
		const result = extractLastUrlFromString(text);
		expect(result).toBe("https://example.net");
	});

	it("should handle Amazon URL", () => {
		const text = "ASICS Women's GT-4000 3 Running Shoes https://a.co/d/5WHersG ";
		const result = extractLastUrlFromString(text);
		expect(result).toBe("https://a.co/d/5WHersG");
	});

	it("should handle eBay URL", () => {
		const text = `Look at this on eBay
 https://www.ebay.com/itm/164917832422?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=qIgfIRsSQoe&sssrc=4429486&ssuid=Y7pzcw4lQFO&var=&widget_ver=artemis&media=EMAIL

Sent from my iPhone`;
		const result = extractLastUrlFromString(text);
		expect(result).toBe(
			"https://www.ebay.com/itm/164917832422?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=qIgfIRsSQoe&sssrc=4429486&ssuid=Y7pzcw4lQFO&var=&widget_ver=artemis&media=EMAIL",
		);
	});

	it("should handle AliExpress URL", () => {
		const text = `Just found this amazing item on AliExpress. Check it out! $14.74 | PCMOS 1PC Wireless Vacuum Cleaner Dual Use for Home and Car 120W High Power Powerful Vacuum Cleaner Black

https://a.aliexpress.com/_mtPnsWS

`;
		const result = extractLastUrlFromString(text);
		expect(result).toBe("https://a.aliexpress.com/_mtPnsWS");
	});

	it("should handle short urls", () => {
		const text =
			"HUAWEI Watch Buds Smartwatch, Headphones and Smartwatch in One, AI & AI Noise Cancelling for Calls, Compatible with Android & iOS, Black EU/UK Global Model International Version https://a.co/d/fMSo28y";
		const result = extractLastUrlFromString(text);
		expect(result).toBe("https://a.co/d/fMSo28y");
	});

	it("should handle short urls with no space", () => {
		const text = "https://a.co/d/fMSo28y";
		const result = extractLastUrlFromString(text);
		expect(result).toBe("https://a.co/d/fMSo28y");
	});

	it("should handle 2 urls", () => {
		const text = "https://a.co/d/2fhGm9W,https://a.co/d/2fhGm9W";
		const result = extractLastUrlFromString(text);
		expect(result).toBe("https://a.co/d/2fhGm9W");
	});
});
