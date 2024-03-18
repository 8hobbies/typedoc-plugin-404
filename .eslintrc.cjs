module.exports = {
  root: true,
  env: { node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "test-dir", "test-dir-tmp"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "never",
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "_",
      },
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always", // newlines between import groups
        alphabetize: {
          order: "asc", // sort in ascending order.
          caseInsensitive: true,
        },
      },
    ],
    "import/no-unresolved": [
      "error",
      {
        ignore: ["^typedoc$", "^vitest/config$"],
      },
    ],
  },
};
