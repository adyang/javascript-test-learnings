module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  projects: [
    {
      displayName: "unit-test",
      testPathIgnorePatterns: ["/node_modules/", "integration.test.js"]
    },
    {
      displayName: "integration-test",
      testMatch: ["**/?+(*.)integration.test.js"],
      globalSetup: "./shop/integration-test/setup-databases.js"
    }
  ]
};
