module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: ["js", "ts"],
    roots: ["<rootDir>/__tests__"],
    testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
    testEnvironment: "node",
    testTimeout: 100000,
    maxConcurrency: 1,
};
