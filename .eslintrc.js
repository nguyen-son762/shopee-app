module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "prettier/prettier": "off",
    "pescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-floating-promises": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
