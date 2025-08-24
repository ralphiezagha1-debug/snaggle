import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";

/** Flat config for React + TS (modern). CI is blocking. */
export default [
  // Ignore non-source folders
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".github/**",
      "public/**",
      "functions/lib/**",
      "_backup_ui_*/**",
      "**/_backup_ui_*/**"
    ],
  },

  // Base JS + TS + React recommended
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,

  // Project rules
  {
    plugins: {
      "react-refresh": reactRefresh,
    },
    settings: { react: { version: "detect" } },
    rules: {
      // Modern React: no need to import React in scope for JSX
      "react/react-in-jsx-scope": "off",

      // TS projects don’t use prop-types
      "react/prop-types": "off",

      // Keep refresh rule ON (must export components only from component files)
      "react-refresh/only-export-components": "error",

      // Enforce unused vars, but allow a leading underscore for intentional unused
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],

      // Keep these strict (you can tune later)
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",

      // Optional: this rule is noisy in content-heavy JSX; enable when ready
      "react/no-unescaped-entities": "off"
    }
  }
];
