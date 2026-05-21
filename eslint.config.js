import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
                ecmaVersion: 'latest'
            }
        },

        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "args": "after-used",
                    "argsIgnorePattern": "^_"
                }
            ]
        }
    }
];