import { jest } from "@jest/globals";

export const mockAsyncStorage = {
	setItem: jest.fn((key, value) => Promise.resolve()),
	getItem: jest.fn((key) => Promise.resolve(null)),
	removeItem: jest.fn((key) => Promise.resolve()),
	clear: jest.fn(() => Promise.resolve()),
};
