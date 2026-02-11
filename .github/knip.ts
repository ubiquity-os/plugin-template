import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/action.ts"],
  project: ["src/**/*.ts", "tests/**/*.ts"],
  ignore: ["src/types/config.ts", "**/__mocks__/**", "**/__fixtures__/**"],
  ignoreExportsUsedInFile: true,
  ignoreDependencies: ["ts-node"],
  eslint: true,
};

export default config;
