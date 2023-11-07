module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/__tests__/jest.setup.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif)$":
      "<rootDir>/node_modules/react-native/Libraries/Image/RelativeImageStub",
  },
  testMatch: ["**/__tests__/**/*-(spec|test).(js|tsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [
    "<rootDir>/android",
    "<rootDir>/ios",
    "<rootDir>/node_modules",
    "<rootDir>/__tests__/jest.setup.js",
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|axios)'
  ],
  modulePathIgnorePatterns: ["node_modules", "mock", 'axios', '@expo/vector-icons'],
  collectCoverage: false,
};
