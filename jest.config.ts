import type { Config } from "jest";

const settings = {
	setupFiles: ["<rootDir>/test/jest.setup.ts"],
};

const config: Config = {
	preset: "ts-jest",
	bail: 2,
	automock: true,
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	projects: [
		{
			preset: "jest-expo/ios",
			...settings,
		},
		{
			preset: "jest-expo/android",
			...settings,
		},
	],
};

export default config;
