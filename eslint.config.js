const js = require("@eslint/js");
const globals = require("globals");

module.exports = [{
  files: ["**/*.js"],
  languageOptions: {
    globals: globals.node,
    sourceType: "commonjs",
  },
  rules: {
    ...js.configs.recommended.rules,
    "no-var": "error",
    "prefer-const": "error",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],

    // Best Practices
    "eqeqeq": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "curly": "error",
    "no-return-assign": "error",

    // ES6+
    "prefer-arrow-callback": "error",
    "prefer-template": "error",
    "object-shorthand": "error",
    "prefer-destructuring": ["error", { "object": true, "array": true }],

    "semi": ["error", "always"],
    "quotes": ["error", "double", { "avoidEscape": true }],
  }
}];
