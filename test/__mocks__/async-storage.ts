import { jest } from "@jest/globals";

export const mockAsyncStorage = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setItem: jest.fn((key, value) => Promise.resolve()),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getItem: jest.fn((key) => Promise.resolve(null)),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	removeItem: jest.fn((key) => Promise.resolve()),
	clear: jest.fn(() => Promise.resolve()),
};
