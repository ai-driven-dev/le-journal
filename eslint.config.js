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
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.react-router/**',
      '**/build/**',
      '**/*.d.ts',
      'apps/frontend/app/components/ui/*',
    ],
  },
  // React component configuration
  {
    files: ['**/app/routes/**/*.tsx', '**/app/root.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  // Source files configuration (non-config files)
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
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: [
            './apps/*/tsconfig.json',
            './apps/*/tsconfig.build.json',
            './packages/*/tsconfig.json',
          ],
          alwaysTryTypes: true,
        },
        node: {
          project: [
            './apps/*/tsconfig.json',
            './apps/*/tsconfig.build.json',
            './packages/*/tsconfig.json',
          ],
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
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
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: true,
          allowNullableString: true,
          allowNumber: true,
          allowNullableNumber: true,
          allowNullableObject: true,
        },
      ],
      semi: ['error', 'always'],

      /* Import Rules */
      'import/order': ['warn', { 'newlines-between': 'always' }],
      'import/no-cycle': 'error',
      'import/no-unresolved': 'error',
      'import/no-deprecated': 'warn',

      /* Security Rules */
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',

      /* React Rules */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-script-url': 'error',
      'react/no-danger': 'error',

      /* NestJS Rules */
      'nestjs/use-validation-pipe': 'warn',
    },
  },
];
