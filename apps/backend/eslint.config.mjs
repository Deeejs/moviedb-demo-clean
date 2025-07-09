import { nodeConfig } from "@movie-app/eslint-config/node";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ['eslint.config.mjs'],
  },
  ...nodeConfig,
];