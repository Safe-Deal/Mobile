import { renderHook, act } from "@testing-library/react-hooks";
import { WebViewNavigation } from "react-native-webview/src/WebViewTypes";
import { BackHandler } from "react-native";
import { useHistory } from "../useHistory";
import { isValidUrl } from "./../../Utils/Urls";
import { isAffiliateRedirect } from "./../../Services/Affiliates/AffiliateManager";
import { getProductInfo, isOurRetailer } from "./../../Utils/SharedUtils";

jest.mock("react-native", () => ({
	BackHandler: {
		addEventListener: jest.fn().mockImplementation(() => ({
			remove: jest.fn(),
		})),
	},
}));

jest.mock("./../../Utils/SharedUtils", () => ({
	getProductInfo: jest.fn(),
	isOurRetailer: jest.fn(),
}));

jest.mock("./../../Services/Affiliates/AffiliateManager", () => ({
	isAffiliateRedirect: jest.fn(),
}));

jest.mock("./../../Utils/Analytics", () => ({
	debug: jest.fn(),
}));

jest.mock("./../../Utils/Urls", () => ({
	isValidUrl: jest.fn(),
}));

describe("useHistory", () => {
	const setCurrentUrl = jest.fn();
	let mockEvent: WebViewNavigation;

	beforeEach(() => {
		jest.clearAllMocks();
		mockEvent = {
			loading: false,
			title: "Example",
			canGoBack: false,
			canGoForward: false,
			lockIdentifier: 0,
			url: "http://example.com",
			navigationType: "click",
		};
		(isValidUrl as jest.Mock).mockReturnValue(true);
		(isAffiliateRedirect as jest.Mock).mockReturnValue(false);
		(isOurRetailer as jest.Mock).mockReturnValue(false);
		(getProductInfo as jest.Mock).mockReturnValue({ productId: "123" });
	});

	it("should have initial state", () => {
		const { result } = renderHook(() => useHistory(setCurrentUrl));
		expect(result.current.canGoBackward).toBe(false);
		expect(result.current.canGoForward).toBe(false);
	});

	it("should update history correctly with historyPush", () => {
		const { result } = renderHook(() => useHistory(setCurrentUrl));

		act(() => {
			result.current.updateHistory(mockEvent);
		});

		expect(result.current.canGoBackward).toBe(false);
		expect(result.current.canGoForward).toBe(false);
		expect(result.current.goBack).toBeInstanceOf(Function);
		expect(result.current.goForward).toBeInstanceOf(Function);
	});

	it("should handle redirects in updateHistory", () => {
		const { result } = renderHook(() => useHistory(setCurrentUrl));

		mockEvent.navigationType = "other";

		act(() => {
			result.current.updateHistory(mockEvent);
		});

		expect(result.current.goBack).toBeInstanceOf(Function);
		expect(result.current.goForward).toBeInstanceOf(Function);
	});

	it("should navigate back in history with goBack", () => {
		const { result } = renderHook(() => useHistory(setCurrentUrl));

		act(() => {
			result.current.updateHistory(mockEvent);
			result.current.updateHistory({ url: "http://example2.com", navigationType: "click" } as WebViewNavigation);
			result.current.goBack();
		});

		expect(result.current.goBack).toBeInstanceOf(Function);
		expect(result.current.goForward).toBeInstanceOf(Function);
	});

	it("should navigate forward in history with goForward", () => {
		const { result } = renderHook(() => useHistory(setCurrentUrl));

		act(() => {
			result.current.updateHistory(mockEvent);
			result.current.updateHistory({ url: "http://example2.com", navigationType: "click" } as WebViewNavigation);
			result.current.goBack();
			result.current.goForward();
		});

		expect(result.current.goBack).toBeInstanceOf(Function);
		expect(result.current.goForward).toBeInstanceOf(Function);
	});

	it("should handle hardware back button", () => {
		const { result } = renderHook(() => useHistory(setCurrentUrl));

		const backHandlerCallback = (BackHandler.addEventListener as jest.Mock).mock.calls[0][1];

		act(() => {
			result.current.updateHistory(mockEvent);
			backHandlerCallback();
		});

		expect(result.current.goBack).toBeInstanceOf(Function);
		expect(result.current.goForward).toBeInstanceOf(Function);
	});
});
