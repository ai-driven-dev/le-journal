# **Instruction: Automatisation du Versioning avec Semantic Release**

## **📌 Objectif**

Mettre en place un système de versioning automatique basé sur **Semantic Versioning (SemVer)** avec **Semantic Release**.

---

## **🔹 Règles Générales**

- **Versioning automatisé** en fonction des commits (`fix`, `feat`, `BREAKING CHANGE`).
- **Aucune gestion manuelle des versions**.
- **Empêcher les erreurs de versioning avant push ou merge**.
- **Documentation claire et reproductible**.

---

## **1️⃣ Installation et Configuration de Semantic Release**

### **Installation des dépendances**

```sh
npm install --save-dev semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/npm
```

### **Configuration de `.releaserc.json`**

📄 **Ajouter ce fichier à la racine du projet :**

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ]
}
```

---

## **2️⃣ Configuration de Commitlint (Enforcement des Conventions de Commit)**

📄 **Modifier `commitlint.config.js` pour imposer SemVer :**

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'feat', 'docs', 'chore', 'refactor', 'test', 'BREAKING CHANGE']],
    'subject-case': [2, 'always', 'sentence-case']
  }
};
```

---

## **3️⃣ Hook Git Local (`pre-push`)**

📄 **Empêcher un push si `semantic-release --dry-run` échoue**

```sh
npx husky add .husky/pre-push "npx semantic-release --dry-run"
npx husky install
```

✅ **Chaque `git push` vérifiera Semantic Release avant d'autoriser l’envoi.**

---

## **4 GitHub Action : Release Automatique après Merge sur `main`**

📄 **Créer `.github/workflows/release.yml` pour exécuter le déploiement automatique**

```yaml
name: Release
on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run Tests
        run: npm test

      - name: Run Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

✅ **Chaque merge sur `main` déclenche automatiquement un release !**

---

## **5 Vérifications et Tests**

### **🛠️ Vérifier la Configuration avant Activation**

```sh
npx semantic-release --dry-run
```

✅ **Cette commande simule le processus sans publier réellement la version.**

### **📌 Checklist de Validation**

✔ Tous les commits respectent `fix:`, `feat:`, `BREAKING CHANGE:` ✅
✔ Dry Run fonctionne localement ✅
✔ Dry Run s’exécute sur GitHub Actions (PRs) ✅
✔ Merge sur `main` déclenche bien une release ✅
✔ Les versions sont correctement générées ✅

---

### **🎯 Plan Validé – Prêt pour Exécution !** 🚀
