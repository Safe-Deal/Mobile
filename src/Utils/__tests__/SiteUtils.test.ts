import { extractPathUrl, getAliExpressProductIDFromURL, isItemDetails, replaceAll } from "../SiteUtils";

describe("SiteUtil", () => {
	describe("extractPathUrl", () => {
		it("should extractPathUrl correctly", () => {
			const expected = extractPathUrl(
				"https://www.aliexpress.com/item/1005006452882733.html?spm=a2g0n.productlist.0.0",
			);
			expect(expected).toBe("https://www.aliexpress.com/item/1005006452882733.html");
		});

		it("should extractPathUrl correctly when empty property", () => {
			const expected = extractPathUrl();
			expect(expected).toBe("");
		});
	});

	describe("getAliExpressProductIDFromURL", () => {
		it("should get ali express product id", () => {
			const expected = getAliExpressProductIDFromURL(
				"https://www.aliexpress.com/item/1005006452882733.html?spm=a2g0n.productlist.0.0",
			);
			expect(expected).toBe("1005006452882733");
		});
		it("should get ali express product id", () => {
			const expected = getAliExpressProductIDFromURL("");
			expect(expected).toBe(null);
		});
	});

	describe("isItemDetails", () => {
		it("should return true for ali express item details", () => {
			const expected = isItemDetails("https://www.aliexpress.com/item/1005006452882733.html?spm=a2g0n.productlist.0.0");
			expect(expected).toBe(true);
		});

		it("should return false for ali express item details", () => {
			const expected = isItemDetails("https://www.aliexpress.com/w/wholesale-watch.html?spm=a2g0o.best.search.0");
			expect(expected).toBe(false);
		});

		it("should return true for amazon item details", () => {
			const expected = isItemDetails(
				"https://www.amazon.com/Smart-Watch-Men-Fitness-Tracker/dp/B0C7QXKGVQ/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.bMgz4_pKGXCNJlIhfFdqTy-R37_KvO_TrKYlj2Fgra8TdxUiCk1dSQ0v6PcieaGeR7JE3U1clGL7fdJ-Yp5qq6MisNgWgRGvgsxy7BKCa6vZVkAnHrnqwFZqlCtMKeR20jRb7Q9NLDfPALa61vE2kCK1TuHRnh8bdYOBWnh71q2niKEHzPez4hRuPYrhC-G9YUgalE0HuLUp8ehUZ5pa6hzugMLi_WC0hZ2Y1XAW6KUAgPkG3VqxaKqy5IQh1cq5hfPMneRrBKUO8Dj5yNoQbDiiPQL_4vOZ-Lt9wFG9skM.isJXlWSwqz4fQaFLjcXBsAvXvGVJUkMsXUWjvnXcvhg&dib_tag=se&keywords=watch&qid=1711723179&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
			);
			expect(expected).toBe(true);

			const expected2 = isItemDetails("https://www.amazon.com/gp/aw/d/B0786VV153/ref=sspa_mw_detail_0?ie=UTF8&psc=1");
			expect(expected2).toBe(true);
		});

		it("should return false for amazon item details", () => {
			const expected = isItemDetails("https://www.amazon.com/s?k=watch&ref=nb_sb_noss_2");
			expect(expected).toBe(false);
		});

		it("should return true for ebay item details", () => {
			const expected = isItemDetails(
				"https://www.ebay.com/itm/264538277211?epid=5031971584&itmmeta=01HT5AH90VHB7A443PJB6813M1&hash=item3d97b5c55b:g:esEAAOSwafdd06PW&itmprp=enc%3AAQAJAAAA4EYJfzi8F6%2Ft1BQWT7ttK96rWen8m2H7LY3uKzIHpmbdmbSKBXVDGh4ds1WTQjgv99gg9Iuf0GFxkKfguYjUSz0%2B6cbIYPrNUKVFwK54ly7D%2Fu4dIvEVs7TceOtDYAnVmn8pmzE5mwsFIEcjp%2FmatiACj1gR2qRbx5Da7D5yJ66zcugyhBimCqg%2F21K3yufMN3J0qRiNJznqE%2BOdiL2i6N3%2BF%2B6VvB6kot7rrYcvwIADv8G%2BJSExAk657HKgCSkb7AJ3bfriGjcntsSpGYSuO%2F9xxnTYMp7ive8d2OBrNhv7%7Ctkp%3ABFBM5pDFqtFj",
			);
			expect(expected).toBe(true);
		});

		it("should return false for ebay item details", () => {
			const expected = isItemDetails(
				"https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=watch&_sacat=0",
			);
			expect(expected).toBe(false);
		});
	});

	describe("replaceAll", () => {
		it("should replace all", () => {
			const expected = replaceAll("abc", "abc", "d");
			expect(expected).toBe("d");
		});
	});
});
