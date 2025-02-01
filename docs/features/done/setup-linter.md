# **Instruction: ESLint Configuration for 2025 (with Prettier & Pre-commit)**

## **Rules**

- Examples (including CLI) **must be verified** before execution.
- **Every step MUST be completed and validated** before proceeding.

---

## **Goal**

Configure **ESLint** using the latest practices as of **2025**, ensuring an optimal setup for **React (with MobX), NestJS, TypeScript, Accessibility, and Security**.  
Integrate **Prettier** for code formatting and set up **Husky** and **Commitlint** for maintaining commit standards.

---

### **Global Steps**

1. **Set Up ESLint with Flat Config**: Replace `.eslintrc.js` with `eslint.config.js` for modern configuration.
2. **Integrate Prettier**: Ensure Prettier manages code formatting without conflicts with ESLint.
3. **Apply Best Practices**:
   - **React**: Enforce rules for hooks, MobX integration, performance, and accessibility.
   - **NestJS**: Adhere to Clean Architecture principles.
4. **Enhance Security**: Implement `eslint-plugin-security` to identify potential vulnerabilities.
5. **Enforce Import Order**: Maintain a consistent and logical import structure.
6. **Set Up Commit Hooks**: Use Husky and Commitlint to enforce commit message standards and run linters before commits.

---

## **Guidelines**

### **Requirements**

- **ESLint**: Version 9.0.0 or higher.
- **TypeScript**: Version 5.2 or higher.
- **Node.js**: Ensure compatibility with the latest stable version.
- **Necessary Plugins and Configurations**:
  - `@typescript-eslint/eslint-plugin`
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-jsx-a11y`
  - `eslint-plugin-import`
  - `eslint-plugin-security`
  - `eslint-plugin-mobx`
  - `eslint-plugin-nestjs`
  - `eslint-config-prettier`
  - `prettier`
  - `husky`
  - `commitlint`
  - `@commitlint/cli`
  - `@commitlint/config-conventional`

---

## **Constraints**

### **Disable ESLint Formatting Rules**

- **Reason**: To prevent conflicts, as Prettier will handle all code formatting.
- **Solution**: Utilize `eslint-config-prettier` to turn off ESLint's formatting rules.

### **Project Architecture Adherence**

- **React**: Follow a feature-based structure.
- **NestJS**: Implement Clean Architecture principles.

---

## **Steps**

### **1. Install Dependencies**

- **Goal**: Set up ESLint, Prettier, and related tools.
- **Steps**:

  1. Run the following command to install all necessary packages:

     ```bash
     npm install --save-dev eslint @eslint/js @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-security eslint-plugin-mobx eslint-plugin-nestjs eslint-config-prettier prettier husky commitlint @commitlint/cli @commitlint/config-conventional
     ```

  2. Create the file `eslint.config.js` with the optimal configuration.

- **Expected Output**: All packages are installed and listed in `package.json` under `devDependencies`.

---

### **2. Configure ESLint (`eslint.config.js`)**

- **Goal**: Establish ESLint settings tailored to the project's requirements.
- **Steps**:

  1. Create a file named `eslint.config.js` in the project's root directory.
  2. Populate it with the following configuration:

     ```javascript
     import js from '@eslint/js';
     import tsParser from '@typescript-eslint/parser';
     import tsPlugin from '@typescript-eslint/eslint-plugin';
     import react from 'eslint-plugin-react';
     import reactHooks from 'eslint-plugin-react-hooks';
     import jsxA11y from 'eslint-plugin-jsx-a11y';
     import imp from 'eslint-plugin-import';
     import security from 'eslint-plugin-security';
     import mobx from 'eslint-plugin-mobx';
     import nestjs from 'eslint-plugin-nestjs';
     import prettier from 'eslint-config-prettier';

     export default [
       {
         files: ['**/*.ts', '**/*.tsx'],
         languageOptions: {
           parser: tsParser,
           parserOptions: { project: './tsconfig.json' },
         },
         env: { browser: true, node: true, es2022: true },
         plugins: {
           '@typescript-eslint': tsPlugin,
           react: react,
           'react-hooks': reactHooks,
           'jsx-a11y': jsxA11y,
           import: imp,
           security: security,
           mobx: mobx,
           nestjs: nestjs,
         },
         rules: {
           /* TypeScript Rules */
           '@typescript-eslint/explicit-function-return-type': 'warn',
           '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
           '@typescript-eslint/consistent-type-imports': 'warn',

           /* Import Rules */
           'import/order': ['warn', { 'newlines-between': 'always' }],
           'import/no-default-export': 'warn',
           'import/no-cycle': 'error',

           /* React & Hooks Rules */
           'react-hooks/exhaustive-deps': 'warn',

           /* Performance & MobX */
           'mobx/missing-observer': 'error',
           'mobx/no-anonymous-observer': 'warn',
           'mobx/enforce-actions': 'error',

           /* Accessibility Rules */
           'jsx-a11y/anchor-is-valid': 'warn',
           'jsx-a11y/label-has-associated-control': 'warn',
           'jsx-a11y/no-autofocus': 'warn',
           'jsx-a11y/media-has-caption': 'warn',

           /* Security Rules */
           'security/detect-object-injection': 'warn',
           'security/detect-unsafe-regex': 'error',
           'security/detect-non-literal-fs-filename': 'warn',

           /* NestJS Best Practices */
           'nestjs/use-validation-pipe': 'error',
           'nestjs/no-missing-controller-decorator': 'error',
           'nestjs/no-async-module': 'warn',
         },
         settings: {
           react: {
             version: 'detect',
           },
         },
       },
     ];
     ```

---

### **3. Configure Prettier (`.prettierrc`)**

- **Goal**: Ensure a consistent code format across the project.
- **Steps**:

  1. Create a `.prettierrc` file in the root directory.
  2. Add the following settings:

     ```json
     {
       "semi": false,
       "singleQuote": true,
       "trailingComma": "all",
       "printWidth": 100
     }
     ```

- **Expected Output**: Code formatting adheres to the specified rules.

---

### **4. Set Up Husky & Commitlint**

- **Goal**: Automate commit validation and enforce proper commit messages.
- **Steps**:

  ```bash
  npx husky install
  npx husky add .husky/pre-commit "npx eslint . --fix && npx prettier --write ."
  npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
  ```

  4. Create a `commitlint.config.js` file with:

     ```javascript
     export default {
       extends: ['@commitlint/config-conventional'],
     };
     ```

- **Expected Output**: Commits failing linting or incorrect commit messages will be blocked.

---

## **Verifications**

- **Ensure Prettier is not conflicting with ESLint.**
- **Check that MobX, React, NestJS, and security rules are correctly applied.**
- **Validate that Husky hooks work.**
