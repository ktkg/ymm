import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "<rootDir>/jsdom-extended.js",
  /**
   * @see https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom
   */
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

export default createJestConfig(config);
