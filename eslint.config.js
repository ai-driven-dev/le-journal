import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import imp from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import nestjs from 'eslint-plugin-nestjs'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import security from 'eslint-plugin-security'
import globals from 'globals'

export default [
  // Ignores globaux
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.react-router/**',
      '**/build/**',
      '**/*.d.ts',
    ],
  },
  // Configuration pour les composants React
  {
    files: ['**/app/routes/**/*.tsx', '**/app/root.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  // Configuration pour les fichiers source (non-configuration)
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.test.ts', '**/*.test.tsx', '**/prisma/*.ts'],
    ignores: [
      '**/vite.config.ts',
      '**/tailwind.config.ts',
      '**/react-router.config.ts',
      '**/*.config.ts',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          './apps/*/tsconfig.json',
          './apps/*/tsconfig.build.json',
          './packages/*/tsconfig.json',
        ],
        tsconfigRootDir: '.',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: imp,
      security,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      nestjs,
    },
    rules: {
      /* TypeScript Rules */
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      semi: ['error', 'always'],

      /* Import Rules */
      'import/order': ['warn', { 'newlines-between': 'always' }],
      'import/no-cycle': 'error',

      /* Security Rules */
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',

      /* React Rules */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      /* NestJS Rules */
      'nestjs/use-validation-pipe': 'warn',
    },
  },
];
