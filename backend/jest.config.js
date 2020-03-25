module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: "/test/.*\\.test\\.(ts|js)$",
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node"
};
