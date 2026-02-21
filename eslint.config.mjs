// @ts-check
import tseslint, { parser } from 'typescript-eslint';
import expectType from "eslint-plugin-expect-type/configs/recommended";

export const sharedOpts = tseslint.config(
	tseslint.configs.base,
	expectType,
	// global ignore
	{ ignores: ["dist/*", "eslint.config.*"], },
);

export default tseslint.config(
	...sharedOpts,
	{ files: ['src/**/*.ts'], },
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			parserOptions: {
				parser: parser,
				project: "./tsconfig.json",
			},
		},
	},
)
