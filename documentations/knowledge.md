---
date: 2025-02-17 06:42:29
---

# Project Specifications "Knowledge Base"

This project specifications will help you understand the project architecture and features.

It might not be update to date, always refer to code as source of truth.

> Important: Some specifications are in french, and might not be implemented yet in the codebase.

## Description du projet

Le projet consiste à développer un SaaS de veille automatisée qui permet de centraliser les newsletters reçues puis de les trier par pertinence avec un système de scoring.

Ainsi, un utilisateur peut suivre plusieurs newsletters et avoir uniquement les newsletters les plus pertinentes affichées dans un tableau de bord.

### Objectifs

1. **Automatisation complète** : Une configuration unique, réduisant les efforts à un minimum.
2. **Gain de temps significatif** : En moyenne, **20 à 30 minutes économisées par jour**, soit environ **3 heures par semaine** récupérées.
3. **Expérience utilisateur "Wow"** : Dès l’identification, l’utilisateur configure rapidement ses newsletters, obtient un récapitulatif en fin de semaine, et bénéficie d’une interface simple et efficace.
4. **Ciblage initial sur les développeurs** : Un point de départ stratégique avec une extension possible à d’autres publics professionnels à l’avenir.

## Features principales

### Utilisateurs de l'application

1. **Utilisateur** :
   - Authentification via Google OAuth 2.0.
   - Création d’un label et d’un dossier par défaut via l’API Gmail.
   - Configuration rapide avec un stepper pour ajouter des newsletters (alias et tutoriel visuel).
   - Mise à jour automatique des données utilisateur dans le tableau de bord avec récupération et traitement des newsletters.
   - Menu utilisateur avec options de déconnexion, révocation de compte Google, et gestion des paiements (accès au compte Stripe).
2. **Administrateur** :
   - Accès à un tableau de bord pour gérer les utilisateurs.
   - Suppression des utilisateurs et de toutes leurs données associées.

### User-Stories principales

#### Utilisateurs finaux

1. **Authentification via Google** :
   - En tant qu’utilisateur, je veux m’inscrire rapidement via Google Authentification pour commencer à utiliser l’application sans effort.
   - En tant qu’utilisateur, je veux pouvoir me déconnecter facilement depuis le header.
   - En tant qu’utilisateur, je veux pouvoir supprimer mon compte et toutes mes données depuis le header, en conformité avec le RGPD.
2. **Configuration et ajout de newsletters (Stepper)** :
   - En tant qu’utilisateur, je veux être guidé pas à pas après mon inscription pour configurer mon compte :
     - Création automatique d’un projet par défaut.
     - Attribution d’une adresse email alias dédiée pour centraliser mes newsletters.
     - Tutoriel visuel (gif ou explications claires) pour utiliser cette adresse alias et l’ajouter sur les pages d’inscription des newsletters.
   - En tant qu’utilisateur, je veux pouvoir passer facilement à l’étape suivante après avoir complété chaque partie de la configuration.
3. **Gestion des newsletters (Dashboard)** :
   - En tant qu’utilisateur, je veux voir toutes les newsletters que j’ai reçues organisées dans un tableau de bord avec les colonnes suivantes :
     - **Date de réception** : Indique quand l’email a été reçu.
     - **Sujet** : Affiche le sujet de l’email.
     - **Récapitulatif** : Contenu très bref de l’email.
     - **Statut** : Trois options : Non lu, Lu, ou Processé (par le système).
     - **Bouton de visualisation** : Ouvre l’email complet.
   - En tant qu’utilisateur, je veux que les newsletters pertinentes soient automatiquement analysées et triées dans une section dédiée à la curation :
     - Titre, description, et lien vers une actualité mise en avant.
   - En tant qu’utilisateur, je veux que le système identifie automatiquement les emails de confirmation et les valide à ma place (fonctionnalité clé du MVP).
4. **Personnalisation des contenus extraits** :
   - En tant qu’utilisateur, je veux disposer d’un champ de texte limité pour spécifier les informations que je veux extraire des newsletters.
   - En tant qu’utilisateur, je veux que ce champ soit sécurisé contre les tentatives de prompt injection.
   - En tant qu’utilisateur, je veux voir un avertissement clair (pop-in) avant de sauvegarder mes paramètres, expliquant les règles d’utilisation et les conséquences en cas de mauvais usage.

#### Administrateurs

1. **Gestion des utilisateurs et des newsletters** :
   - En tant qu’administrateur, je veux voir tous les utilisateurs inscrits avec leurs données associées (nombre de newsletters, paramètres enregistrés, etc.).
   - En tant qu’administrateur, je veux pouvoir supprimer un utilisateur et toutes ses données associées.

### Implémentation technique

#### 🔒 Authentification & Sécurité

- **OAuth 2.0 avec Google** via Remix Auth pour la connexion utilisateur
- **Transmission du token OAuth vers NestJS** pour stockage sécurisé
- **Sessions stockées en cookies HTTPOnly et sécurisées par Redis**
- **JWT généré par NestJS** pour sécuriser les requêtes API entre le front et le back

## Initial Scope

### Version 0 (MVP)

**Fonctionnalités :**

1. **Inscription et Onboarding :**
   - Google OAuth 2.0.
   - Création labels/filtres Gmail.
   - Stepper configuration (alias, tutoriel).
2. **Tableau de bord :**
   - Newsletters reçues :
     - Date, sujet, récapitulatif, statut, bouton HTML.
     - Liste actualités (Curation IA) :
       - Titre, description, URL, score pertinence.
       - Vérification doublons, fusion si nécessaire.
   - Liste newsletters :
     - Indicateur validation, affichage grisé si non traitée.
   - Filtre contenu (texte simple).
3. **Paiement :**
   - Limite 2 newsletters gratuites.
   - Upgrade : pop-in bénéfices, Stripe.
4. **Header :**
   - Lien dashboard, infos utilisateur, menu (déconnexion, suppression, mise à jour).
5. **Landing Page :**
   - Bénéfices, visuel dashboard, CTA inscription.
   - Footer légal.
6. **Automatisation :**
   - Cron nocturne emails.
   - Validation auto confirmations.
   - Alerte Discord en cas d'erreurs répétées.
7. **Personnalisation :**
   - Champs extraction contenus spécifiques.
8. **Sécurité/RGPD :**
   - Suppression données, gestion tokens, réduction scopes.

## Choix initial des technologies

### Main technologies

- Node 22
- TypeScript

### Paradigms

- Clean Architecture → Organize the system into clear layers (application, domain, infrastructure). Maintain modularity to ensure scalability, use-case based!
- Feature-Driven Development (FDD) → Categorize and structure features efficiently, ensuring that they remain self-contained and manageable.
- Domain-Driven Design (DDD) → Focus on business-driven architecture using Entities, Aggregates, Value Objects, Repositories, and Services to enforce domain consistency.
- Behavior-Driven Development (BDD) → When working on user stories, test files, or Gherkin scenarios, focus on real-world user behavior to drive system design.
- SOLID Principles → Maintain single responsibility, modularity, and decoupling to ensure long-term maintainability and flexibility.

### CI

- Github Actions
- Github
- Renovate
- Semantic Release
- CodeQL
- OWASP Dependency-Check

### Infrastructure

- Docker
- Docker Compose

### Monorepo

- Turbo
- pnpm
- prettier
- eslint
- husky
- commitlint

### Database

- PostgreSQL
- Prisma (with migrations)
- Meilisearch
- Redis

### Backend

- NestJS
- Jest
- Swagger
- Rest API with use-case based architecture
- Winston (logging user actions)

### Authentication

- Google OAuth 2.0
- JWT

### Security

- Rate limiting (@nestjs/throttler) - "/auth/callback"
- Prompt injection protection (to defined)

### Automation

- CronJob
- BullMQ

### LLM

- OpenAI GPT-4o with JSON output

### Others

- ReSend (email)
- Stripe (payments)

### Frontend

- React (with RSC)
- React Router v7
- Remix (Remix Loaders)
- Vite
- MobX 6+
- Vitest
- Shadcn
- Tailwind

### Shared packages

- "shared-types" to share API types between backend API and frontend loaders

## Conventional Commit guide

<https://github.com/BryanLomerio/conventional-commit-cheatsheet>

Each commit message follows this structure:

- **type**: Describes the change (e.g., `feat`, `fix`, `chore`)
- **scope**: Optional. Refers to the area of the project being affected (e.g., `api`, `frontend`)
- **description**: A short description of the change.

---

### 📋 Types of Commit

1. **feat**: A new feature for the user or system  
   Example: `feat(auth): add Google login feature`

2. **fix**: A bug fix for the user or system  
   Example: `fix(button): resolve issue with button hover state`

3. **chore**: Routine tasks like maintenance or updating dependencies  
   Example: `chore(deps): update react to version 17.0.2`

4. **docs**: Documentation updates  
   Example: `docs(readme): update installation instructions`

5. **style**: Changes related to code style (e.g., formatting, missing semi-colons)  
   Example: `style(button): fix button alignment in CSS`

6. **refactor**: Code change that neither fixes a bug nor adds a feature  
   Example: `refactor(auth): simplify login form validation logic`

7. **test**: Adding or updating tests  
   Example: `test(auth): add unit tests for login function`

8. **build**: Changes that affect the build system or external dependencies  
   Example: `build(webpack): add webpack config for production build`

9. **ci**: Continuous integration-related changes  
   Example: `ci(gitlab): update CI config for deployment pipeline`

10. **perf**: Code changes that improve performance
    Example: `perf(api): optimize database queries for faster responses`

11. **env**: Changes related to environment setup or configuration
    Example: `env(docker): update Dockerfile for staging environment`

12. **sec**: Security fixes or improvements
    Example: `sec(auth): add encryption for user passwords`

13. **config**: Changes to configuration files
    Example: `config: update .eslint rules for stricter code checks`

14. **api**: Updates to API contracts or integrations
    Example: `api(user): add new endpoint for user profile updates`

### Additional Commit Types

**revert**: Reverts a previous commit

Example: revert(auth): rollback Google login feature

**merge**: Indicates a merge commit

Example: merge: branch 'feature/auth' into 'main'

**deps**: Dependency-specific updates

Example: deps: bump axios from 0.21.1 to 0.24.0

**design**: UI or UX improvements

Example: design(button): update hover effect

## Semantic Versioning

### Versions

- **MAJOR** (2.0.0) : Incompatible API changes
- **MINOR** (1.1.0) : Backwards-compatible new features
- **PATCH** (1.0.1) : Backwards-compatible bug fixes

### 🌳 Branch Structure

```bash
main (production)
  ├── feature/auth-google
  ├── fix/session-timeout
  └── docs/api-reference
```

### 📖 Commit Conventions

#### Commit Types

- `feat:` - New feature (MINOR)

  ```bash
  feat: add Google authentication
  ```

- `fix:` - Bug fix (PATCH)

  ```bash
  fix: resolve session timeout issue
  ```

- `docs:` - Documentation only

  ```bash
  docs: update API documentation
  ```

- `refactor:` - Code refactoring

  ```bash
  refactor: optimize session management
  ```

- `test:` - Adding or modifying tests

  ```bash
  test: add authentication tests
  ```

- `chore:` - Maintenance

  ```bash
  chore: update dependencies
  ```

### Breaking Changes

For major changes, add "BREAKING CHANGE" in the commit body:

```bash
feat: complete authentication system overhaul

BREAKING CHANGE: new user database structure
```

### 🔄 Development Workflow

1. **Create a Branch**

   ```bash
   git checkout -b feature/auth-google
   ```

2. **Make Meaningful Commits**

   ```bash
   git commit -m "feat: add Google authentication"
   git commit -m "test: add OAuth integration tests"
   git commit -m "fix: correct token validation"
   ```

3. **Pull Request**

   - Do NOT squash commits
   - Keep detailed history
   - Use standard merge commit

4. **Automatic Release**
   - Versions are created automatically
   - CHANGELOG is generated from commits
   - Git tags are created

### 📋 Example Generated CHANGELOG

```markdown
# [2.0.0](https://github.com/user/repo/compare/v1.0.0...v2.0.0) (2025-01-29)

### Features

- add Google authentication (#123)
- add session management (#124)

### Bug Fixes

- fix token validation (#125)

### BREAKING CHANGES

- new user database structure
```

### ✅ Pull Request Checklist

- [ ] Commits follow conventions
- [ ] Each commit is atomic and meaningful
- [ ] Tests are passing
- [ ] Documentation is up to date
- [ ] No commit squashing

### 🤖 Automatic Version Bumps

| Commit Type | Message Example                                | Version Bump  |
| ----------- | ---------------------------------------------- | ------------- |
| fix         | `fix: resolve bug`                             | PATCH (1.0.1) |
| feat        | `feat: new feature`                            | MINOR (1.1.0) |
| BREAKING    | `feat: new api BREAKING CHANGE: new structure` | MAJOR (2.0.0) |

### 📌 Important Notes

1. **Commit Messages**

   - Be descriptive but concise
   - Use present tense ("add feature" not "added feature")
   - Reference issues when relevant (#123)

2. **Branch Names**

   - Use feature/, fix/, docs/ prefixes
   - Use kebab-case
   - Be descriptive

3. **Version Control**
   - Never rewrite published history
   - Keep commits atomic
   - Document breaking changes clearly

## Frontend URLs

- **Kebab-case** → URLs lisibles et optimisées (`/dashboard/:user-slug/:project-slug`).
- **Path parameters** → Pour les identifiants essentiels (`user-slug`, `project-slug`).
- **Query parameters** → Pour la pagination et les filtres (`?page=2&limit=20`).

### 🌍 Public (Accessible sans connexion)

- `/` → **Landing Page** _(Présentation du service, inscription rapide)_
- `/onboarding/` → Inscription de l’utilisateur sur la plateforme.
  - `/onboarding/start` → Page d’accueil de l’onboarding (Bienvenue + Connexion Google).
  - `/onboarding/permissions` → Demande des autorisations Gmail via OAuth.
  - `/onboarding/setup` → Génération de l’alias email + Création du projet + Configuration automatique de Gmail (label + filtre).
  - `/onboarding/finish` → Résumé des configurations (alias email affiché + bouton d’accès au Dashboard).
- `/legal` → **Mentions légales**
- `/auth/google/callback` → **Callback Google OAuth** _(Stockage des tokens après connexion)_

### 🔒 Privé (Accessible après connexion)

- `/dashboard/:userSlug/:projectSlug` → **Dashboard utilisateur + projet**
- `/settings/:userSlug` → **Paramètres utilisateur**

### ⚙️ Admin (Réservé aux administrateurs)

- `/admin/:userSlug` → **Gestion de l’utilisateur spécifique**

## Backend URLs

- API sur un sous-domaine : "api.domain.com"

### 🔑 3. Sécurisation des Permissions API

- **Guards NestJS** utilisés pour gérer les accès API.
- **3 niveaux d’accès :**
  1. **Utilisateur** → Accès à ses propres données uniquement.
  2. **Admin** → Peut gérer les utilisateurs.
  3. **Public** → Accès limité aux routes publiques.

## Additional Files

> ⚠️ **IMPORTANT**: These files must be taken very seriously as they represent the latest up-to-date versions of our codebase. You MUST rely on these versions and their content imperatively.

### package.json

```json
{
  "name": "le-journal",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@8.14.1",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "document": "zsh ./documentations/knowledge.sh",
    "build": "turbo run build",
    "dev": "turbo run dev",
    "dev:docker": "docker-compose up --build -d --remove-orphans",
    "beautify": "pnpm run format:fix && pnpm run lint:fix",
    "lint": "eslint \"**/*.{ts,tsx}\"",
    "lint:fix": "eslint \"**/*.{ts,tsx}\" --fix --fix-type problem,suggestion,layout,directive",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "format:fix": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "update:deps": "pnpm up -r --latest && pnpm install && pnpm run check && pnpm outdated -r ",
    "prepare": "husky && husky install",
    "check": "pnpm run dev:docker && pnpm run lint && pnpm run format && pnpm build && pnpm typecheck",
    "renovate": "dotenv -- renovate --dry-run",
    "clean": "cd packages/shared-types && pnpm clean && pnpm build"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.7.1",
    "@commitlint/config-conventional": "^19.7.1",
    "@nestjs/cli": "^11.0.2",
    "@rushstack/eslint-plugin-security": "^0.8.3",
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/npm": "^12.0.1",
    "@typescript-eslint/eslint-plugin": "^8.23.0",
    "@typescript-eslint/parser": "^8.23.0",
    "dotenv-cli": "^8.0.0",
    "eslint": "^9.19.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-import-resolver-typescript": "^3.7.0",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-mobx": "^0.0.13",
    "eslint-plugin-nestjs": "^1.2.3",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-security": "^3.0.1",
    "globals": "^15.14.0",
    "husky": "^9.1.7",
    "prettier": "^3.4.2",
    "renovate": "^39.160.0",
    "semantic-release": "^24.2.1",
    "turbo": "^2.4.0"
  }
}
```

### apps/frontend/package.json

```json
{
  "name": "frontend",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "scripts": {
    "build": "remix vite:build",
    "dev": "remix vite:dev --port=3000",
    "start": "remix-serve ./build/server/index.js",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage",
    "test:coverage:watch": "vitest --coverage"
  },
  "dependencies": {
    "@le-journal/shared-types": "workspace:*",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-hover-card": "^1.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "@remix-run/node": "^2.15.3",
    "@remix-run/react": "^2.15.3",
    "@remix-run/serve": "^2.15.3",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "eslint-plugin-mobx": "^0.0.13",
    "isbot": "^4.1.0",
    "lucide-react": "^0.475.0",
    "mobx": "^6.13.6",
    "mobx-react-lite": "^4.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "reflect-metadata": "^0.2.2",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2"
  },
  "devDependencies": {
    "@remix-run/dev": "^2.15.3",
    "@remix-run/testing": "^2.15.3",
    "@testing-library/react": "^16.2.0",
    "@types/react": "^18.2.20",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.7.4",
    "@typescript-eslint/parser": "^6.7.4",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.38.0",
    "eslint-import-resolver-typescript": "^3.6.1",
    "eslint-plugin-import": "^2.28.1",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^4.6.0",
    "happy-dom": "^17.0.0",
    "postcss": "^8.4.38",
    "shadcn": "^2.3.0",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.1.6",
    "vite": "^5.1.0",
    "vite-tsconfig-paths": "^4.2.1",
    "vitest": "^3.0.5"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### apps/backend/package.json

```json
{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --debug --watch",
    "start:debug": "nest start --debug --watch --preserveWatchOutput --inspect-brk=0.0.0.0:9229",
    "start:prod": "node dist/main",
    "dev": "nest start --watch",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "dotenv -e .env.test -- jest --config jest.config.ts --testPathIgnorePatterns=\"\\.integration\\.spec\\.ts$\"",
    "test:watch": "jest --config jest.config.ts --watch --coverage --testPathIgnorePatterns=\"\\.integration\\.spec\\.ts$\"",
    "test:cov": "jest --config jest.config.ts --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json --coverage",
    "test:ci": "dotenv -e .env.test -- prisma migrate reset --force && jest --config jest.config.ts --coverage --runInBand",
    "typecheck": "tsc --noEmit",
    "prisma": "prisma generate && prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "prisma:migrate": "prisma migrate dev && prisma migrate deploy && prisma generate",
    "prisma:reset": "dotenv -e .env -- prisma migrate reset --skip-seed --force",
    "seed": "pnpm run prisma:reset && pnpm run build && ts-node src/main-cli.ts -- seed"
  },
  "dependencies": {
    "@le-journal/shared-types": "workspace:*",
    "@nestjs/common": "^11.0.7",
    "@nestjs/core": "^11.0.7",
    "@nestjs/jwt": "^11.0.0",
    "@nestjs/mapped-types": "^2.1.0",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "^11.0.7",
    "@nestjs/swagger": "^11.0.3",
    "@nestjs/throttler": "^6.4.0",
    "@types/cookie-parser": "^1.4.8",
    "@types/passport-google-oauth20": "^2.0.16",
    "@types/passport-jwt": "^4.0.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "cookie-parser": "^1.4.7",
    "googleapis": "^144.0.0",
    "nest-commander": "^3.16.0",
    "nest-winston": "^1.10.2",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "winston": "^3.17.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@eslint/js": "^9.19.0",
    "@nestjs/cache-manager": "^3.0.0",
    "@nestjs/cli": "^11.0.2",
    "@nestjs/config": "^4.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.7",
    "@prisma/client": "^6.3.1",
    "@swc/cli": "^0.6.0",
    "@swc/core": "^1.10.14",
    "@swc/jest": "^0.2.37",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.13.1",
    "@types/supertest": "^6.0.2",
    "cache-manager": "^6.4.0",
    "eslint": "^9.19.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.3",
    "globals": "^15.14.0",
    "ioredis": "^5.4.2",
    "jest": "^29.7.0",
    "meilisearch": "^0.48.2",
    "prettier": "^3.4.2",
    "prisma": "^6.3.1",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.3",
    "typescript-eslint": "^8.23.0"
  }
}
```

### apps/backend/prisma/schema.prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum SubscriptionPlan {
  FREE
  PREMIUM
  ENTERPRISE

  @@map("subscription_plan")
}

enum SubscriptionStatus {
  ACTIVE
  IN_PROGRESS
  PENDING
  FAILED

  @@map("subscription_status")
}

enum EmailStatus {
  RECEIVED
  PROCESSED
  FAILED

  @@map("email_status")
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED

  @@map("payment_status")
}

enum PaymentMethod {
  CREDIT_CARD
  PAYPAL
  BANK_TRANSFER

  @@map("payment_method")
}

enum UserRole {
  ADMIN
  PREMIUM
  REGULAR

  @@map("user_role")
}

model User {
  id         String   @id @default(uuid())
  email      String   @unique
  name       String
  role       UserRole @default(REGULAR) @map("role")
  avatar     String?

  google_id  String  @unique @map("google_id")
  google_scopes String[] @map("google_scopes") @default([])
  google_refresh_token String   @map("google_refresh_token")
  google_refresh_token_iv String @map("google_refresh_token_iv")

  created_at DateTime @default(now()) @map("created_at")
  updated_at DateTime @updatedAt @map("updated_at")

  onboarding_started_at DateTime? @map("onboarding_started_at")
  onboarding_completed_at DateTime? @map("onboarding_completed_at")

  // Relations
  projects     Project[]
  transactions Transaction[]

  @@map("users")
  @@index([email])
  @@index([google_id])
}

model Project {
  id                 String   @id @default(uuid())
  user_id           String
  project_number    Int
  name              String
  slug              String
  newsletter_alias  String   @unique @map("newsletter_alias")
  prompt_instruction String   @default("") @db.Text @map("prompt_instruction")
  last_prompt_update DateTime? @map("last_prompt_update")
  created_at        DateTime @default(now()) @map("created_at")

  user   User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  newsletters Newsletter[]

  @@unique([user_id, project_number])
  @@unique([user_id, slug])
  @@unique([user_id, name])
  @@map("projects")
  @@index([user_id])
}

model Newsletter {
  id           String   @id @default(uuid())
  project_id  String
  email       String
  subscribed_at DateTime @default(now()) @map("subscribed_at")
  subscription_status SubscriptionStatus @default(ACTIVE) @map("subscription_status")

  project Project @relation(fields: [project_id], references: [id], onDelete: Cascade)
  emails Email[]

  @@map("newsletters")
  @@index([email])
}

model Email {
  id           String      @id @default(uuid())
  newsletter_id String      @map("newsletter_id")
  subject      String
  raw_content  String      @db.Text @map("raw_content")
  received_at  DateTime    @default(now()) @map("received_at")
  status       EmailStatus

  newsletter Newsletter @relation(fields: [newsletter_id], references: [id], onDelete: Cascade)
  articles   Article[]

  @@map("emails")
  @@index([newsletter_id])
  @@index([subject])
}

model Article {
  id               String   @id @default(uuid())
  email_id         String
  title            String
  description      String   @db.Text
  url              String
  relevance_score Float    @map("relevance_score")
  extracted_at     DateTime @default(now()) @map("extracted_at")

  email Email @relation(fields: [email_id], references: [id], onDelete: Cascade)

  @@map("articles")
  @@index([email_id])
}

model Transaction {
  id                String        @id @default(uuid())
  user_id          String?
  stripe_payment_id String        @map("stripe_payment_id")
  amount           Decimal
  currency         String
  status           PaymentStatus
  payment_method   PaymentMethod  @map("payment_method")
  payment_date     DateTime       @default(now()) @map("payment_date")
  invoice_url      String        @map("invoice_url")

  user User? @relation(fields: [user_id], references: [id], onDelete: SetNull)

  @@map("transactions")
  @@index([user_id])
  @@index([stripe_payment_id])
}

```

### .releaserc.json

```json
{
  "branches": ["main"],
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "docs", "scope": "README", "release": "patch" },
          { "type": "refactor", "release": "patch" },
          { "type": "style", "release": "patch" },
          { "scope": "no-release", "release": false }
        ],
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
        }
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
        },
        "writerOpts": {
          "commitsSort": ["subject", "scope"]
        }
      }
    ],
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md",
        "changelogTitle": "# Changelog\n\nAll notable changes to this project will be documented in this file."
      }
    ],
    [
      "@semantic-release/npm",
      {
        "npmPublish": false
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md", "package.json"],
        "message": "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}"
      }
    ],
    [
      "@semantic-release/github",
      {
        "assets": ["CHANGELOG.md"]
      }
    ]
  ]
}
```

### commitlint.config.js

```js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // Changes that affect the build system or external dependencies
        'ci', // Changes to our CI configuration files and scripts
        'docs', // Documentation only changes
        'feat', // A new feature
        'fix', // A bug fix
        'perf', // A code change that improves performance
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'revert', // Reverts a previous commit
        'style', // Changes that do not affect the meaning of the code (white-space, formatting, etc)
        'test', // Adding missing tests or correcting existing tests
        'chore', // Other changes that don't modify src or test files
      ],
    ],
    'subject-case': [0, 'never'],
  },
};
```

### docker-compose.yml

```yml
services:
  postgres:
    image: postgres:16-alpine
    container_name: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: lejournal
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    networks:
      - app-network

  redisinsight:
    image: redis/redisinsight:latest
    container_name: redisinsight
    ports:
      - '5540:5540'
    volumes:
      - redisinsight_data:/db
    depends_on:
      - redis
    networks:
      - app-network

  # For later :)
  # meilisearch:
  #   image: getmeili/meilisearch:latest
  #   environment:
  #     MEILI_MASTER_KEY: masterKey
  #   ports:
  #     - "7700:7700"
  #   volumes:
  #     - meilisearch_data:/meili_data

volumes:
  postgres_data:
  redis_data:
  redisinsight_data:
  # meilisearch_data:

networks:
  app-network:
    driver: bridge
```

### .cursor/rules/rule-backend-controller.mdc

````mdc
---
description: Backend controllers and REST API
globs: apps/backend/**/*.ts
---
- `ValidationPipe` might no be necessary because `main.ts` uses `useGlobalPipes`.
- Input is Domain object, output is Domain object too.
- Call the use-cases which will handle domain logic.
- Use domain mapper from current domain.
- Use Swagger annotations the more you can to be details on API specs.

Example `projects/presentation/project.mapper.ts`:
```typescript
@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {

  constructor(
    private readonly updateProjectPromptUseCase: UpdateProjectPromptUseCase,
    private readonly projectMapper: ProjectMapper,
  ) {}

  @Put('prompt')
  @ApiOperation({ summary: 'Update prompt instructions of a project.' })
  @ApiResponse({ status: 200, type: ProjectUpdate })
  async updateProjectPrompt(
    @Body()
    updateProjectPromptDto: ProjectUpdate,
  ): Promise<ProjectUpdate> {
    const project = await this.updateProjectPromptUseCase.execute(updateProjectPromptDto);

    return this.projectMapper.toDomain(project);
  }
}
```
````

### .cursor/rules/rule-backend-domain.mdc

````mdc
---
description: Backend domain objects or DTOs
globs: apps/backend/**/*.ts
---
- Use Swagger annotations (`APIProperty` at least, propose more if relevant).
- Not ideal, but Domain Objects are used as DTOs to simplify.
- Extends validated type (also with `class-validator`) only with current properties using `PickType`.
- Properties use `!` because no constructor.
- Language in english.
- Use `class-validator` annotations if data needs to be validation backend only.
- Use `@Exclude()` to protect sensitive fields.

Example:
```typescript
import { ProjectType } from '@le-journal/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

const MIN_LENGTH = 10;
const MAX_LENGTH = 200;
const VALIDATION = /^[^<>{}]*$/;

export class ProjectUpdate extends PickType(ProjectType, ['id', 'promptInstruction']) {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: 'Project ID',
  })
  id!: string;

  @ApiProperty({
    description: 'The instruction prompt for the project',
    example: 'Write a blog post about AI and its impact on society',
    minLength: MIN_LENGTH,
    maxLength: MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_LENGTH, {
    message: `Prompt instruction must be at least ${MIN_LENGTH} characters long`,
  })
  @MaxLength(MAX_LENGTH, {
    message: `Prompt instruction must be at most ${MAX_LENGTH} characters long`,
  })
  @Matches(VALIDATION, {
    message: 'Prompt instruction cannot contain HTML tags or special characters like < > { }',
  })
  promptInstruction!: string;
}
```
````

### .cursor/rules/rule-backend-global.mdc

````mdc
---
description: Backend rules
globs: apps/backend/**/*.ts
---
- Libs: NestJS 11, RxJS 7.8, Node 22.
- NestJS good pratices must be checked.
- RxJS must be used at its best.
- Throw exception early with meaning descriptions, names or params.
- Create custom exceptions when domain specific.
- Focus on domain logic.
- Focus on DDD and Clean Architecture.

Example structure `src/modules/projects`:
```text
├── application
│   ├── create-project.use-case.ts
│   ├── get-project.use-case.ts
│   └── update-project-prompt.use-case.ts
├── domain
│   ├── project-create.ts
│   ├── project-update.ts
│   ├── project.repository.interface.ts
│   └── project.ts
├── infrastructure
│   └── prisma-project.repository.ts
├── presentation
│   ├── project.mapper.ts
│   └── projects.controller.ts
└── projects.module.ts
```


````

### .cursor/rules/rule-backend-mapper.mdc

````mdc
---
description: Backend mapper
globs: apps/backend/**/*.ts
---
- Use `NestJS` DI.
- Use Prisma types from [prisma.types.ts](mdc:apps/backend/src/prisma/prisma.types.ts).
- Implements [mapper.interface.ts](mdc:apps/backend/src/presentation/mapper.interface.ts) with <Domain, Model>.
- Reassign every props (mandatory).
- Return plain objects, no instances.

Example `projects/presentation/project.mapper.ts`:
```typescript
import { Injectable } from '@nestjs/common';
import { ProjectModel } from 'src/prisma/prisma.types';

import { Project } from '../domain/project';

import { Mapper } from 'src/presentation/mapper.interface';

@Injectable()
export class ProjectMapper implements Mapper<Project, ProjectModel> {
  toModel(domain: Project): ProjectModel {
    return {
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      newsletter_alias: domain.newsletterAlias,
      project_number: domain.projectNumber,
      created_at: domain.createdAt,
      prompt_instruction: domain.promptInstruction,
      user_id: domain.userId,
    };
  }

  toDomain(model: ProjectModel): Project {
    return {
      id: model.id,
      name: model.name,
      slug: model.slug,
      newsletterAlias: model.newsletter_alias,
      projectNumber: model.project_number,
      createdAt: model.created_at,
      promptInstruction: model.prompt_instruction,
      userId: model.user_id,
    };
  }
}
```
````

### .cursor/rules/rule-backend-repository.mdc

````mdc
---
description: Backend repositories
globs: apps/backend/**/*.ts
---
- Repository implements its interface.
- Always export const with `KEY` that must be used in `controllers`, `use-cases` and `modules`.
- Type with `Model.Property` instead of primitive if possible (e.g. `email: string` -> `email: User['email']`).
- Wrap db calls in Prisma Transactions if necessary.

Example usage in controller/use-case:
```typescript
constructor(
  @Inject(USER_REPOSITORY)
  private readonly userRepository: UserRepository,
  private readonly userMapper: UserMapper,
) {}
```

Example usage in modules:
```typescript
@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    GetAllUsersUseCase,
    UserMapper,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [GetAllUsersUseCase, USER_REPOSITORY],
})
export class UsersModule {}
```

Example interface `features/users/domain/user.repository.interface.ts`:
```typescript
import type { User } from '@prisma/client';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  findByEmail(email: User['email']): Promise<User | null>;
  findAll(): Promise<User[]>;
}
```

Example integration `features/users/infrastructure/prisma-user.repository.ts`:
```typescript
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { UserRepository } from '../domain/user.repository.interface';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: User['email']): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}

```
````

### .cursor/rules/rule-backend-seed.mdc

````mdc
---
description: Backend mapper
globs: apps/backend/**/*.ts
---
- Calling repositories might no be necessary except to validate domain logic, most of the time use prisma client directly.
- Must use types in `@prisma/client`.
- Avoid delete in seeds, db is emptied on seed command's lunch in [package.json](mdc:apps/backend/package.json) .
- Wrapped in transactions.
- Injected as NestJS services for DI.
- Info: seeds are ran from commands in [main-cli.ts](mdc:apps/backend/src/main-cli.ts) and [seeds.module.ts](mdc:apps/backend/src/infrastructure/database/seeds.module.ts) .

Example (`infrastructure/database/seeds/users.seed.ts`):
```typescript
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';

@Injectable()
export class UsersSeed {

  private readonly standardUser: Prisma.UserCreateInput = {
    email: 'user.standard@example.com',
    name: 'Standard User',
    role: 'REGULAR',
    google_id: '1234567891',
    avatar: 'https://example.com/avatar.png',
    refresh_token: '1234567891',
  };

  async seed(
    tx: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<User[]> {
    console.info('🧑‍💻 Seeding users...');

    const users = await Promise.all([
      tx.user.create({ data: this.standardUser }),
    ]);

    return users;
  }
}
```
````

### .cursor/rules/rule-backend-use-case.mdc

````mdc
---
description: Backend use-case
globs: apps/backend/**/*.ts
---
- Focus on domain logic and user action.
- Reflects bridge between domain, infrastructure (database) and presentation (controller).
- Domain objects received are validated by `class-validator`.
- Domain specific requirements can be checked here.

Example:
```typescript
import { Inject, Injectable } from '@nestjs/common';

import { UserDomain } from '../../domain/user.domain';
import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository.interface';
import { UserMapper } from '../../presentation/user.mapper';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(): Promise<UserDomain[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.userMapper.toDomain(user));
  }
}
```
````

### .cursor/rules/rule-frontend-component.mdc

````mdc
---
description: Frontend component
globs: apps/frontend/**.ts, apps/frontend/**.tsx
---
- Use observer from mobx-react-lite on React components to track state changes.
- Dump component, no logic, logics is in store [rule-frontend-store.mdc](mdc:.cursor/rules/rule-frontend-store.mdc) .
- No default export for components.
- Export static `displayName` at the bottom.
- const at the top.
- Separate with line jumb `hooks` and regular const.
- Early returns.
- Strong typing.
- Use ShadCN from `~/components/ui`.
- One component per file.
- Pass parent parameters `store` to children components and UI if necessary (e.g. `formRef`)

Example child component (`features/dashboard/custom-instructions/custom-instructions-confirmation.component.tsx`):
```typescript
interface CustomInstructionsConfirmationProps {
  store: CustomInstructionsStore;
  formRef: React.RefObject<HTMLFormElement>;
}

export const CustomInstructionsConfirmation: FC<CustomInstructionsConfirmationProps> = observer(
  ({ store, formRef }) => {
    const { isDialogOpen, isSubmitting, instructionLength, openDialog, closeDialog } = store;

    const handleConfirm = (): void => {
      store.closeDialog();
      formRef.current?.requestSubmit();
    };

    return (
      <div className="flex flex-col justify-between">
        <span className="text-sm text-gray-500">{instructionLength}/200 tokens</span>

        // ...
      </div>
    );
  },
);

CustomInstructionsConfirmation.displayName = 'CustomInstructionsConfirmation';
```

Example main component (`features/dashboard/custom-instructions/custom-instructions.component.tsx`):
```typescript
import { PROJECT_MAX_LENGTH, PROJECT_MIN_LENGTH } from '@le-journal/shared-types';
import { observer } from 'mobx-react-lite';
import { useRef, type FC } from 'react';

import { useDashboardStores } from '../dashboard.context';

import { Skeleton } from '~/components/ui/skeleton';
import { Textarea } from '~/components/ui/textarea';

export const CustomInstructions: FC = observer(() => {
  const formRef = useRef<HTMLFormElement>(null);
  const { dashboardStore } = useDashboardStores();

  const store = dashboardStore.customInstructions;
  const state = store.state;

  if (state === null || store.isLoading) {
    return <Skeleton className="h-[200px]" />;
  }

  return (
    <div className="mt-auto sticky bottom-0 bg-white border-t p-4">
      <label htmlFor="ai-customization" className="block text-sm font-medium text-gray-700 mb-2">
        Comment devrions-nous personnaliser votre score de newsletter ? Que souhaitez-vous voir plus
        ou moins ?
      </label>
      <form ref={formRef} onSubmit={store.save} className="space-y-4">
        <div className="flex space-x-4">
          <input type="hidden" name="id" value={state.id} />
          <Textarea
            name="promptInstruction"
            disabled={store.isSubmitting}
            value={state.promptInstruction}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              store.changeInstruction(e.target.value)
            }
            minLength={PROJECT_MIN_LENGTH}
            maxLength={PROJECT_MAX_LENGTH}
            className="flex-1"
            placeholder="Entrez vos préférences de personnalisation..."
          />
        </div>
      </form>
    </div>
  );
});

CustomInstructions.displayName = 'CustomInstructions';

```
````

### .cursor/rules/rule-frontend-global.mdc

```mdc
---
description: Frontend : Always apply those rules
globs: apps/frontend/**
---
- Mobile first.
- Always use latest versions in [package.json](mdc:apps/frontend/package.json).
- Remix only, no NextJS.
- Root imports with `/~`.
- Test with `Vitest`.
- Use `Vite`, not `Webpack`.
- `ESLint` with flat config.
- Focus on accessibility (a11y) when generating HTML.
- Use latest `tailwind` functionnalities (3.4+).
- French language only in UI (labels, texts, placeholders...)
```

### .cursor/rules/rule-frontend-remix-loaders.mdc

```mdc
---
description: Frontend : Remix Loaders
globs: apps/frontend/**/*.ts
---
- Loaders must be used in routes.
- Return plain objects instead of `json()`.
```

### .cursor/rules/rule-frontend-store.mdc

````mdc
---
description: Frontend store with MobX for logic.
globs: apps/frontend/**
---
- Separate logic (store) from UI (component).
- Avoid technical function (e.g. `setDialogOpen`), prefer user actions (`openDialog`, `closeDialog`).
- Always validate `state` before affecting using @validator.ts.
- Use `makeAutoObservable` in the store constructor.
- Wrap state mutations inside `runInAction()`.
- Use `computed properties` for all derived values, even small (e.g., `instructionLength`).
- Inject the store into the parent component for better state management.
- Implement [loadable.interface.ts](mdc:apps/frontend/app/interfaces/loadable.interface.ts) is component have a state loadable from API.

Interface Example `features/dashboard/custom-instructions/custom-instructions.type.ts`:
```typescript
import type { ProjectPromptType } from '@le-journal/shared-types';

import type { Actionable, Statable } from '~/interfaces/component.interface';
import type { Loadable } from '~/interfaces/loadable.interface';

interface CustomInstructionsState extends Statable<ProjectPromptType> {
  isDialogOpen: boolean;
}

interface CustomInstructionsActions extends Actionable<ProjectPromptType> {
  openDialog: () => void;
  closeDialog: () => void;
}

export interface CustomInstructions
  extends CustomInstructionsState,
    CustomInstructionsActions,
    Loadable<ProjectPromptType> {}
```

Store Example `features/dashboard/custom-instructions/custom-instructions.store.ts`:
```typescript
import type { ProjectPromptType } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';

import type { CustomInstructions } from './custom-instructions.type';

import type { Loadable } from '~/interfaces/loadable.interface';
import { clientFetch } from '~/lib/api-fetcher.client';
import { verify } from '~/lib/validator';

export class CustomInstructionsStore implements CustomInstructions, Loadable<ProjectPromptType> {
  state: ProjectPromptType | null = null;

  isDialogOpen = false;
  isLoading = true;
  isSubmitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  init = (prompt: ProjectPromptType): void => {
    verify(prompt);

    runInAction(() => {
      this.state = prompt;
      this.isLoading = false;
    });
  };

  save = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    const updatedState = await clientFetch<ProjectPromptType>(event, this.state);

    this.init(updatedState);
  };

  changeInstruction = (instruction: string): void => {
    if (this.state === null) {
      throw new Error('State is null');
    }

    runInAction(() => {
      this.state!.promptInstruction = instruction;
    });
  };

  openDialog = (): void => {
    this.isDialogOpen = true;
  };

  closeDialog = (): void => {
    this.isDialogOpen = false;
  };

  get instructionLength(): number {
    return this.state?.promptInstruction.length ?? 0;
  }
}
```
````

### .cursor/rules/rule-global-code-generation.mdc

```mdc
---
description: Global : Code generation
globs: **/*.ts, **/*.tsx
---
Sharing code:
- Place shared data types in `packages/shared-types`.
- One file per type, export everything from [index.ts](mdc:packages/shared-types/src/index.ts).

Simplified code:
- Force explicit constants instead of magic numbers.
- Write clear and simple conditions.
- No double negatives.
- Prioritize readable variable names, even if longer.
- Simplify loops using `map()`, `filter()`, or `reduce()`.

Type safe code:
- Always type function params and returns.

Feature focus code:
- Reflect business needs in the code.
- Avoid technical function names, favor domain language.
- Model objects closely to business concepts.

Sizes:
- Functions: Max 20-30 lines.
- Classes/Files: Max 200-300 lines.
- Folders: Max 7-10 files.

Responsability:
- One file per feature, split responsibility across files (SRP).

Comments:
- No comments by default.
- Comments only for complex logic or interfaces.

Forbidden:
- Anemic models (avoid trivial `getId`/`setId`).
- Function names with no actions (avoid `setUsers`, prefer `loadUsers`).
- No interface prefix `IUser` or type suffix `UserType`.

Lint & Error
- Follow `@typescript-eslint/strict-boolean-expressions` (avoid `if(!obj)`, prefer `if (obj === undefined)`).
- Type errors with `catch(error: unknown | Error)`.
```

### .cursor/rules/rule-global-installation.mdc

```mdc
---
description: Global packages
globs: **/*.json
---
- Check all packages versions every time:
  - root monorepo: [package.json](mdc:package.json)
  - backend: [package.json](mdc:apps/backend/package.json)
  - frontend: [package.json](mdc:apps/frontend/package.json)
  - shared-types: [package.json](mdc:packages/shared-types/package.json)
- Always ask before adding new packages.
- Use `pnpm`, never `npm`.
```

### .cursor/rules/rule-shared-types.mdc

````mdc
---
description: Rules for Shared Types between frontend and backend
globs: packages/shared-types/**/*.ts
---
- Most of the validation is done here with `class-validator`.
- This type is used "as-is" in frontend.
- This type is extended in backend's Domain models to ensure coherence.

Example `packages/shared-types/src/project.type.ts`:
```typescript
import { PickType } from '@nestjs/mapped-types';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProjectType {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  newsletterAlias!: string;

  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @IsString()
  promptInstruction!: string;
}
```
````

### Project Structure

```text
.
./.cursor
./.cursor/rules
./.cursor/rules/README.md
./.cursor/rules/rule-backend-controller.mdc
./.cursor/rules/rule-backend-domain.mdc
./.cursor/rules/rule-backend-global.mdc
./.cursor/rules/rule-backend-mapper.mdc
./.cursor/rules/rule-backend-repository.mdc
./.cursor/rules/rule-backend-seed.mdc
./.cursor/rules/rule-backend-use-case.mdc
./.cursor/rules/rule-frontend-component.mdc
./.cursor/rules/rule-frontend-global.mdc
./.cursor/rules/rule-frontend-remix-loaders.mdc
./.cursor/rules/rule-frontend-store.mdc
./.cursor/rules/rule-global-code-generation.mdc
./.cursor/rules/rule-global-installation.mdc
./.cursor/rules/rule-shared-types.mdc
./.cursorignore
./.env
./.env.example
./.github
./.github/workflows
./.github/workflows/codeql-analysis.yml
./.github/workflows/pr-checks.yml
./.github/workflows/release.yml
./.github/workflows/renovate.yml
./.gitignore
./.husky
./.husky/_
./.husky/_/.gitignore
./.husky/_/applypatch-msg
./.husky/_/commit-msg
./.husky/_/h
./.husky/_/husky.sh
./.husky/_/post-applypatch
./.husky/_/post-checkout
./.husky/_/post-commit
./.husky/_/post-merge
./.husky/_/post-rewrite
./.husky/_/pre-applypatch
./.husky/_/pre-auto-gc
./.husky/_/pre-commit
./.husky/_/pre-merge-commit
./.husky/_/pre-push
./.husky/_/pre-rebase
./.husky/_/prepare-commit-msg
./.husky/commit-msg
./.husky/post-commit
./.husky/pre-commit
./.husky/pre-push
./.prettierignore
./.prettierrc
./.releaserc.json
./.vscode
./.vscode/launch.json
./.vscode/settings.json
./.windsurfignore
./.windsurfrules
./CHANGELOG.md
./README.md
./apps
./apps/backend
./apps/backend/.env
./apps/backend/.env.development
./apps/backend/.env.example
./apps/backend/.env.production
./apps/backend/.env.test
./apps/backend/.gitignore
./apps/backend/README.md
./apps/backend/jest.config.ts
./apps/backend/logs
./apps/backend/logs/debug.log
./apps/backend/logs/error.log
./apps/backend/nest-cli.json
./apps/backend/package.json
./apps/backend/prisma
./apps/backend/prisma/generated
./apps/backend/prisma/generated/client-test
./apps/backend/prisma/migrations
./apps/backend/prisma/migrations/20250204193843_init
./apps/backend/prisma/migrations/20250204193843_init/migration.sql
./apps/backend/prisma/migrations/20250208191633_rename_newsletter_and_add_prompt
./apps/backend/prisma/migrations/20250208191633_rename_newsletter_and_add_prompt/migration.sql
./apps/backend/prisma/migrations/20250208193239_update_schema_conventions
./apps/backend/prisma/migrations/20250208193239_update_schema_conventions/migration.sql
./apps/backend/prisma/migrations/20250208200622_remove_newsletter_name_and_url
./apps/backend/prisma/migrations/20250208200622_remove_newsletter_name_and_url/migration.sql
./apps/backend/prisma/migrations/20250208201853_simplify_newsletter_model
./apps/backend/prisma/migrations/20250208201853_simplify_newsletter_model/migration.sql
./apps/backend/prisma/migrations/20250208202356_rename_news_to_article
./apps/backend/prisma/migrations/20250208202356_rename_news_to_article/migration.sql
./apps/backend/prisma/migrations/20250208203304_add_newsletter_alias_to_project
./apps/backend/prisma/migrations/20250208203304_add_newsletter_alias_to_project/migration.sql
./apps/backend/prisma/migrations/20250209075042_add_subscription_status
./apps/backend/prisma/migrations/20250209075042_add_subscription_status/migration.sql
./apps/backend/prisma/migrations/20250209075753_subscription_status
./apps/backend/prisma/migrations/20250209075753_subscription_status/migration.sql
./apps/backend/prisma/migrations/20250209090123_
./apps/backend/prisma/migrations/20250209090123_/migration.sql
./apps/backend/prisma/migrations/20250209093206_
./apps/backend/prisma/migrations/20250209093206_/migration.sql
./apps/backend/prisma/migrations/20250209171456_add_project_to_newsletter
./apps/backend/prisma/migrations/20250209171456_add_project_to_newsletter/migration.sql
./apps/backend/prisma/migrations/20250211071055_empty_instructions_by_default
./apps/backend/prisma/migrations/20250211071055_empty_instructions_by_default/migration.sql
./apps/backend/prisma/migrations/20250211115308_
./apps/backend/prisma/migrations/20250211115308_/migration.sql
./apps/backend/prisma/migrations/20250211124226_google_auth_refresh_token
./apps/backend/prisma/migrations/20250211124226_google_auth_refresh_token/migration.sql
./apps/backend/prisma/migrations/20250212125601_articles_emails_structure
./apps/backend/prisma/migrations/20250212125601_articles_emails_structure/migration.sql
./apps/backend/prisma/migrations/20250213043722_optional_user_fields
./apps/backend/prisma/migrations/20250213043722_optional_user_fields/migration.sql
./apps/backend/prisma/migrations/20250213050058_user_roles
./apps/backend/prisma/migrations/20250213050058_user_roles/migration.sql
./apps/backend/prisma/migrations/20250213063132_no_link_between_user_and_newsletter
./apps/backend/prisma/migrations/20250213063132_no_link_between_user_and_newsletter/migration.sql
./apps/backend/prisma/migrations/20250213063411_remove_user_id_from_newsletter
./apps/backend/prisma/migrations/20250213063411_remove_user_id_from_newsletter/migration.sql
./apps/backend/prisma/migrations/20250213103910_add_last_prompt_update
./apps/backend/prisma/migrations/20250213103910_add_last_prompt_update/migration.sql
./apps/backend/prisma/migrations/20250214062015_google_auth_scopes
./apps/backend/prisma/migrations/20250214062015_google_auth_scopes/migration.sql
./apps/backend/prisma/migrations/20250214062237_rename_google_info_with_prefix
./apps/backend/prisma/migrations/20250214062237_rename_google_info_with_prefix/migration.sql
./apps/backend/prisma/migrations/20250214063158_scope_typo
./apps/backend/prisma/migrations/20250214063158_scope_typo/migration.sql
./apps/backend/prisma/migrations/20250214063239_onboarding_typo
./apps/backend/prisma/migrations/20250214063239_onboarding_typo/migration.sql
./apps/backend/prisma/migrations/20250215205640_google_refresh_token_iv
./apps/backend/prisma/migrations/20250215205640_google_refresh_token_iv/migration.sql
./apps/backend/prisma/migrations/20250215205921_mandatory_tokens
./apps/backend/prisma/migrations/20250215205921_mandatory_tokens/migration.sql
./apps/backend/prisma/migrations/migration_lock.toml
./apps/backend/prisma/schema.prisma
./apps/backend/src
./apps/backend/src/app.controller.spec.ts
./apps/backend/src/app.controller.ts
./apps/backend/src/app.module.ts
./apps/backend/src/app.service.ts
./apps/backend/src/config
./apps/backend/src/config/config.module.ts
./apps/backend/src/infrastructure
./apps/backend/src/infrastructure/auth
./apps/backend/src/infrastructure/auth/auth.controller.ts
./apps/backend/src/infrastructure/auth/auth.dto.ts
./apps/backend/src/infrastructure/auth/auth.exceptions.ts
./apps/backend/src/infrastructure/auth/auth.module.ts
./apps/backend/src/infrastructure/auth/auth.service.ts
./apps/backend/src/infrastructure/auth/auth.types.ts
./apps/backend/src/infrastructure/auth/decorators
./apps/backend/src/infrastructure/auth/decorators/get-user.decorator.ts
./apps/backend/src/infrastructure/auth/guards
./apps/backend/src/infrastructure/auth/guards/google-auth-full.guard.ts
./apps/backend/src/infrastructure/auth/guards/jwt.guard.ts
./apps/backend/src/infrastructure/auth/strategies
./apps/backend/src/infrastructure/auth/strategies/google-full.strategy.ts
./apps/backend/src/infrastructure/auth/strategies/jwt.strategy.ts
./apps/backend/src/infrastructure/database
./apps/backend/src/infrastructure/database/seeds
./apps/backend/src/infrastructure/database/seeds/articles.seed.ts
./apps/backend/src/infrastructure/database/seeds/emails.seed.ts
./apps/backend/src/infrastructure/database/seeds/newsletters.seed.ts
./apps/backend/src/infrastructure/database/seeds/projects.seed.ts
./apps/backend/src/infrastructure/database/seeds/transactions.seed.ts
./apps/backend/src/infrastructure/database/seeds/users.seed.ts
./apps/backend/src/infrastructure/database/seeds.bootstrap.ts
./apps/backend/src/infrastructure/database/seeds.command.ts
./apps/backend/src/infrastructure/database/seeds.module.ts
./apps/backend/src/infrastructure/database/seeds.service.ts
./apps/backend/src/infrastructure/google
./apps/backend/src/infrastructure/google/google.module.ts
./apps/backend/src/infrastructure/google/google.service.ts
./apps/backend/src/infrastructure/http
./apps/backend/src/infrastructure/http/api-data-response.decorator.ts
./apps/backend/src/infrastructure/http/api-redirection-response.decorator.ts
./apps/backend/src/infrastructure/logger
./apps/backend/src/infrastructure/logger/logger.module.ts
./apps/backend/src/infrastructure/logger/logger.service.ts
./apps/backend/src/infrastructure/redis
./apps/backend/src/infrastructure/redis/redis.module.ts
./apps/backend/src/infrastructure/redis/redis.repository.ts
./apps/backend/src/infrastructure/redis/redis.service.ts
./apps/backend/src/infrastructure/redis/redis.types.ts
./apps/backend/src/infrastructure/redis/repositories
./apps/backend/src/infrastructure/redis/repositories/user-token.repository.ts
./apps/backend/src/infrastructure/redis/repositories/user.repository.ts
./apps/backend/src/main-cli.ts
./apps/backend/src/main.env.ts
./apps/backend/src/main.ts
./apps/backend/src/modules
./apps/backend/src/modules/newsletter
./apps/backend/src/modules/newsletter/application
./apps/backend/src/modules/newsletter/application/get-emails.use-case.ts
./apps/backend/src/modules/newsletter/application/get-newsletters.use-case.ts
./apps/backend/src/modules/newsletter/domain
./apps/backend/src/modules/newsletter/domain/article.domain.ts
./apps/backend/src/modules/newsletter/domain/email.domain.ts
./apps/backend/src/modules/newsletter/domain/email.repository.interface.ts
./apps/backend/src/modules/newsletter/domain/newsletter.domain.ts
./apps/backend/src/modules/newsletter/domain/newsletter.repository.ts
./apps/backend/src/modules/newsletter/infrastructure
./apps/backend/src/modules/newsletter/infrastructure/prisma-email.repository.ts
./apps/backend/src/modules/newsletter/infrastructure/prisma-newsletter.repository.ts
./apps/backend/src/modules/newsletter/newsletter.module.ts
./apps/backend/src/modules/newsletter/presentation
./apps/backend/src/modules/newsletter/presentation/article.mapper.ts
./apps/backend/src/modules/newsletter/presentation/email.mapper.ts
./apps/backend/src/modules/newsletter/presentation/newsletter.controller.ts
./apps/backend/src/modules/newsletter/presentation/newsletter.mapper.ts
./apps/backend/src/modules/projects
./apps/backend/src/modules/projects/application
./apps/backend/src/modules/projects/application/create-project.use-case.ts
./apps/backend/src/modules/projects/application/get-project.use-case.ts
./apps/backend/src/modules/projects/application/setup-project-label.use-case.ts
./apps/backend/src/modules/projects/application/update-project-prompt.use-case.ts
./apps/backend/src/modules/projects/domain
./apps/backend/src/modules/projects/domain/can-update-prompt.service.ts
./apps/backend/src/modules/projects/domain/project-create.ts
./apps/backend/src/modules/projects/domain/project-update.ts
./apps/backend/src/modules/projects/domain/project.repository.interface.ts
./apps/backend/src/modules/projects/domain/project.ts
./apps/backend/src/modules/projects/infrastructure
./apps/backend/src/modules/projects/infrastructure/prisma-project.repository.ts
./apps/backend/src/modules/projects/presentation
./apps/backend/src/modules/projects/presentation/project.mapper.ts
./apps/backend/src/modules/projects/presentation/projects.controller.ts
./apps/backend/src/modules/projects/projects.module.ts
./apps/backend/src/modules/users
./apps/backend/src/modules/users/application
./apps/backend/src/modules/users/application/use-cases
./apps/backend/src/modules/users/application/use-cases/create-user.use-case.ts
./apps/backend/src/modules/users/application/use-cases/get-all-users.use-case.ts
./apps/backend/src/modules/users/application/use-cases/get-user-by-id.use-case.ts
./apps/backend/src/modules/users/domain
./apps/backend/src/modules/users/domain/user.domain.ts
./apps/backend/src/modules/users/domain/user.repository.interface.ts
./apps/backend/src/modules/users/infrastructure
./apps/backend/src/modules/users/infrastructure/crypto.service.ts
./apps/backend/src/modules/users/infrastructure/prisma-user.repository.ts
./apps/backend/src/modules/users/presentation
./apps/backend/src/modules/users/presentation/user.mapper.ts
./apps/backend/src/modules/users/presentation/users.controller.ts
./apps/backend/src/modules/users/users.module.ts
./apps/backend/src/presentation
./apps/backend/src/presentation/mapper.interface.ts
./apps/backend/src/prisma
./apps/backend/src/prisma/prisma.module.ts
./apps/backend/src/prisma/prisma.service.ts
./apps/backend/src/prisma/prisma.types.ts
./apps/backend/swagger.json
./apps/backend/test
./apps/backend/test/app.e2e-spec.ts
./apps/backend/test/jest-e2e.json
./apps/backend/tsconfig.build.json
./apps/backend/tsconfig.json
./apps/frontend
./apps/frontend/.dockerignore
./apps/frontend/.env
./apps/frontend/.env.example
./apps/frontend/.gitignore
./apps/frontend/Dockerfile
./apps/frontend/README.md
./apps/frontend/app
./apps/frontend/app/components
./apps/frontend/app/components/Layout.tsx
./apps/frontend/app/components/error-boundary.tsx
./apps/frontend/app/components/icons
./apps/frontend/app/components/icons/link.tsx
./apps/frontend/app/components/ui
./apps/frontend/app/components/ui/accordion.tsx
./apps/frontend/app/components/ui/badge.tsx
./apps/frontend/app/components/ui/breadcrumb.tsx
./apps/frontend/app/components/ui/button.tsx
./apps/frontend/app/components/ui/card.tsx
./apps/frontend/app/components/ui/dialog.tsx
./apps/frontend/app/components/ui/drawer.tsx
./apps/frontend/app/components/ui/dropdown-menu.tsx
./apps/frontend/app/components/ui/hover-card.tsx
./apps/frontend/app/components/ui/input.tsx
./apps/frontend/app/components/ui/separator.tsx
./apps/frontend/app/components/ui/sheet.tsx
./apps/frontend/app/components/ui/sidebar.tsx
./apps/frontend/app/components/ui/skeleton.tsx
./apps/frontend/app/components/ui/table.tsx
./apps/frontend/app/components/ui/textarea.tsx
./apps/frontend/app/components/ui/toast.tsx
./apps/frontend/app/components/ui/toaster.tsx
./apps/frontend/app/components/ui/tooltip.tsx
./apps/frontend/app/entry.client.tsx
./apps/frontend/app/entry.server.tsx
./apps/frontend/app/features
./apps/frontend/app/features/auth
./apps/frontend/app/features/auth/auth-button.component.tsx
./apps/frontend/app/features/auth/auth.component.tsx
./apps/frontend/app/features/auth/auth.context.tsx
./apps/frontend/app/features/auth/auth.store.ts
./apps/frontend/app/features/dashboard
./apps/frontend/app/features/dashboard/custom-instructions
./apps/frontend/app/features/dashboard/custom-instructions/custom-instructions-confirmation.component.tsx
./apps/frontend/app/features/dashboard/custom-instructions/custom-instructions.component.tsx
./apps/frontend/app/features/dashboard/custom-instructions/custom-instructions.store.ts
./apps/frontend/app/features/dashboard/custom-instructions/custom-instructions.type.ts
./apps/frontend/app/features/dashboard/dashboard.component.tsx
./apps/frontend/app/features/dashboard/dashboard.store.ts
./apps/frontend/app/features/dashboard/emails
./apps/frontend/app/features/dashboard/emails/articles
./apps/frontend/app/features/dashboard/emails/articles/article-row.component.tsx
./apps/frontend/app/features/dashboard/emails/email-row.component.tsx
./apps/frontend/app/features/dashboard/emails/emails.component.tsx
./apps/frontend/app/features/dashboard/emails/emails.store.ts
./apps/frontend/app/features/dashboard/emails/emails.type.ts
./apps/frontend/app/features/dashboard/header-profile
./apps/frontend/app/features/dashboard/header-profile/header-profile.component.tsx
./apps/frontend/app/features/dashboard/header-profile/header-profile.store.ts
./apps/frontend/app/features/dashboard/header-profile/header-profile.type.ts
./apps/frontend/app/features/dashboard/newsletter-subscriptions
./apps/frontend/app/features/dashboard/newsletter-subscriptions/newsletter-subscriptions.component.tsx
./apps/frontend/app/features/dashboard/newsletter-subscriptions/newsletter-subscriptions.store.ts
./apps/frontend/app/features/dashboard/newsletter-subscriptions/newsletter-subscriptions.type.ts
./apps/frontend/app/features/dashboard/project
./apps/frontend/app/features/dashboard/project/project-alias.component.tsx
./apps/frontend/app/features/dashboard/project/project-alias.store.ts
./apps/frontend/app/features/dashboard/project/project-alias.type.ts
./apps/frontend/app/features/dashboard/upgrade-banner
./apps/frontend/app/features/dashboard/upgrade-banner/upgrade-banner.component.tsx
./apps/frontend/app/features/dashboard/upgrade-banner/upgrade-banner.store.ts
./apps/frontend/app/features/dashboard/upgrade-banner/upgrade-banner.type.ts
./apps/frontend/app/features/onboarding
./apps/frontend/app/features/onboarding/onboarding.component.tsx
./apps/frontend/app/features/onboarding/onboarding.store.ts
./apps/frontend/app/features/onboarding/onboarding.types.ts
./apps/frontend/app/hooks
./apps/frontend/app/hooks/use-mobile.tsx
./apps/frontend/app/hooks/use-toast.ts
./apps/frontend/app/interfaces
./apps/frontend/app/interfaces/loadable.interface.ts
./apps/frontend/app/lib
./apps/frontend/app/lib/api-error.ts
./apps/frontend/app/lib/api-fetcher.client.ts
./apps/frontend/app/lib/api-fetcher.ts
./apps/frontend/app/lib/utils.ts
./apps/frontend/app/lib/validator.test.ts
./apps/frontend/app/lib/validator.ts
./apps/frontend/app/root.tsx
./apps/frontend/app/routes
./apps/frontend/app/routes/_index.tsx
./apps/frontend/app/routes/admin.tsx
./apps/frontend/app/routes/dashboard.$projectNumber.tsx
./apps/frontend/app/routes/dashboard.tsx
./apps/frontend/app/routes/login.tsx
./apps/frontend/app/routes/onboarding._index.tsx
./apps/frontend/app/routes/settings.tsx
./apps/frontend/app/stores
./apps/frontend/app/stores/root.provider.ts
./apps/frontend/app/stores/root.store.ts
./apps/frontend/app/tailwind.css
./apps/frontend/app/tests
./apps/frontend/app/tests/_index.test.tsx
./apps/frontend/app/tests/root.test.tsx
./apps/frontend/components.json
./apps/frontend/mobx.config.ts
./apps/frontend/package.json
./apps/frontend/postcss.config.js
./apps/frontend/public
./apps/frontend/public/favicon.ico
./apps/frontend/tailwind.config.ts
./apps/frontend/test
./apps/frontend/test/setup.ts
./apps/frontend/test/test-utils.ts
./apps/frontend/tsconfig.json
./apps/frontend/vite.config.ts
./apps/frontend/vitest.config.ts
./commitlint.config.js
./config.js
./docker-compose.yml
./documentations
./documentations/_header.md
./documentations/instructions
./documentations/instructions/done
./documentations/instructions/done/dashboard-to-api.md
./documentations/instructions/done/database
./documentations/instructions/done/database/generate-entities.md
./documentations/instructions/done/database/generate-seed-untested.md
./documentations/instructions/done/database/generated-seed.md
./documentations/instructions/done/setup
./documentations/instructions/done/setup/dashboard-skeleton.md
./documentations/instructions/done/setup/security-features.md
./documentations/instructions/done/setup/setup-linter.md
./documentations/instructions/done/setup/setup-monorepo.md
./documentations/instructions/done/setup/setup-versionning.md
./documentations/instructions/done/shared-knowledge-base.md
./documentations/instructions/done/wireframe-en.md
./documentations/instructions/done/wireframe-fr.md
./documentations/instructions/in-progress
./documentations/instructions/in-progress/.gitkeep
./documentations/instructions/in-progress/auth-google.md
./documentations/instructions/in-progress/form-and-security.md
./documentations/instructions/in-progress/limite-prompt-update.md
./documentations/instructions/todo
./documentations/instructions/todo/.gitkeep
./documentations/instructions/todo/event-and-async.md
./documentations/knowledge.md
./documentations/knowledge.sh
./documentations/knowledge.txt
./documentations/libs
./documentations/libs/remix-2.5-documentation.md
./documentations/specifications
./documentations/specifications/functional
./documentations/specifications/functional/1-project-description.md
./documentations/specifications/functional/2-main-features.md
./documentations/specifications/functional/3-initial-scope.md
./documentations/specifications/technical
./documentations/specifications/technical/0-tech-choices.md
./documentations/specifications/technical/1-commit.md
./documentations/specifications/technical/2-semantic-versioning.md
./documentations/specifications/technical/3-urls.md
./eslint.config.js
./package.json
./packages
./packages/shared-types
./packages/shared-types/package.json
./packages/shared-types/src
./packages/shared-types/src/article.class.ts
./packages/shared-types/src/email.class.ts
./packages/shared-types/src/index.ts
./packages/shared-types/src/newsletter.class.ts
./packages/shared-types/src/project.class.ts
./packages/shared-types/src/user.class.ts
./packages/shared-types/tsconfig.json
./pnpm-lock.yaml
./pnpm-workspace.yaml
./scripts
./scripts/git-hooks
./scripts/git-hooks/validate-branch-name.sh
./tsconfig.json
./turbo.json

116 directories, 322 files
```

2025-02-17 06:42:29
