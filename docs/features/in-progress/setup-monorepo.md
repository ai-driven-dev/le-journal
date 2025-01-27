# 🚀 Instructions : Monorepo NestJS/Remix

## 🎯 Objectifs de l'instruction

1. Mettre en place un monorepo avec Turborepo pour gérer plusieurs applications
2. Configurer NestJS pour le backend en utilisant une architecture hexagonale
3. Configurer Remix pour le frontend avec une architecture modulaire

## 📚 Documentation à suivre

### Structure obligatoire des dossiers

```
le-journal/ # répertoire racine du projet (courant)
├── apps/
│   ├── backend/    # Application NestJS
│   └── frontend/   # Application Remix
├── packages/       # Code partagé entre applications
```

## 🏗️ Installation Monorepo complet

### 1. Configuration Turborepo

- **Documentation**: [Turborepo](https://turbo.build/repo/docs/crafting-your-repository)
- **Objectif** : Initialiser la structure monorepo
- **Étapes** :

1. Initialiser pnpm
2. Installer Turborepo avec PNPM sans template
3. Vérifier la création des dossiers
4. Vérifier la configuration de Turborepo (package.json, turbo.js>on, .gitignore)

### 2. Installation Backend (NestJS)

- **Documentation**: [NestJS](https://docs.nestjs.com/first-steps)
- **Objectif** : Créer l'application NestJS
- **Étapes** :

 1. Se placer dans le dossier apps
 2. Créer l'application NestJS
 3. Règles :
    1. TypeScript
    2. Pas de template
    3. Pas de .git

Exemple de commande possible :

```bash
cd apps
pnpm exec @nestjs/cli new backend --language typescript --packageManager pnpm --strict --skipGit
```

### 3. Installation Frontend (Remix)

- **Documentation**:
  - [Remix](https://remix.run/docs/en/main/start/quickstart)
  - [React Router](https://reactrouter.com/start/framework/installation)
  - [React Route Template](https://github.com/remix-run/react-router-templates/tree/main/default)
- **Objectif** : Créer l'application Remix
- **Étapes** :

 1. Créer l'application Remix
 2. Règles
    1. Ne pas utiliser de template
    2. Supprimer le .git généré

Exemple de commande possible :

```bash
npx create-react-router@latest --template remix-run/react-router-templates/default frontend --package-manager pnpm --no-install --no-git-init
```

## ✅ Vérification

1. pnpm install doit installer les dépendances dans apps/* également
2. Lancer pnpm run dev doit lancer les deux applications
   1. Backend accessible sur <http://localhost:3000>
   2. Frontend accessible sur <http://localhost:8080>
3. Lancer pnpm run build doit générer les packages
