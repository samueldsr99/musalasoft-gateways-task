/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  coverageProvider: "v8",
  modulePathIgnorePatterns: ["./dist/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
};
