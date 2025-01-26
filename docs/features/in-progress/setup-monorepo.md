# 🚀 Instructions : Monorepo NestJS/Remix

- Les instructions sont à suivre comme un point de références.
- Les exemples sont des exemples, à adapter en fonction des besoins.

## 📑 Table des matières

- [🚀 Instructions : Monorepo NestJS/Remix](#-instructions--monorepo-nestjsremix)
  - [📑 Table des matières](#-table-des-matières)
  - [🎯 Objectifs de l'instruction](#-objectifs-de-linstruction)
  - [Requis](#requis)
  - [📚 Documentation à suivre](#-documentation-à-suivre)
    - [Structure obligatoire des dossiers](#structure-obligatoire-des-dossiers)
  - [🏗️ Installation Monorepo](#️-installation-monorepo)
    - [1. Configuration Turborepo](#1-configuration-turborepo)
    - [2. Installation Backend (NestJS)](#2-installation-backend-nestjs)
    - [3. Installation Frontend (Remix)](#3-installation-frontend-remix)
  - [✅ Vérification](#-vérification)
    - [1. Test des applications](#1-test-des-applications)

## 🎯 Objectifs de l'instruction

- Mettre en place un monorepo avec Turborepo pour gérer plusieurs applications
- Configurer NestJS pour le backend en utilisant une architecture hexagonale
- Configurer Remix pour le frontend avec une architecture modulaire

## Requis

- Node >= 20
- PNPM
- Docker
- Docker Compose

## 📚 Documentation à suivre

### Structure obligatoire des dossiers

```
le-journal/ # répertoire racine du projet (courant)
├── apps/
│   ├── backend/    # Application NestJS
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── frontend/   # Application Remix
│       ├── app/
│       ├── Dockerfile
│       └── package.json
├── packages/       # Code partagé entre applications
└── docker-compose.yml
```

## 🏗️ Installation Monorepo

### 1. Configuration Turborepo

- **Documentation**: [Turborepo](https://turbo.build/repo/docs/crafting-your-repository)
- **Objectif** : Initialiser la structure monorepo
- **Template de référence** : Structure apps/packages fournie plus haut
- **Étapes** :

1. Se placer dans le dossier `le-journal`
2. Initialiser Turborepo avec PNPM, exemple :

  ```bash
  pnpm init
  pnpm add -D turbo
  mkdir apps packages
  ```

3. Vérifier la création des dossiers
4. Vérifier la configuration de Turborepo (package.json, turbo.js>on, .gitignore)

### 2. Installation Backend (NestJS)

- **Documentation**: [NestJS](https://docs.nestjs.com/first-steps)
- **Objectif** : Créer l'application NestJS
- **Template de référence** : Structure backend fournie
- **Étapes** :

 1. Se placer dans le dossier apps
 2. Créer l'application NestJS
 3. Supprimer le .git généré

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
- **Template de référence** : Structure frontend fournie
- **Étapes** :

 1. Rester dans le dossier apps
 2. Créer l'application Remix
 3. Supprimer le .git généré

```bash
npx create-react-router@latest --template remix-run/react-router-templates/default frontend --package-manager pnpm --no-install --no-git-init
```

## ✅ Vérification

### 1. Test des applications

- **Objectif** : Vérifier le fonctionnement
- **Points de vérification** :

1. Lance turborepo en mode dev
2. Backend accessible sur <http://localhost:3000>
3. Frontend accessible sur <http://localhost:8080>
4. Lance turborepo en mode build
