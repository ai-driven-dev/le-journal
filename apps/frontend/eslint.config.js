import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: ['build/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.config({
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
  }),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'import/no-unresolved': 'error',
    },
  },
  eslintConfigPrettier,
];
