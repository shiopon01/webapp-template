module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: "/test/.*\\.test\\.(ts|js)$",
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node"
};
