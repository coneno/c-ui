import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		plugins: {
			react,
		},
		rules: {
			"react/react-in-jsx-scope": "off",
		},
	}
);
