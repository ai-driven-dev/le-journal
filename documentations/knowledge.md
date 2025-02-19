---
date: 2025-02-19 23:21:51
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
   - Configuration rapide sur l'onboarding.
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
   - [x] Google OAuth 2.0
   - [x] Création labels/filtres Gmail
   - [x] Stepper configuration (alias, tutoriel)
2. **Tableau de bord :**
   - [ ] Newsletters reçues :
     - [ ] Date, sujet, récapitulatif, statut, bouton HTML
     - [ ] Liste actualités (Curation IA) :
       - [ ] Titre, description, URL, score pertinence
       - [ ] Vérification doublons, fusion si nécessaire
   - [ ] Liste newsletters :
     - [ ] Indicateur validation, affichage grisé si non traitée
   - [ ] Filtre contenu (texte simple)
3. **Paiement :**
   - [ ] Limite 2 newsletters gratuites
   - [ ] Upgrade : pop-in bénéfices, Stripe
4. **Header :**
   - [ ] Lien dashboard, infos utilisateur, menu (déconnexion, suppression, mise à jour)
5. **Landing Page :**
   - [ ] Bénéfices, visuel dashboard, CTA inscription
   - [ ] Footer légal
6. **Automatisation :**
   - [ ] Cron nocturne emails
   - [ ] Validation auto confirmations
   - [ ] Alerte Discord en cas d'erreurs répétées
7. **Personnalisation :**
   - [x] Champs extraction contenus spécifiques
8. **Sécurité/RGPD :**
   - [x] Suppression données, gestion tokens, réduction scopes

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

- Rate limiting (@nestjs/throttler)
- Prompt injection protection (to defined)

### Automation

- CronJob
- BullMQ

### LLM

- OpenAI GPT-4o with JSON output
- Mistral

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

### 🔒 Privé (Accessible après connexion)

- `/dashboard/:userSlug/:projectSlug` → **Dashboard utilisateur + projet**
- `/settings/:userSlug` → **Paramètres utilisateur**

### ⚙️ Admin (Réservé aux administrateurs)

- `/admin/` → **Gestion des utilisateurs**

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
    "dev": "docker exec redis redis-cli FLUSHALL &&turbo run dev",
    "dev:docker": "docker-compose up --build -d --remove-orphans",
    "beautify": "pnpm run format:fix && pnpm run lint:fix",
    "lint": "eslint \"**/*.{ts,tsx}\"",
    "lint:debug": "eslint \"**/*.{ts,tsx}\" --debug | tee | pbcopy",
    "lint:fix": "eslint \"**/*.{ts,tsx}\" --fix --fix-type problem,suggestion,layout,directive",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "format:fix": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "update:deps": "pnpm up -r --latest && pnpm install && pnpm run check && pnpm outdated -r ",
    "prepare": "husky && husky install",
    "check": "pnpm run dev:docker && pnpm run lint && pnpm run format && pnpm typecheck",
    "renovate": "dotenv -- renovate --dry-run",
    "clean": "pnpm run clean:remove && pnpm install && pnpm run build && pnpm run check",
    "clean:remove": "rm -rf node_modules .turbo .eslintcache pnpm-lock.yaml && find . -name node_modules -type d -prune -exec rm -rf {} +"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.7.1",
    "@commitlint/config-conventional": "^19.7.1",
    "@nestjs/cli": "^11.0.2",
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/npm": "^12.0.1",
    "@typescript-eslint/eslint-plugin": "^8.24.1",
    "@typescript-eslint/parser": "^8.24.1",
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
    "dev:debug": "VITE_HMR=false remix vite:dev --force --port=3000",
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
    "next-themes": "^0.4.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "reflect-metadata": "^0.2.2",
    "sonner": "^1.7.4",
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
    "build": "prisma generate && nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "dev": "nest start --debug --watch",
    "start:debug": "nest start --debug --watch --preserveWatchOutput --inspect-brk=0.0.0.0:9229",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "lint:debug": "TIMING=1 pnpm eslint apps/ --debug",
    "test": "dotenv -e .env.test -- jest --config jest.config.ts --testPathIgnorePatterns=\"\\.integration\\.spec\\.ts$\"",
    "test:coverage": "pnpm test -- --coverage",
    "test:watch": "pnpm test -- --watch --watchAll",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json --coverage",
    "test:ci": "dotenv -e .env.test -- prisma migrate reset --force && jest --config jest.config.ts --coverage --runInBand",
    "typecheck": "tsc --strict --noEmit",
    "prisma": "prisma generate && prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "prisma:migrate": "prisma migrate dev && prisma migrate deploy && prisma generate",
    "prisma:reset": "dotenv -e .env -- prisma migrate reset --skip-seed --force",
    "seed": "pnpm run prisma:reset && ts-node src/main-cli.ts -- seed"
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
    "cheerio": "^1.0.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "cookie-parser": "^1.4.7",
    "googleapis": "^144.0.0",
    "mailparser": "^3.7.2",
    "nest-commander": "^3.16.0",
    "nest-winston": "^1.10.2",
    "openai": "^4.85.2",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "reflect-metadata": "^0.2.2",
    "resend": "^4.1.2",
    "rxjs": "^7.8.1",
    "winston": "^3.17.0",
    "zod": "^3.24.2"
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
    "@types/mailparser": "^3.4.5",
    "@types/node": "^22.13.1",
    "@types/supertest": "^6.0.2",
    "cache-manager": "^6.4.0",
    "dotenv": "^16.4.7",
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
  id     String   @id @default(uuid())
  email  String   @unique
  name   String
  role   UserRole @default(REGULAR) @map("role")
  avatar String?

  google_id               String   @unique @map("google_id")
  google_scopes           String[] @default([]) @map("google_scopes")
  google_refresh_token    String   @map("google_refresh_token")
  google_refresh_token_iv String   @map("google_refresh_token_iv")

  created_at DateTime @default(now()) @map("created_at")
  updated_at DateTime @updatedAt @map("updated_at")

  // Relations
  projects     Project[]
  transactions Transaction[]

  @@index([email])
  @@index([google_id])
  @@map("users")
}

model Project {
  id             String @id @default(uuid())
  user_id        String
  project_number Int
  name           String
  slug           String

  email_alias       String  @unique @map("email_alias")
  google_label_name String? @map("google_label_name")
  google_label_id   String? @map("google_label_id")
  google_filter_id  String? @map("google_filter_id")

  prompt_instruction String    @default("") @map("prompt_instruction") @db.Text
  last_prompt_update DateTime? @map("last_prompt_update")
  created_at         DateTime  @default(now()) @map("created_at")

  onboarding_started_at   DateTime? @map("onboarding_started_at")
  onboarding_completed_at DateTime? @map("onboarding_completed_at")

  user        User         @relation(fields: [user_id], references: [id], onDelete: Cascade)
  newsletters Newsletter[]

  @@unique([user_id, google_label_name])
  @@unique([user_id, google_label_id])
  @@unique([user_id, project_number])
  @@unique([user_id, slug])
  @@unique([user_id, name])
  @@unique([user_id, google_filter_id])
  @@index([user_id])
  @@map("projects")
}

model Newsletter {
  id                  String             @id @default(uuid())
  project_id          String
  email               String
  subscribed_at       DateTime           @default(now()) @map("subscribed_at")
  subscription_status SubscriptionStatus @default(ACTIVE) @map("subscription_status")

  project Project @relation(fields: [project_id], references: [id], onDelete: Cascade)
  emails  Email[]

  @@index([email])
  @@map("newsletters")
}

model Email {
  id            String      @id @default(uuid())
  newsletter_id String      @map("newsletter_id")
  subject       String
  raw_content   String      @map("raw_content") @db.Text
  received_at   DateTime    @default(now()) @map("received_at")
  status        EmailStatus

  newsletter Newsletter @relation(fields: [newsletter_id], references: [id], onDelete: Cascade)
  articles   Article[]

  @@index([newsletter_id])
  @@index([subject])
  @@map("emails")
}

model Article {
  id              String   @id @default(uuid())
  email_id        String
  title           String
  description     String   @db.Text
  url             String
  relevance_score Float    @map("relevance_score")
  extracted_at    DateTime @default(now()) @map("extracted_at")

  email Email @relation(fields: [email_id], references: [id], onDelete: Cascade)

  @@index([email_id])
  @@map("articles")
}

model Transaction {
  id                String        @id @default(uuid())
  user_id           String?
  stripe_payment_id String        @map("stripe_payment_id")
  amount            Decimal
  currency          String
  status            PaymentStatus
  payment_method    PaymentMethod @map("payment_method")
  payment_date      DateTime      @default(now()) @map("payment_date")
  invoice_url       String        @map("invoice_url")

  user User? @relation(fields: [user_id], references: [id], onDelete: SetNull)

  @@index([user_id])
  @@index([stripe_payment_id])
  @@map("transactions")
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
- Controllers handle only DTOs for a clear, decoupled API.
- Controllers call use-cases only, no service or repository calls.
- Use [api-response.decorator.ts](mdc:apps/backend/src/infrastructure/http/api-response.decorator.ts) and [api-response-redirect.decorator.ts](mdc:apps/backend/src/infrastructure/http/api-response-redirect.decorator.ts)

Example `presentation/controllers/projects.controller.ts`:
```typescript
@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly projectMapper: ProjectMapper,
  ) {}

  @Post('create')
  @ApiAuthOperation('Créer un nouveau projet.', {
    type: Project,
  })
  @UseGuards(JwtAuthGuard, CheckOnboardingGuard)
  async createProject(@GetUser() user: UserDomain): Promise<Project> {
    const projectDomain = await this.createProjectUseCase.execute({
      userId: user.id,
      userEmail: user.email,
    });

    return this.projectMapper.toDTO(projectDomain);
  }
```
````

### .cursor/rules/rule-backend-domain.mdc

````mdc
---
description: Backend domain objects or DTOs
globs: apps/backend/**/*.ts
---
- Use `class-validator` annotations if data needs to be validation backend only.
- Use [api-domain-property.decorator.ts](mdc:apps/backend/src/infrastructure/http/api-domain-property.decorator.ts)

Example:
```typescript
export class ProjectCreateDomain {
  @Property('name')
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Property('slug')
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @Property('userId')
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @Property('emailAlias')
  @IsEmail()
  @IsNotEmpty()
  emailAlias!: string;

  @Property('number')
  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  constructor(project: ProjectCreateDomain) {
    Object.assign(this, project);
  }
}
```
````

### .cursor/rules/rule-backend-global.mdc

```mdc
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
```

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
- Mappers convert between DTOs, Domain objects, and Prisma types to prevent dependencies.

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
- A Repository returns only Domain objects, never DTOs or Prisma types.
- Prisma types stay in Repositories, never leaving Infrastructure.

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
- A Use Case is the only layer handling Domain objects and business logic.

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
Language:
- French language in UI (labels, texts, placeholders...), Exceptions, API documentation...
- English in code, logs etc.

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
- Never use `as` keyword.

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

text
.
├── CHANGELOG.md
├── README.md
├── apps
│   ├── backend
│   │   ├── README.md
│   │   ├── jest.config.ts
│   │   ├── logs
│   │   │   ├── debug.log
│   │   │   └── error.log
│   │   ├── nest-cli.json
│   │   ├── node*modules
│   │   │   ├── @eslint
│   │   │   │   ├── eslintrc -> ../../../../node_modules/.pnpm/@eslint+eslintrc@3.2.0/node_modules/@eslint/eslintrc
│   │   │   │   └── js -> ../../../../node_modules/.pnpm/@eslint+js@9.20.0/node_modules/@eslint/js
│   │   │   ├── @le-journal
│   │   │   │   └── shared-types -> ../../../../packages/shared-types
│   │   │   ├── @nestjs
│   │   │   │   ├── cache-manager -> ../../../../node_modules/.pnpm/@nestjs+cache-manager@3.0.0*@nestjs+common@11.0.10_@nestjs+core@11.0.10_cache-manager@6.4.0_rxjs@7.8.1/node*modules/@nestjs/cache-manager
│   │   │   │   ├── cli -> ../../../../node_modules/.pnpm/@nestjs+cli@11.0.4*@swc+cli@0.6.0_@swc+core@1.10.18_@types+node@22.13.4_esbuild@0.25.0/node*modules/@nestjs/cli
│   │   │   │   ├── common -> ../../../../node_modules/.pnpm/@nestjs+common@11.0.10_class-transformer@0.5.1_class-validator@0.14.1_reflect-metadata@0.2.2_rxjs@7.8.1/node_modules/@nestjs/common
│   │   │   │   ├── config -> ../../../../node_modules/.pnpm/@nestjs+config@4.0.0*@nestjs+common@11.0.10_rxjs@7.8.1/node*modules/@nestjs/config
│   │   │   │   ├── core -> ../../../../node_modules/.pnpm/@nestjs+core@11.0.10*@nestjs+common@11.0.10_@nestjs+platform-express@11.0.10_reflect-metadata@0.2.2_rxjs@7.8.1/node*modules/@nestjs/core
│   │   │   │   ├── jwt -> ../../../../node_modules/.pnpm/@nestjs+jwt@11.0.0*@nestjs+common@11.0.10/node*modules/@nestjs/jwt
│   │   │   │   ├── mapped-types -> ../../../../node_modules/.pnpm/@nestjs+mapped-types@2.1.0*@nestjs+common@11.0.10_class-transformer@0.5.1_class-validator@0.14.1_reflect-metadata@0.2.2/node*modules/@nestjs/mapped-types
│   │   │   │   ├── passport -> ../../../../node_modules/.pnpm/@nestjs+passport@11.0.5*@nestjs+common@11.0.10_passport@0.7.0/node*modules/@nestjs/passport
│   │   │   │   ├── platform-express -> ../../../../node_modules/.pnpm/@nestjs+platform-express@11.0.10*@nestjs+common@11.0.10_@nestjs+core@11.0.10/node*modules/@nestjs/platform-express
│   │   │   │   ├── schematics -> ../../../../node_modules/.pnpm/@nestjs+schematics@11.0.1_chokidar@4.0.3_typescript@5.7.3/node_modules/@nestjs/schematics
│   │   │   │   ├── swagger -> ../../../../node_modules/.pnpm/@nestjs+swagger@11.0.3*@nestjs+common@11.0.10_@nestjs+core@11.0.10_class-transformer@0.5.1*cl_ik4pfpcdsjaaiixnm43ruiha7y/node_modules/@nestjs/swagger
│   │   │   │   ├── testing -> ../../../../node_modules/.pnpm/@nestjs+testing@11.0.10*@nestjs+common@11.0.10_@nestjs+core@11.0.10_@nestjs+platform-express@11.0.10/node*modules/@nestjs/testing
│   │   │   │   └── throttler -> ../../../../node_modules/.pnpm/@nestjs+throttler@6.4.0*@nestjs+common@11.0.10_@nestjs+core@11.0.10_reflect-metadata@0.2.2/node*modules/@nestjs/throttler
│   │   │   ├── @prisma
│   │   │   │   └── client -> ../../../../node_modules/.pnpm/@prisma+client@6.4.0_prisma@6.4.0_typescript@5.7.3/node_modules/@prisma/client
│   │   │   ├── @swc
│   │   │   │   ├── cli -> ../../../../node_modules/.pnpm/@swc+cli@0.6.0*@swc+core@1.10.18/node*modules/@swc/cli
│   │   │   │   ├── core -> ../../../../node_modules/.pnpm/@swc+core@1.10.18/node_modules/@swc/core
│   │   │   │   └── jest -> ../../../../node_modules/.pnpm/@swc+jest@0.2.37*@swc+core@1.10.18/node*modules/@swc/jest
│   │   │   ├── @types
│   │   │   │   ├── cookie-parser -> ../../../../node_modules/.pnpm/@types+cookie-parser@1.4.8*@types+express@5.0.0/node*modules/@types/cookie-parser
│   │   │   │   ├── express -> ../../../../node_modules/.pnpm/@types+express@5.0.0/node_modules/@types/express
│   │   │   │   ├── jest -> ../../../../node_modules/.pnpm/@types+jest@29.5.14/node_modules/@types/jest
│   │   │   │   ├── mailparser -> ../../../../node_modules/.pnpm/@types+mailparser@3.4.5/node_modules/@types/mailparser
│   │   │   │   ├── node -> ../../../../node_modules/.pnpm/@types+node@22.13.4/node_modules/@types/node
│   │   │   │   ├── passport-google-oauth20 -> ../../../../node_modules/.pnpm/@types+passport-google-oauth20@2.0.16/node_modules/@types/passport-google-oauth20
│   │   │   │   ├── passport-jwt -> ../../../../node_modules/.pnpm/@types+passport-jwt@4.0.1/node_modules/@types/passport-jwt
│   │   │   │   └── supertest -> ../../../../node_modules/.pnpm/@types+supertest@6.0.2/node_modules/@types/supertest
│   │   │   ├── cache-manager -> ../../../node_modules/.pnpm/cache-manager@6.4.0/node_modules/cache-manager
│   │   │   ├── cheerio -> ../../../node_modules/.pnpm/cheerio@1.0.0/node_modules/cheerio
│   │   │   ├── class-transformer -> ../../../node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer
│   │   │   ├── class-validator -> ../../../node_modules/.pnpm/class-validator@0.14.1/node_modules/class-validator
│   │   │   ├── cookie-parser -> ../../../node_modules/.pnpm/cookie-parser@1.4.7/node_modules/cookie-parser
│   │   │   ├── dotenv -> ../../../node_modules/.pnpm/dotenv@16.4.7/node_modules/dotenv
│   │   │   ├── eslint -> ../../../node_modules/.pnpm/eslint@9.20.1/node_modules/eslint
│   │   │   ├── eslint-config-prettier -> ../../../node_modules/.pnpm/eslint-config-prettier@10.0.1_eslint@9.20.1/node_modules/eslint-config-prettier
│   │   │   ├── eslint-plugin-prettier -> ../../../node_modules/.pnpm/eslint-plugin-prettier@5.2.3_eslint-config-prettier@10.0.1_eslint@9.20.1_prettier@3.5.1/node_modules/eslint-plugin-prettier
│   │   │   ├── globals -> ../../../node_modules/.pnpm/globals@15.15.0/node_modules/globals
│   │   │   ├── googleapis -> ../../../node_modules/.pnpm/googleapis@144.0.0/node_modules/googleapis
│   │   │   ├── ioredis -> ../../../node_modules/.pnpm/ioredis@5.5.0/node_modules/ioredis
│   │   │   ├── jest -> ../../../node_modules/.pnpm/jest@29.7.0*@types+node@22.13.4_ts-node@10.9.2/node*modules/jest
│   │   │   ├── mailparser -> ../../../node_modules/.pnpm/mailparser@3.7.2/node_modules/mailparser
│   │   │   ├── meilisearch -> ../../../node_modules/.pnpm/meilisearch@0.48.2/node_modules/meilisearch
│   │   │   ├── nest-commander -> ../../../node_modules/.pnpm/nest-commander@3.16.0*@nestjs+common@11.0.10_@nestjs+core@11.0.10_@types+inquirer@8.2.10_typescript@5.7.3/node*modules/nest-commander
│   │   │   ├── nest-winston -> ../../../node_modules/.pnpm/nest-winston@1.10.2*@nestjs+common@11.0.10_winston@3.17.0/node*modules/nest-winston
│   │   │   ├── openai -> ../../../node_modules/.pnpm/openai@4.85.2_zod@3.24.2/node_modules/openai
│   │   │   ├── passport -> ../../../node_modules/.pnpm/passport@0.7.0/node_modules/passport
│   │   │   ├── passport-google-oauth20 -> ../../../node_modules/.pnpm/passport-google-oauth20@2.0.0/node_modules/passport-google-oauth20
│   │   │   ├── passport-jwt -> ../../../node_modules/.pnpm/passport-jwt@4.0.1/node_modules/passport-jwt
│   │   │   ├── prettier -> ../../../node_modules/.pnpm/prettier@3.5.1/node_modules/prettier
│   │   │   ├── prisma -> ../../../node_modules/.pnpm/prisma@6.4.0_typescript@5.7.3/node_modules/prisma
│   │   │   ├── reflect-metadata -> ../../../node_modules/.pnpm/reflect-metadata@0.2.2/node_modules/reflect-metadata
│   │   │   ├── resend -> ../../../node_modules/.pnpm/resend@4.1.2_react-dom@18.3.1_react@18.3.1/node_modules/resend
│   │   │   ├── rxjs -> ../../../node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs
│   │   │   ├── source-map-support -> ../../../node_modules/.pnpm/source-map-support@0.5.21/node_modules/source-map-support
│   │   │   ├── supertest -> ../../../node_modules/.pnpm/supertest@7.0.0/node_modules/supertest
│   │   │   ├── ts-jest -> ../../../node_modules/.pnpm/ts-jest@29.2.5*@babel+core@7.26.9_esbuild@0.25.0_jest@29.7.0_typescript@5.7.3/node*modules/ts-jest
│   │   │   ├── ts-loader -> ../../../node_modules/.pnpm/ts-loader@9.5.2_typescript@5.7.3_webpack@5.98.0/node_modules/ts-loader
│   │   │   ├── ts-node -> ../../../node_modules/.pnpm/ts-node@10.9.2*@swc+core@1.10.18_@types+node@22.13.4_typescript@5.7.3/node*modules/ts-node
│   │   │   ├── tsconfig-paths -> ../../../node_modules/.pnpm/tsconfig-paths@4.2.0/node_modules/tsconfig-paths
│   │   │   ├── typescript -> ../../../node_modules/.pnpm/typescript@5.7.3/node_modules/typescript
│   │   │   ├── typescript-eslint -> ../../../node_modules/.pnpm/typescript-eslint@8.24.1_eslint@9.20.1_typescript@5.7.3/node_modules/typescript-eslint
│   │   │   ├── winston -> ../../../node_modules/.pnpm/winston@3.17.0/node_modules/winston
│   │   │   └── zod -> ../../../node_modules/.pnpm/zod@3.24.2/node_modules/zod
│   │   ├── package.json
│   │   ├── prisma
│   │   │   ├── generated
│   │   │   │   └── client-test
│   │   │   ├── migrations
│   │   │   │   ├── 20250204193843_init
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250208191633_rename_newsletter_and_add_prompt
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250208193239_update_schema_conventions
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250208200622_remove_newsletter_name_and_url
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250208201853_simplify_newsletter_model
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250208202356_rename_news_to_article
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250208203304_add_newsletter_alias_to_project
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250209075042_add_subscription_status
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250209075753_subscription_status
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250209090123*
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250209093206*
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250209171456_add_project_to_newsletter
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250211071055_empty_instructions_by_default
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250211115308*
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250211124226*google_auth_refresh_token
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250212125601_articles_emails_structure
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250213043722_optional_user_fields
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250213050058_user_roles
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250213063132_no_link_between_user_and_newsletter
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250213063411_remove_user_id_from_newsletter
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250213103910_add_last_prompt_update
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250214062015_google_auth_scopes
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250214062237_rename_google_info_with_prefix
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250214063158_scope_typo
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250214063239_onboarding_typo
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250215205640_google_refresh_token_iv
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250215205921_mandatory_tokens
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250219072849_google_label_and_id_for_project
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250219080951*
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20250219104638*onboarding_removed_from_user_belongs_to_project
│   │   │   │   │   └── migration.sql
│   │   │   │   └── migration_lock.toml
│   │   │   └── schema.prisma
│   │   ├── src
│   │   │   ├── app.controller.spec.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   ├── config
│   │   │   │   └── config.module.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── auth
│   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   ├── auth.dto.ts
│   │   │   │   │   ├── auth.exceptions.ts
│   │   │   │   │   ├── auth.module.ts
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   ├── auth.types.ts
│   │   │   │   │   ├── decorators
│   │   │   │   │   │   └── get-user.decorator.ts
│   │   │   │   │   ├── guards
│   │   │   │   │   │   ├── google-auth-full.guard.ts
│   │   │   │   │   │   └── jwt.guard.ts
│   │   │   │   │   └── strategies
│   │   │   │   │   ├── google-full.strategy.ts
│   │   │   │   │   └── jwt.strategy.ts
│   │   │   │   ├── database
│   │   │   │   │   ├── seeds
│   │   │   │   │   │   ├── articles.seed.ts
│   │   │   │   │   │   ├── emails.seed.ts
│   │   │   │   │   │   ├── newsletters.seed.ts
│   │   │   │   │   │   ├── projects.seed.ts
│   │   │   │   │   │   ├── transactions.seed.ts
│   │   │   │   │   │   └── users.seed.ts
│   │   │   │   │   ├── seeds.bootstrap.ts
│   │   │   │   │   ├── seeds.command.ts
│   │   │   │   │   ├── seeds.module.ts
│   │   │   │   │   └── seeds.service.ts
│   │   │   │   ├── email
│   │   │   │   │   ├── email-extract.service.ts
│   │   │   │   │   ├── email.data.ts
│   │   │   │   │   ├── email.module.ts
│   │   │   │   │   ├── email.service.ts
│   │   │   │   │   ├── email.types.ts
│   │   │   │   │   └── tests
│   │   │   │   │   ├── agi-news.fixtures.eml
│   │   │   │   │   ├── email-extract.service.spec.ts
│   │   │   │   │   └── tldr-ai.fixtures.eml
│   │   │   │   ├── google
│   │   │   │   │   ├── google.module.ts
│   │   │   │   │   └── google.service.ts
│   │   │   │   ├── http
│   │   │   │   │   ├── api-domain-property.decorator.ts
│   │   │   │   │   ├── api-response-redirect.decorator.ts
│   │   │   │   │   └── api-response.decorator.ts
│   │   │   │   ├── llm
│   │   │   │   │   ├── llm.data.ts
│   │   │   │   │   ├── llm.module.ts
│   │   │   │   │   ├── llm.service.spec.ts
│   │   │   │   │   ├── llm.service.ts
│   │   │   │   │   ├── llm.types.ts
│   │   │   │   │   └── tests
│   │   │   │   │   └── agi-news.json
│   │   │   │   ├── logger
│   │   │   │   │   ├── logger.module.ts
│   │   │   │   │   └── logger.service.ts
│   │   │   │   └── redis
│   │   │   │   ├── redis.module.ts
│   │   │   │   ├── redis.repository.ts
│   │   │   │   ├── redis.service.ts
│   │   │   │   ├── redis.types.ts
│   │   │   │   └── repositories
│   │   │   │   ├── user-token.repository.ts
│   │   │   │   └── user.repository.ts
│   │   │   ├── main-cli.ts
│   │   │   ├── main.env.ts
│   │   │   ├── main.ts
│   │   │   ├── modules
│   │   │   │   ├── newsletter
│   │   │   │   │   ├── application
│   │   │   │   │   │   ├── get-emails.use-case.ts
│   │   │   │   │   │   └── get-newsletters.use-case.ts
│   │   │   │   │   ├── domain
│   │   │   │   │   │   ├── article.domain.ts
│   │   │   │   │   │   ├── email.domain.ts
│   │   │   │   │   │   ├── email.repository.interface.ts
│   │   │   │   │   │   ├── newsletter.domain.ts
│   │   │   │   │   │   └── newsletter.repository.ts
│   │   │   │   │   ├── infrastructure
│   │   │   │   │   │   ├── prisma-email.repository.ts
│   │   │   │   │   │   └── prisma-newsletter.repository.ts
│   │   │   │   │   ├── newsletter.module.ts
│   │   │   │   │   └── presentation
│   │   │   │   │   ├── mappers
│   │   │   │   │   │   ├── article.mapper.ts
│   │   │   │   │   │   ├── email.mapper.ts
│   │   │   │   │   │   └── newsletter.mapper.ts
│   │   │   │   │   └── newsletter.controller.ts
│   │   │   │   ├── projects
│   │   │   │   │   ├── application
│   │   │   │   │   │   ├── exceptions
│   │   │   │   │   │   │   └── label-already-exists.exception.ts
│   │   │   │   │   │   ├── guards
│   │   │   │   │   │   │   └── check-onboarding.guard.ts
│   │   │   │   │   │   └── use-cases
│   │   │   │   │   │   ├── create-project.use-case.ts
│   │   │   │   │   │   ├── get-project.use-case.ts
│   │   │   │   │   │   ├── setup
│   │   │   │   │   │   │   ├── setup-complete-onboarding.use-case.ts
│   │   │   │   │   │   │   ├── setup-filter.use-case.ts
│   │   │   │   │   │   │   ├── setup-project-label.use-case.ts
│   │   │   │   │   │   │   └── setup-test-email.use-case.ts
│   │   │   │   │   │   └── update-project-prompt.use-case.ts
│   │   │   │   │   ├── domain
│   │   │   │   │   │   ├── can-update-prompt.service.ts
│   │   │   │   │   │   ├── project-create.ts
│   │   │   │   │   │   ├── project-update.ts
│   │   │   │   │   │   ├── project.repository.interface.ts
│   │   │   │   │   │   └── project.ts
│   │   │   │   │   ├── infrastructure
│   │   │   │   │   │   └── prisma-project.repository.ts
│   │   │   │   │   ├── presentation
│   │   │   │   │   │   ├── controllers
│   │   │   │   │   │   │   ├── project-setup.controller.ts
│   │   │   │   │   │   │   └── projects.controller.ts
│   │   │   │   │   │   ├── mappers
│   │   │   │   │   │   │   ├── create-project.mapper.ts
│   │   │   │   │   │   │   └── project.mapper.ts
│   │   │   │   │   │   └── project-setup.dto.ts
│   │   │   │   │   └── projects.module.ts
│   │   │   │   └── users
│   │   │   │   ├── application
│   │   │   │   │   └── use-cases
│   │   │   │   │   ├── create-user.use-case.ts
│   │   │   │   │   ├── get-all-users.use-case.ts
│   │   │   │   │   └── get-user-by-id.use-case.ts
│   │   │   │   ├── domain
│   │   │   │   │   ├── user.domain.ts
│   │   │   │   │   └── user.repository.interface.ts
│   │   │   │   ├── infrastructure
│   │   │   │   │   ├── crypto.service.ts
│   │   │   │   │   └── prisma-user.repository.ts
│   │   │   │   ├── presentation
│   │   │   │   │   ├── user.mapper.ts
│   │   │   │   │   └── users.controller.ts
│   │   │   │   └── users.module.ts
│   │   │   ├── presentation
│   │   │   │   └── mapper.interface.ts
│   │   │   └── prisma
│   │   │   ├── prisma.module.ts
│   │   │   ├── prisma.service.ts
│   │   │   └── prisma.types.ts
│   │   ├── swagger.json
│   │   ├── test
│   │   │   ├── app.e2e-spec.ts
│   │   │   └── jest-e2e.json
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── frontend
│   ├── Dockerfile
│   ├── README.md
│   ├── app
│   │   ├── components
│   │   │   ├── Layout.tsx
│   │   │   ├── error-boundary.tsx
│   │   │   ├── icons
│   │   │   │   └── link.tsx
│   │   │   └── ui
│   │   │   ├── accordion.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── table.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   └── tooltip.tsx
│   │   ├── entry.client.tsx
│   │   ├── entry.server.tsx
│   │   ├── features
│   │   │   ├── auth
│   │   │   │   ├── auth-button.component.tsx
│   │   │   │   ├── auth.component.tsx
│   │   │   │   ├── auth.context.tsx
│   │   │   │   └── auth.store.ts
│   │   │   ├── dashboard
│   │   │   │   ├── custom-instructions
│   │   │   │   │   ├── custom-instructions-confirmation.component.tsx
│   │   │   │   │   ├── custom-instructions.component.tsx
│   │   │   │   │   ├── custom-instructions.store.ts
│   │   │   │   │   └── custom-instructions.type.ts
│   │   │   │   ├── dashboard.component.tsx
│   │   │   │   ├── dashboard.store.ts
│   │   │   │   ├── emails
│   │   │   │   │   ├── articles
│   │   │   │   │   │   └── article-row.component.tsx
│   │   │   │   │   ├── email-row.component.tsx
│   │   │   │   │   ├── emails.component.tsx
│   │   │   │   │   ├── emails.store.ts
│   │   │   │   │   └── emails.type.ts
│   │   │   │   ├── header-profile
│   │   │   │   │   ├── header-profile.component.tsx
│   │   │   │   │   ├── header-profile.store.ts
│   │   │   │   │   └── header-profile.type.ts
│   │   │   │   ├── newsletter-subscriptions
│   │   │   │   │   ├── newsletter-subscriptions.component.tsx
│   │   │   │   │   ├── newsletter-subscriptions.store.ts
│   │   │   │   │   └── newsletter-subscriptions.type.ts
│   │   │   │   ├── project
│   │   │   │   │   ├── project-alias.component.tsx
│   │   │   │   │   ├── project-alias.store.ts
│   │   │   │   │   └── project-alias.type.ts
│   │   │   │   └── upgrade-banner
│   │   │   │   ├── upgrade-banner.component.tsx
│   │   │   │   ├── upgrade-banner.store.ts
│   │   │   │   └── upgrade-banner.type.ts
│   │   │   └── onboarding
│   │   │   ├── onboarding.component.tsx
│   │   │   ├── onboarding.store.ts
│   │   │   └── onboarding.types.ts
│   │   ├── hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── interfaces
│   │   │   └── loadable.interface.ts
│   │   ├── lib
│   │   │   ├── api-error.ts
│   │   │   ├── api-fetcher.client.ts
│   │   │   ├── api-fetcher.ts
│   │   │   ├── utils.ts
│   │   │   ├── validator.test.ts
│   │   │   └── validator.ts
│   │   ├── root.tsx
│   │   ├── routes
│   │   │   ├── \_index.tsx
│   │   │   ├── admin.tsx
│   │   │   ├── dashboard.$projectNumber.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── login.tsx
│   │   │   ├── onboarding.\_index.tsx
│   │   │   └── settings.tsx
│   │   ├── stores
│   │   │   ├── root.provider.ts
│   │   │   └── root.store.ts
│   │   ├── tailwind.css
│   │   └── tests
│   │   ├── \_index.test.tsx
│   │   └── root.test.tsx
│   ├── components.json
│   ├── mobx.config.ts
│   ├── node_modules
│   │   ├── @le-journal
│   │   │   └── shared-types -> ../../../../packages/shared-types
│   │   ├── @radix-ui
│   │   │   ├── react-accordion -> ../../../../node_modules/.pnpm/@radix-ui+react-accordion@1.2.3*@types+react-dom@18.3.5_@types+react@18.3.18_react-dom@18.3.1_react@18.3.1/node*modules/@radix-ui/react-accordion
│   │   │   ├── react-dialog -> ../../../../node_modules/.pnpm/@radix-ui+react-dialog@1.1.6*@types+react-dom@18.3.5_@types+react@18.3.18_react-dom@18.3.1_react@18.3.1/node*modules/@radix-ui/react-dialog
│   │   │   ├── react-dropdown-menu -> ../../../../node_modules/.pnpm/@radix-ui+react-dropdown-menu@2.1.6*@types+react-dom@18.3.5_@types+react@18.3.18_react-dom@18.3.1_react@18.3.1/node*modules/@radix-ui/react-dropdown-menu
│   │   │   ├── react-hover-card -> ../../../../node_modules/.pnpm/@radix-ui+react-hover-card@1.1.6*@types+react-dom@18.3.5_@types+react@18.3.18_react-dom@18.3.1_react@18.3.1/node*modules/@radix-ui/react-hover-card
│   │   │   ├── react-separator -> ../../../../node_modules/.pnpm/@radix-ui+react-separator@1.1.2*@types+react-dom@18.3.5_@types+react@18.3.18_react-dom@18.3.1_react@18.3.1/node*modules/@radix-ui/react-separator
│   │   │   ├── react-slot -> ../../../../node_modules/.pnpm/@radix-ui+react-slot@1.1.2*@types+react@18.3.18_react@18.3.1/node*modules/@radix-ui/react-slot
│   │   │   ├── react-toast -> ../../../../node_modules/.pnpm/@radix-ui+react-toast@1.2.6*@types+react-dom@18.3.5_@types+react@18.3.18_react-dom@18.3.1_react@18.3.1/node*modules/@radix-ui/react-toast
│   │   │   └── react-tooltip -> ../../../../node_modules/.pnpm/@radix-ui+react-tooltip@1.1.8*@types+react-dom@18.3.5_@types+react@18.3.18_react-dom@18.3.1_react@18.3.1/node*modules/@radix-ui/react-tooltip
│   │   ├── @remix-run
│   │   │   ├── dev -> ../../../../node_modules/.pnpm/@remix-run+dev@2.15.3*@remix-run+react@2.15.3_@remix-run+serve@2.15.3_@types+node@22.13.4_typescript@5.7.3_vite@5.4.14/node*modules/@remix-run/dev
│   │   │   ├── node -> ../../../../node_modules/.pnpm/@remix-run+node@2.15.3_typescript@5.7.3/node_modules/@remix-run/node
│   │   │   ├── react -> ../../../../node_modules/.pnpm/@remix-run+react@2.15.3_react-dom@18.3.1_react@18.3.1_typescript@5.7.3/node_modules/@remix-run/react
│   │   │   ├── serve -> ../../../../node_modules/.pnpm/@remix-run+serve@2.15.3_typescript@5.7.3/node_modules/@remix-run/serve
│   │   │   └── testing -> ../../../../node_modules/.pnpm/@remix-run+testing@2.15.3_react-dom@18.3.1_react@18.3.1_typescript@5.7.3/node_modules/@remix-run/testing
│   │   ├── @testing-library
│   │   │   └── react -> ../../../../node_modules/.pnpm/@testing-library+react@16.2.0*@testing-library+dom@10.4.0_@types+react-dom@18.3.5_@types+reac*6r4o6igkeog75amib2npbuiobq/node_modules/@testing-library/react
│   │   ├── @types
│   │   │   ├── react -> ../../../../node_modules/.pnpm/@types+react@18.3.18/node_modules/@types/react
│   │   │   └── react-dom -> ../../../../node_modules/.pnpm/@types+react-dom@18.3.5*@types+react@18.3.18/node*modules/@types/react-dom
│   │   ├── @typescript-eslint
│   │   │   ├── eslint-plugin -> ../../../../node_modules/.pnpm/@typescript-eslint+eslint-plugin@6.21.0*@typescript-eslint+parser@6.21.0_eslint@8.57.1_typescript@5.7.3/node*modules/@typescript-eslint/eslint-plugin
│   │   │   └── parser -> ../../../../node_modules/.pnpm/@typescript-eslint+parser@6.21.0_eslint@8.57.1_typescript@5.7.3/node_modules/@typescript-eslint/parser
│   │   ├── autoprefixer -> ../../../node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.5.2/node_modules/autoprefixer
│   │   ├── class-transformer -> ../../../node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer
│   │   ├── class-validator -> ../../../node_modules/.pnpm/class-validator@0.14.1/node_modules/class-validator
│   │   ├── class-variance-authority -> ../../../node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority
│   │   ├── clsx -> ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx
│   │   ├── eslint -> ../../../node_modules/.pnpm/eslint@8.57.1/node_modules/eslint
│   │   ├── eslint-import-resolver-typescript -> ../../../node_modules/.pnpm/eslint-import-resolver-typescript@3.8.2_eslint-plugin-import@2.31.0_eslint@8.57.1/node_modules/eslint-import-resolver-typescript
│   │   ├── eslint-plugin-import -> ../../../node_modules/.pnpm/eslint-plugin-import@2.31.0*@typescript-eslint+parser@6.21.0_eslint-import-resolver-typescript@3.8.2_eslint@8.57.1/node*modules/eslint-plugin-import
│   │   ├── eslint-plugin-jsx-a11y -> ../../../node_modules/.pnpm/eslint-plugin-jsx-a11y@6.10.2_eslint@8.57.1/node_modules/eslint-plugin-jsx-a11y
│   │   ├── eslint-plugin-mobx -> ../../../node_modules/.pnpm/eslint-plugin-mobx@0.0.13_eslint@8.57.1/node_modules/eslint-plugin-mobx
│   │   ├── eslint-plugin-react -> ../../../node_modules/.pnpm/eslint-plugin-react@7.37.4_eslint@8.57.1/node_modules/eslint-plugin-react
│   │   ├── eslint-plugin-react-hooks -> ../../../node_modules/.pnpm/eslint-plugin-react-hooks@4.6.2_eslint@8.57.1/node_modules/eslint-plugin-react-hooks
│   │   ├── happy-dom -> ../../../node_modules/.pnpm/happy-dom@17.1.1/node_modules/happy-dom
│   │   ├── isbot -> ../../../node_modules/.pnpm/isbot@4.4.0/node_modules/isbot
│   │   ├── lucide-react -> ../../../node_modules/.pnpm/lucide-react@0.475.0_react@18.3.1/node_modules/lucide-react
│   │   ├── mobx -> ../../../node_modules/.pnpm/mobx@6.13.6/node_modules/mobx
│   │   ├── mobx-react-lite -> ../../../node_modules/.pnpm/mobx-react-lite@4.1.0_mobx@6.13.6_react-dom@18.3.1_react@18.3.1/node_modules/mobx-react-lite
│   │   ├── next-themes -> ../../../node_modules/.pnpm/next-themes@0.4.4_react-dom@18.3.1_react@18.3.1/node_modules/next-themes
│   │   ├── postcss -> ../../../node_modules/.pnpm/postcss@8.5.2/node_modules/postcss
│   │   ├── react -> ../../../node_modules/.pnpm/react@18.3.1/node_modules/react
│   │   ├── react-dom -> ../../../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom
│   │   ├── reflect-metadata -> ../../../node_modules/.pnpm/reflect-metadata@0.2.2/node_modules/reflect-metadata
│   │   ├── shadcn -> ../../../node_modules/.pnpm/shadcn@2.3.0_typescript@5.7.3/node_modules/shadcn
│   │   ├── sonner -> ../../../node_modules/.pnpm/sonner@1.7.4_react-dom@18.3.1_react@18.3.1/node_modules/sonner
│   │   ├── tailwind-merge -> ../../../node_modules/.pnpm/tailwind-merge@3.0.1/node_modules/tailwind-merge
│   │   ├── tailwindcss -> ../../../node_modules/.pnpm/tailwindcss@3.4.17/node_modules/tailwindcss
│   │   ├── tailwindcss-animate -> ../../../node_modules/.pnpm/tailwindcss-animate@1.0.7_tailwindcss@3.4.17/node_modules/tailwindcss-animate
│   │   ├── typescript -> ../../../node_modules/.pnpm/typescript@5.7.3/node_modules/typescript
│   │   ├── vaul -> ../../../node_modules/.pnpm/vaul@1.1.2*@types+react-dom@18.3.5_@types+react@18.3.18_react-dom@18.3.1_react@18.3.1/node*modules/vaul
│   │   ├── vite -> ../../../node_modules/.pnpm/vite@5.4.14*@types+node@22.13.4/node*modules/vite
│   │   ├── vite-tsconfig-paths -> ../../../node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.7.3_vite@5.4.14/node_modules/vite-tsconfig-paths
│   │   └── vitest -> ../../../node_modules/.pnpm/vitest@3.0.6*@types+node@22.13.4_happy-dom@17.1.1/node*modules/vitest
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── favicon.ico
│   ├── tailwind.config.ts
│   ├── test
│   │   ├── setup.ts
│   │   └── test-utils.ts
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── vitest.config.ts
├── commitlint.config.js
├── config.js
├── docker-compose.yml
├── documentations
│   ├── \_header.md
│   ├── instructions
│   │   ├── done
│   │   │   ├── auth-google-live-gen.md
│   │   │   ├── dashboard-to-api.md
│   │   │   ├── database
│   │   │   │   ├── generate-entities.md
│   │   │   │   ├── generate-seed-untested.md
│   │   │   │   └── generated-seed.md
│   │   │   ├── limite-prompt-update.md
│   │   │   ├── setup
│   │   │   │   ├── dashboard-skeleton.md
│   │   │   │   ├── security-features.md
│   │   │   │   ├── setup-linter.md
│   │   │   │   ├── setup-monorepo.md
│   │   │   │   └── setup-versionning.md
│   │   │   ├── shared-knowledge-base.md
│   │   │   ├── wireframe-en.md
│   │   │   └── wireframe-fr.md
│   │   ├── in-progress
│   │   └── todo
│   │   └── event-and-async.md
│   ├── knowledge.md
│   ├── knowledge.sh
│   ├── knowledge.txt
│   ├── libs
│   │   └── remix-2.5-documentation.md
│   └── specifications
│   ├── functional
│   │   ├── 1-project-description.md
│   │   ├── 2-main-features.md
│   │   └── 3-initial-scope.md
│   └── technical
│   ├── 0-tech-choices.md
│   ├── 1-commit.md
│   ├── 2-semantic-versioning.md
│   └── 3-urls.md
├── eslint.config.js
├── node_modules
│   ├── @commitlint
│   │   ├── cli -> ../.pnpm/@commitlint+cli@19.7.1*@types+node@22.13.4_typescript@5.7.3/node*modules/@commitlint/cli
│   │   └── config-conventional -> ../.pnpm/@commitlint+config-conventional@19.7.1/node_modules/@commitlint/config-conventional
│   ├── @eslint
│   │   ├── config-array -> ../.pnpm/@eslint+config-array@0.19.2/node_modules/@eslint/config-array
│   │   ├── core -> ../.pnpm/@eslint+core@0.11.0/node_modules/@eslint/core
│   │   ├── eslintrc -> ../.pnpm/@eslint+eslintrc@3.2.0/node_modules/@eslint/eslintrc
│   │   ├── js -> ../.pnpm/@eslint+js@9.20.0/node_modules/@eslint/js
│   │   ├── object-schema -> ../.pnpm/@eslint+object-schema@2.1.6/node_modules/@eslint/object-schema
│   │   └── plugin-kit -> ../.pnpm/@eslint+plugin-kit@0.2.6/node_modules/@eslint/plugin-kit
│   ├── @eslint-community
│   │   ├── eslint-utils -> ../.pnpm/@eslint-community+eslint-utils@4.4.1_eslint@8.57.1/node_modules/@eslint-community/eslint-utils
│   │   └── regexpp -> ../.pnpm/@eslint-community+regexpp@4.12.1/node_modules/@eslint-community/regexpp
│   ├── @nestjs
│   │   └── cli -> ../.pnpm/@nestjs+cli@11.0.4*@types+node@22.13.4/node*modules/@nestjs/cli
│   ├── @semantic-release
│   │   ├── changelog -> ../.pnpm/@semantic-release+changelog@6.0.3_semantic-release@24.2.3/node_modules/@semantic-release/changelog
│   │   ├── git -> ../.pnpm/@semantic-release+git@10.0.1_semantic-release@24.2.3/node_modules/@semantic-release/git
│   │   └── npm -> ../.pnpm/@semantic-release+npm@12.0.1_semantic-release@24.2.3/node_modules/@semantic-release/npm
│   ├── @types
│   │   ├── eslint -> ../.pnpm/@types+eslint@9.6.1/node_modules/@types/eslint
│   │   └── eslint-scope -> ../.pnpm/@types+eslint-scope@3.7.7/node_modules/@types/eslint-scope
│   ├── @typescript-eslint
│   │   ├── eslint-plugin -> ../.pnpm/@typescript-eslint+eslint-plugin@8.24.1*@typescript-eslint+parser@8.24.1_eslint@9.20.1_typescript@5.7.3/node*modules/@typescript-eslint/eslint-plugin
│   │   ├── parser -> ../.pnpm/@typescript-eslint+parser@8.24.1_eslint@9.20.1_typescript@5.7.3/node_modules/@typescript-eslint/parser
│   │   ├── scope-manager -> ../.pnpm/@typescript-eslint+scope-manager@6.21.0/node_modules/@typescript-eslint/scope-manager
│   │   ├── type-utils -> ../.pnpm/@typescript-eslint+type-utils@6.21.0_eslint@8.57.1_typescript@5.7.3/node_modules/@typescript-eslint/type-utils
│   │   ├── types -> ../.pnpm/@typescript-eslint+types@6.21.0/node_modules/@typescript-eslint/types
│   │   ├── typescript-estree -> ../.pnpm/@typescript-eslint+typescript-estree@6.21.0_typescript@5.7.3/node_modules/@typescript-eslint/typescript-estree
│   │   ├── utils -> ../.pnpm/@typescript-eslint+utils@6.21.0_eslint@8.57.1_typescript@5.7.3/node_modules/@typescript-eslint/utils
│   │   └── visitor-keys -> ../.pnpm/@typescript-eslint+visitor-keys@6.21.0/node_modules/@typescript-eslint/visitor-keys
│   ├── dotenv-cli -> .pnpm/dotenv-cli@8.0.0/node_modules/dotenv-cli
│   ├── eslint -> .pnpm/eslint@9.20.1/node_modules/eslint
│   ├── eslint-config-prettier -> .pnpm/eslint-config-prettier@10.0.1_eslint@9.20.1/node_modules/eslint-config-prettier
│   ├── eslint-import-resolver-node -> .pnpm/eslint-import-resolver-node@0.3.9/node_modules/eslint-import-resolver-node
│   ├── eslint-import-resolver-typescript -> .pnpm/eslint-import-resolver-typescript@3.8.2_eslint-plugin-import@2.31.0_eslint@9.20.1/node_modules/eslint-import-resolver-typescript
│   ├── eslint-module-utils -> .pnpm/eslint-module-utils@2.12.0*@typescript-eslint+parser@6.21.0_eslint-import-resolver-node@0.3.9*hh6zreuzvewql5hvb3zwh67wn4/node_modules/eslint-module-utils
│   ├── eslint-plugin-import -> .pnpm/eslint-plugin-import@2.31.0*@typescript-eslint+parser@8.24.1_eslint-import-resolver-typescript@3.8.2_eslint@9.20.1/node_modules/eslint-plugin-import
│   ├── eslint-plugin-jsx-a11y -> .pnpm/eslint-plugin-jsx-a11y@6.10.2_eslint@9.20.1/node_modules/eslint-plugin-jsx-a11y
│   ├── eslint-plugin-mobx -> .pnpm/eslint-plugin-mobx@0.0.13_eslint@9.20.1/node_modules/eslint-plugin-mobx
│   ├── eslint-plugin-nestjs -> .pnpm/eslint-plugin-nestjs@1.2.3/node_modules/eslint-plugin-nestjs
│   ├── eslint-plugin-prettier -> .pnpm/eslint-plugin-prettier@5.2.3_eslint-config-prettier@10.0.1_eslint@9.20.1_prettier@3.5.1/node_modules/eslint-plugin-prettier
│   ├── eslint-plugin-react -> .pnpm/eslint-plugin-react@7.37.4_eslint@9.20.1/node_modules/eslint-plugin-react
│   ├── eslint-plugin-react-hooks -> .pnpm/eslint-plugin-react-hooks@5.1.0_eslint@9.20.1/node_modules/eslint-plugin-react-hooks
│   ├── eslint-plugin-security -> .pnpm/eslint-plugin-security@3.0.1/node_modules/eslint-plugin-security
│   ├── eslint-scope -> .pnpm/eslint-scope@7.2.2/node_modules/eslint-scope
│   ├── eslint-visitor-keys -> .pnpm/eslint-visitor-keys@3.4.3/node_modules/eslint-visitor-keys
│   ├── globals -> .pnpm/globals@15.15.0/node_modules/globals
│   ├── husky -> .pnpm/husky@9.1.7/node_modules/husky
│   ├── prettier -> .pnpm/prettier@3.5.1/node_modules/prettier
│   ├── prettier-linter-helpers -> .pnpm/prettier-linter-helpers@1.0.0/node_modules/prettier-linter-helpers
│   ├── renovate -> .pnpm/renovate@39.175.2_typanion@3.14.0/node_modules/renovate
│   ├── semantic-release -> .pnpm/semantic-release@24.2.3_typescript@5.7.3/node_modules/semantic-release
│   ├── toml-eslint-parser -> .pnpm/toml-eslint-parser@0.10.0/node_modules/toml-eslint-parser
│   ├── turbo -> .pnpm/turbo@2.4.2/node_modules/turbo
│   └── typescript-eslint -> .pnpm/typescript-eslint@8.24.1_eslint@9.20.1_typescript@5.7.3/node_modules/typescript-eslint
├── package.json
├── packages
│   └── shared-types
│   ├── node_modules
│   │   ├── class-transformer -> ../../../node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer
│   │   ├── class-validator -> ../../../node_modules/.pnpm/class-validator@0.14.1/node_modules/class-validator
│   │   ├── reflect-metadata -> ../../../node_modules/.pnpm/reflect-metadata@0.2.2/node_modules/reflect-metadata
│   │   ├── tsup -> ../../../node_modules/.pnpm/tsup@8.3.6_typescript@5.7.3/node_modules/tsup
│   │   └── typescript -> ../../../node_modules/.pnpm/typescript@5.7.3/node_modules/typescript
│   ├── package.json
│   ├── src
│   │   ├── article.class.ts
│   │   ├── email.class.ts
│   │   ├── error.class.ts
│   │   ├── index.ts
│   │   ├── newsletter.class.ts
│   │   ├── project-create.class.ts
│   │   ├── project-update-instructions.class.ts
│   │   ├── project.class.ts
│   │   └── user.class.ts
│   └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── scripts
│   └── git-hooks
│   └── validate-branch-name.sh
├── tsconfig.json
└── turbo.json

315 directories, 288 files

2025-02-19 23:21:51
