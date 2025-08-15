import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

/**
 * Flat config. We explicitly ignore backup folders and build outputs.
 */
export default [
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
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    settings: { react: { version: "detect" } },
    rules: {
      // Keep CI happy; we can tighten later
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react-refresh/only-export-components": "off"
    }
  }
];
