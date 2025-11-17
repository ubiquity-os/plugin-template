import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/action.ts", "src/worker.ts"],
  project: ["src/", "test/"],
  ignore: ["src/types/config.ts", "**/__mocks__/**", "**/__fixtures__/**"],
  ignoreExportsUsedInFile: true,
  // eslint can also be safely ignored as per the docs: https://knip.dev/guides/handling-issues#eslint--jest
  ignoreDependencies: ["ts-node", "husky"],
  eslint: true,
};

export default config;
