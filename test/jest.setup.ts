import { mockAsyncStorage } from "./__mocks__/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

console.log("jest.setup.ts mocked AsyncStorage");
