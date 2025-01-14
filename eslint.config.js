import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginSvelte from "eslint-plugin-svelte";
import svelteConfig from "./svelte.config.js";
import svelteParser from "svelte-eslint-parser";
import tsEslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser"
import globals from "globals";

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginSvelte.configs["flat/recommended"],
  eslintConfigPrettier,
  ...eslintPluginSvelte.configs["flat/prettier"],
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        extraFileExtensions: [".svelte"],
        tsConfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node, ...globals.browser },
    }
  },
  {
    files: ["**/*.svelte", "*.svelte"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.node, ...globals.browser },
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        svelteConfig,
      },
    },
  },
  {
    ignores: ["**/build", "**/.svelte-kit", "**/node_modules"],
  },
];
