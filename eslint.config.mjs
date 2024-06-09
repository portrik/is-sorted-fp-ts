// @ts-expect-error ESlint definitions are not really needed
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// @ts-expect-error ESLint plugin definitions are not needed
import unicorn from 'eslint-plugin-unicorn';
import sonarjs from 'eslint-plugin-sonarjs';
import functional from 'eslint-plugin-functional';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		...unicorn.recommended,
		...sonarjs.configs.recommended,
		...stylistic.configs['recommended-flat'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			functional: functional,
			'@stylistic': stylistic,
		},
		rules: {
			...functional.configs?.['recommended']?.rules,
			...functional.configs?.['stylistic']?.rules,
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/linebreak-style': ['error', 'unix'],
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/array-bracket-spacing': ['error', 'never'],
			'@stylistic/arrow-spacing': 'error',
			'@stylistic/block-spacing': 'error',
			'@stylistic/comma-spacing': ['error', { 'before': false, 'after': true }],
			'@stylistic/computed-property-spacing': ['error', 'never'],
			'@stylistic/function-call-spacing': ['error', 'never'],
			'@stylistic/key-spacing': ['error', { 'beforeColon': false }],
			'@stylistic/no-mixed-spaces-and-tabs': 'error',
			'@stylistic/object-curly-spacing': ['error', 'always']
		},
	},
	{
		files: ['**/*.test.ts'],
		plugins: {
			functional: functional,
		},
		rules: {
			...functional.configs?.['off']?.rules
		}
	}
);
