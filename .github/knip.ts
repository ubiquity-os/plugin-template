import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["build/index.ts"],
  project: ["src/**/*.ts"],
  ignore: ["src/types/config.ts", "**/__mocks__/**", "**/__fixtures__/**", "dist/*"],
  ignoreExportsUsedInFile: true,
  // eslint can also be safely ignored as per the docs: https://knip.dev/guides/handling-issues#eslint--jest
  ignoreDependencies: ["ts-node"],
  eslint: true,
};

export default config;
