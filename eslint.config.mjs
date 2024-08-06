import configPrettier from "eslint-config-prettier";
import globals from "globals";
import pluginImport from "eslint-plugin-import";
import pluginJs from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  { ignores: [".next/*"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  configPrettier,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "@next/next": pluginNext,
      import: pluginImport,
    },
    rules: {
      ...pluginReact.configs["jsx-runtime"].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      ...pluginImport.configs.recommended.rules,
      "react/self-closing-comp": "error",
      "react/jsx-handler-names": "error",
      "import/order": ["error", { "newlines-between": "always" }],
      "import/newline-after-import": "error",
      "arrow-body-style": ["error", "as-needed"],
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
];
