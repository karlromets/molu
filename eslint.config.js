import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from "eslint-config-prettier";
import globals from 'globals';

export default [
	js.configs.recommended,
	eslintConfigPrettier,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
];
