import tseslint from 'typescript-eslint';
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    ...pluginReactConfig,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    ignores: ["dist", "node_modules", ".next", "out", "*.js", "*.mjs", "src/firebase.js"],
  }
);
