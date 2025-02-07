## Instruction: GitHub Security Scan Integration

### **Goal**

- Enhance security in PRs by integrating:
  - **OWASP Dependency-Check** for detecting vulnerabilities in dependencies.
  - **CodeQL** for static code analysis.
  - **ESLint Security Rules** for strengthening TypeScript security.

---

### **1. OWASP Dependency-Check Setup**

#### **Modify `.github/workflows/pr-checks.yml` to include OWASP Dependency-Check**

Add the following job inside `jobs:`

```yaml
security-scan:
  name: OWASP Dependency-Check
  runs-on: ubuntu-latest
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Run OWASP Dependency-Check
      uses: dependency-check/Dependency-Check_Action@main
      with:
        project: '${{ github.repository }}'
        path: '.'
        format: 'HTML'
        out: 'dependency-check-report'
        args: '--failOnCVSS 7'
```

This will **block a PR** if vulnerabilities are found.

---

### **2. CodeQL Integration**

#### **Enable CodeQL in GitHub Actions**

Create `.github/workflows/codeql-analysis.yml` with:

```yaml
name: 'CodeQL Analysis'
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 8 * * 1' # Weekly scan

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write
    strategy:
      fail-fast: false
      matrix:
        language: [javascript, typescript]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

This will **scan JavaScript/TypeScript code** for vulnerabilities on every PR.

---

### **3. Add ESLint Security Rules**

#### **Install security rules for ESLint**

Run:

```sh
npm install @rushstack/eslint-plugin-security --save-dev
```

#### **Update `.eslintrc.js` to include security rules**

```js
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@rushstack/eslint-config/profile/node',
  ],
  plugins: ['@typescript-eslint', '@rushstack/security'],
  rules: {
    // Add specific rules if needed
  },
};
```

#### **Modify `package.json` scripts**

```json
"scripts": {
  "lint:security": "eslint --ext .ts . --quiet"
}
```

This ensures **TypeScript security rules are checked locally**.

---

### **4. Verification Checklist**

✅ **OWASP Dependency-Check is triggered on PRs**
✅ **CodeQL scans for vulnerabilities in JS/TS code**
✅ **ESLint security rules are applied locally**

---

### **Final Validation**

- **Is the template correct? (YES/NO)**
