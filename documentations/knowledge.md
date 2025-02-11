---
date: 2025-02-11 09:04:10
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
    "shared": "pnpm --filter shared-types run",
    "front": "pnpm --filter frontend run",
    "back": "pnpm --filter backend run",
    "document": "zsh ./documentations/knowledge.sh",
    "build": "turbo run build",
    "dev": "docker-compose up --build -d && turbo run dev",
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
    "check": "pnpm run dev:docker && pnpm run lint:fix && pnpm run format:fix && pnpm build && pnpm typecheck &&  pnpm test",
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
    "@radix-ui/react-tooltip": "^1.1.8",
    "@remix-run/node": "^2.15.3",
    "@remix-run/react": "^2.15.3",
    "@remix-run/serve": "^2.15.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "eslint-plugin-mobx": "^0.0.13",
    "isbot": "^4.1.0",
    "lucide-react": "^0.475.0",
    "mobx": "^6.13.6",
    "mobx-react-lite": "^4.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
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
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
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
    "prisma:seed": "prisma migrate reset --force",
    "prisma:test:reset": "dotenv -e .env.test -- prisma migrate reset --force"
  },
  "dependencies": {
    "@le-journal/shared-types": "workspace:*",
    "@nestjs/common": "^11.0.7",
    "@nestjs/core": "^11.0.7",
    "@nestjs/mapped-types": "^2.1.0",
    "@nestjs/platform-express": "^11.0.7",
    "@nestjs/swagger": "^11.0.3",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "nest-winston": "^1.10.2",
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

model User {
  id         String   @id @default(uuid())
  email      String   @unique
  name       String?
  created_at DateTime @default(now()) @map("created_at")
  updated_at DateTime @updatedAt @map("updated_at")

  // Relations
  projects     Project[]
  newsletters  Newsletter[]
  transactions Transaction[]

  @@map("users")
  @@index([email])
}

model Project {
  id                 String   @id @default(uuid())
  user_id           String
  project_number    Int
  name              String
  slug              String
  newsletter_alias  String   @unique @map("newsletter_alias")
  prompt_instruction String   @default("") @db.Text @map("prompt_instruction")
  created_at        DateTime @default(now()) @map("created_at")

  user   User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]
  newsletters Newsletter[]

  @@unique([user_id, project_number])
  @@unique([user_id, slug])
  @@unique([user_id, name])
  @@map("projects")
  @@index([user_id])
}

model Newsletter {
  id           String   @id @default(uuid())
  user_id     String
  project_id  String
  email       String
  subscribed_at DateTime @default(now()) @map("subscribed_at")
  subscription_status SubscriptionStatus @default(ACTIVE) @map("subscription_status")

project Project @relation(fields: [project_id], references: [id], onDelete: Cascade)
  user   User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]

  @@map("newsletters")
  @@index([user_id])
  @@index([email])
}

model Email {
  id           String      @id @default(uuid())
  project_id   String
  newsletter_id String      @map("newsletter_id")
  subject      String
  raw_content  String      @db.Text @map("raw_content")
  received_at  DateTime    @default(now()) @map("received_at")
  status       EmailStatus

  project    Project    @relation(fields: [project_id], references: [id], onDelete: Cascade)
  newsletter Newsletter @relation(fields: [newsletter_id], references: [id], onDelete: Cascade)
  articles   Article[]

  @@map("emails")
  @@index([project_id])
  @@index([newsletter_id])
  @@index([subject])
}

model Article {
  id               String   @id @default(uuid())
  email_id         String
  title            String
  description      String   @db.Text
  url              String
  content          String   @db.Text
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
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

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
  # meilisearch_data:
```

### .cursor/rules/rule-backend-code-generation.mdc

````mdc
---
description: Backend code generation
globs: **/apps/backend/**/*.ts
---
## Backend code generation

> When creating or updating backend code, please follow those rules:

### Controllers
- No direct CRUD, use domain-driven use-cases.
- Document with Swagger, in English.
- Validate received data with `ValidationPipe` and `transform`
- Always returns DTOs.

### Exceptions
- Throw exception the more you can.
- Always be specific, error message must contain input parameters for easy debuging.
- Use NestJS or the framework exceptions when technical.
- Create custom exceptions when domain specific.

### Backend : Use-cases
-

### Logging
- Avoid "logger.error()", throw Exception instead (because logger catchs exceptions).
- On use-cases: log `debug` the input, log `success` the output.

Loging use-case example:
```ts
  async execute(projectId: string, promptInstruction: string): Promise<Project> {
    this.logger.debug(`Updating Project Prompt`, this.constructor.name, {
      projectId,
      promptInstruction,
    });

    const project = await this.projectRepository.findById(projectId);

    if (project === null) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    const updatedProject = await this.projectRepository.update(projectId, { promptInstruction });

    this.logger.success(`Project Prompt Updated`, this.constructor.name, {
      projectId,
      promptInstruction: updatedProject.prompt_instruction,
    });

    return updatedProject;
  }
```

### DTO
- Everything in subclass
- Prisma Model is imported with `Model` suffix (e.g `import { Prisma, User as UserModel } from '@prisma/client';`)
- Create and Update DTOs are always implementing Prisma's corresponding interface (e.g. `export class CreateUserDto implements Prisma.UserCreateInput`)
- - Document with Swagger (NestJS), in English.
- Only use DTO for creations, updates, no "output or response DTO"
- Map fields individually (e.g `this.id = user.id` in constructor), no `Object.assign` etc.
- Use `class-validator` and `Swagger` documentation with annotations on fields.
- DTOs always implements interfaces in `shared-types` to ensure frontend <-> backend type coherence.

Example of files structure:
```text
├── application
│   ├── create-project.use-case.ts
│   ├── get-project.use-case.ts
│   └── update-project-prompt.use-case.ts
├── domain
│   └── project.repository.interface.ts
├── infrastructure
│   └── prisma-project.repository.ts
├── presentation
│   ├── projects.controller.ts
│   └── project.dto.ts
└── projects.module.ts
```


````

### .cursor/rules/rule-backend-tests.mdc

```mdc
---
description: Apply them when creating or modifying tests
globs: apps/backend/**/*.ts
---
Backend tests rules:
- Jest for testing.
- Integration tests must not create data directly (use seed.ts).
- No "retries".

Backend tests (integration):
- Always test controller to have the max coverrage.

Backend tests with data:
- Seed are used as fixtures, data already set up.
- Never call Prisma directly in tests, use repository if needed.
```

### .cursor/rules/rule-frontend-components.mdc

````mdc
---
description: Frontend : Coding components, stores,  etc.
globs: apps/frontend/**.ts, apps/frontend/**.tsx
---
## Frontend : Components rules
- Apply the Smart/Dumb pattern:
  - Smart components (stateful, using MobX stores)
  - Dumb components (pure UI).
- No default export for components.
- Export static `displayName` at the bottom.
- All actions, computations, and transformations (such as filtering, must be stored in variables at the top of the file (expect for className).
  - Do not overinterpret, e.g. this code in not necessary nor helpful `const shouldShowContent = hasArticles; const articles = email.articles;`

## Frontend : Files architecture
- Structure: Organize by feature in folders.
Example for a user profile component:
```text
user-profile/
| user-profile.component.tsx # minimal logic, only UI component
| user-profile-menu.component.tsx # minimal logic, only UI component
| user-profile.store.ts # for actions, computed, reactions...
| user-profile.hook.ts # if necessary
| user-profile.context.ts # if necessary, for providers
| user-profile.mock.ts # test data for UI
| user-profile.type.ts # for store types: state, actions...
```

## Frontend State Management (MobX)
- Use mobx-react-lite and makeAutoObservable.
- Use runInAction for async or reactive effects.
- Use computed properties for derived state and actions for modifications.
- Create a factory at the bottom of each store (e.g. `export const createProjectStore = (): ProjectStore => new ProjectStore();`)
- Inject the store into the parent component to facilitate state management.


````

### .cursor/rules/rule-frontend-global.mdc

```mdc
---
description: Frontend : Always apply those rules
globs: apps/frontend/**
---
- Remix only, no NextJS.
- Root imports with /~.
- Test with Vitest.
- Use Vite, not Webpack.
- ESLint with flat config.
- Use versions in [package.json](mdc:apps/frontend/package.json).
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

### .cursor/rules/rule-global-code-generation.mdc

```mdc
---
description: Global : Code generation
globs: **/*.ts, **/*.tsx
---

Language:
- English for everything.
- French only in UI (labels, texts...)

Sharing code:
- Place shared data types in `packages/shared-types`.
- One file per type, export everything from [index.ts](mdc:packages/shared-types/src/index.ts).

Simplified code:
- Use explicit constants instead of magic numbers.
- Write clear and simple conditions, avoid double negatives.
- Prioritize readable variable names, even if long.
- Simplify loops using map(), filter(), or reduce().
- Type safe code.

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
- Anemic models (avoid trivial getId/setId).
- Function names with no actions (avoid `setUsers`, prefer `loadUsers`).
- No interface prefix `IUser` or type suffix `UserType`.

Lint & Error
- Follow @typescript-eslint/strict-boolean-expressions (avoid if(!obj)).
- Catch errors with catch(error: unknown | Error).
- On frontend, use apps/frontend/app/utils/api/error.ts to handle errors.
```

### .cursor/rules/rule-global-installation.mdc

```mdc
---
description: Global : Package installations
globs: **/*.json
---
- Use Node, never Express.
- Check all packages versions every time:
    - root monorepo: [package.json](mdc:package.json)
    - backend: [package.json](mdc:apps/backend/package.json)
    - frontend: [package.json](mdc:apps/frontend/package.json)
    - shared-types: [package.json](mdc:packages/shared-types/package.json)
- Ask before adding new packages.
- Use PNPM with the latest version.
```

### Project Structure

```text
.
./.cursor
./.cursor/rules
./.cursor/rules/rule-backend-code-generation.mdc
./.cursor/rules/rule-backend-tests.mdc
./.cursor/rules/rule-frontend-components.mdc
./.cursor/rules/rule-frontend-global.mdc
./.cursor/rules/rule-frontend-remix-loaders.mdc
./.cursor/rules/rule-global-code-generation.mdc
./.cursor/rules/rule-global-installation.mdc
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
./apps/backend/prisma/migrations/migration_lock.toml
./apps/backend/prisma/schema.prisma
./apps/backend/prisma/seed.ts
./apps/backend/prisma/seeds
./apps/backend/prisma/seeds/articles.seed.ts
./apps/backend/prisma/seeds/emails.seed.ts
./apps/backend/prisma/seeds/newsletters.seed.ts
./apps/backend/prisma/seeds/projects.seed.ts
./apps/backend/prisma/seeds/transactions.seed.ts
./apps/backend/prisma/seeds/users.seed.ts
./apps/backend/src
./apps/backend/src/app.controller.spec.ts
./apps/backend/src/app.controller.ts
./apps/backend/src/app.module.ts
./apps/backend/src/app.service.ts
./apps/backend/src/config
./apps/backend/src/config/config.module.ts
./apps/backend/src/features
./apps/backend/src/features/newsletter
./apps/backend/src/features/newsletter/application
./apps/backend/src/features/newsletter/application/use-cases
./apps/backend/src/features/newsletter/application/use-cases/get-emails.use-case.ts
./apps/backend/src/features/newsletter/application/use-cases/get-newsletters.use-case.ts
./apps/backend/src/features/newsletter/application/use-cases/search-emails.use-case.ts
./apps/backend/src/features/newsletter/domain
./apps/backend/src/features/newsletter/domain/repositories
./apps/backend/src/features/newsletter/domain/repositories/email.repository.interface.ts
./apps/backend/src/features/newsletter/infrastructure
./apps/backend/src/features/newsletter/infrastructure/repositories
./apps/backend/src/features/newsletter/infrastructure/repositories/prisma-email.repository.ts
./apps/backend/src/features/newsletter/newsletter.module.ts
./apps/backend/src/features/newsletter/presentation
./apps/backend/src/features/newsletter/presentation/controllers
./apps/backend/src/features/newsletter/presentation/controllers/newsletter.controller.integration.spec.ts
./apps/backend/src/features/newsletter/presentation/controllers/newsletter.controller.ts
./apps/backend/src/features/newsletter/presentation/dtos
./apps/backend/src/features/newsletter/presentation/dtos/article.dto.ts
./apps/backend/src/features/newsletter/presentation/dtos/email.dto.ts
./apps/backend/src/features/newsletter/presentation/dtos/newsletter.dto.ts
./apps/backend/src/features/projects
./apps/backend/src/features/projects/application
./apps/backend/src/features/projects/application/use-cases
./apps/backend/src/features/projects/application/use-cases/create-project.use-case.ts
./apps/backend/src/features/projects/application/use-cases/get-project.use-case.ts
./apps/backend/src/features/projects/application/use-cases/update-project-prompt.use-case.ts
./apps/backend/src/features/projects/domain
./apps/backend/src/features/projects/domain/repositories
./apps/backend/src/features/projects/domain/repositories/project.repository.interface.ts
./apps/backend/src/features/projects/infrastructure
./apps/backend/src/features/projects/infrastructure/repositories
./apps/backend/src/features/projects/infrastructure/repositories/prisma-project.repository.ts
./apps/backend/src/features/projects/presentation
./apps/backend/src/features/projects/presentation/controllers
./apps/backend/src/features/projects/presentation/controllers/projects.controller.ts
./apps/backend/src/features/projects/presentation/dtos
./apps/backend/src/features/projects/presentation/dtos/project.dto.ts
./apps/backend/src/features/projects/projects.module.ts
./apps/backend/src/features/users
./apps/backend/src/features/users/application
./apps/backend/src/features/users/application/use-cases
./apps/backend/src/features/users/application/use-cases/create-user.use-case.ts
./apps/backend/src/features/users/application/use-cases/get-all-users.use-case.ts
./apps/backend/src/features/users/application/use-cases/get-user.use-case.ts
./apps/backend/src/features/users/application/use-cases/update-user.use-case.ts
./apps/backend/src/features/users/domain
./apps/backend/src/features/users/domain/repositories
./apps/backend/src/features/users/domain/repositories/user.repository.interface.ts
./apps/backend/src/features/users/infrastructure
./apps/backend/src/features/users/infrastructure/repositories
./apps/backend/src/features/users/infrastructure/repositories/prisma-user.repository.ts
./apps/backend/src/features/users/presentation
./apps/backend/src/features/users/presentation/controllers
./apps/backend/src/features/users/presentation/controllers/users.controller.integration.spec.ts
./apps/backend/src/features/users/presentation/controllers/users.controller.ts
./apps/backend/src/features/users/presentation/dtos
./apps/backend/src/features/users/presentation/dtos/user.dto.ts
./apps/backend/src/features/users/users.module.ts
./apps/backend/src/infrastructure
./apps/backend/src/infrastructure/logging
./apps/backend/src/infrastructure/logging/logger.config.ts
./apps/backend/src/infrastructure/logging/logger.filter.ts
./apps/backend/src/infrastructure/logging/logger.module.ts
./apps/backend/src/infrastructure/logging/logger.service.ts
./apps/backend/src/main.ts
./apps/backend/src/prisma
./apps/backend/src/prisma/prisma.module.ts
./apps/backend/src/prisma/prisma.service.ts
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
./apps/frontend/app/components/ui/tooltip.tsx
./apps/frontend/app/entry.client.tsx
./apps/frontend/app/entry.server.tsx
./apps/frontend/app/features
./apps/frontend/app/features/dashboard
./apps/frontend/app/features/dashboard/custom-prompt
./apps/frontend/app/features/dashboard/custom-prompt/custom-prompt.component.tsx
./apps/frontend/app/features/dashboard/custom-prompt/custom-prompt.store.ts
./apps/frontend/app/features/dashboard/custom-prompt/custom-prompt.type.ts
./apps/frontend/app/features/dashboard/dashboard.component.tsx
./apps/frontend/app/features/dashboard/dashboard.context.tsx
./apps/frontend/app/features/dashboard/dashboard.loader.ts
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
./apps/frontend/app/features/dashboard/project/project.store.ts
./apps/frontend/app/features/dashboard/project/project.type.ts
./apps/frontend/app/features/dashboard/upgrade-banner
./apps/frontend/app/features/dashboard/upgrade-banner/upgrade-banner.component.tsx
./apps/frontend/app/features/dashboard/upgrade-banner/upgrade-banner.store.ts
./apps/frontend/app/features/dashboard/upgrade-banner/upgrade-banner.type.ts
./apps/frontend/app/features/onboarding
./apps/frontend/app/features/onboarding/components
./apps/frontend/app/features/onboarding/components/StepForm.tsx
./apps/frontend/app/features/onboarding/components/StepNavigation.tsx
./apps/frontend/app/features/onboarding/components/StepProgression.tsx
./apps/frontend/app/features/onboarding/components/steps
./apps/frontend/app/features/onboarding/components/steps/StepFinish.tsx
./apps/frontend/app/features/onboarding/components/steps/StepPermissions.tsx
./apps/frontend/app/features/onboarding/components/steps/StepSetup.tsx
./apps/frontend/app/features/onboarding/components/steps/StepWelcome.tsx
./apps/frontend/app/features/onboarding/components/steps/index.ts
./apps/frontend/app/features/onboarding/stores
./apps/frontend/app/features/onboarding/stores/onboardingStore.ts
./apps/frontend/app/hooks
./apps/frontend/app/hooks/use-mobile.tsx
./apps/frontend/app/lib
./apps/frontend/app/lib/utils.ts
./apps/frontend/app/root.tsx
./apps/frontend/app/routes
./apps/frontend/app/routes/_index.tsx
./apps/frontend/app/routes/admin.tsx
./apps/frontend/app/routes/dashboard.$projectNumber.tsx
./apps/frontend/app/routes/dashboard.tsx
./apps/frontend/app/routes/onboarding.$step.tsx
./apps/frontend/app/routes/onboarding._index.tsx
./apps/frontend/app/routes/settings.tsx
./apps/frontend/app/stores
./apps/frontend/app/stores/globalStore.ts
./apps/frontend/app/tailwind.css
./apps/frontend/app/tests
./apps/frontend/app/tests/_index.test.tsx
./apps/frontend/app/tests/root.test.tsx
./apps/frontend/app/types
./apps/frontend/app/types/loadable.ts
./apps/frontend/app/utils
./apps/frontend/app/utils/api
./apps/frontend/app/utils/api/error.ts
./apps/frontend/app/utils/api/fetcher.ts
./apps/frontend/app/utils/assertions.ts
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
./documentations/instructions/in-progress/form-and-security.md
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
./packages/shared-types/src/article.ts
./packages/shared-types/src/email.ts
./packages/shared-types/src/index.ts
./packages/shared-types/src/newsletter.ts
./packages/shared-types/src/project.ts
./packages/shared-types/src/user.ts
./packages/shared-types/tsconfig.json
./pnpm-lock.yaml
./pnpm-workspace.yaml
./scripts
./scripts/git-hooks
./scripts/git-hooks/validate-branch-name.sh
./tsconfig.json
./turbo.json

108 directories, 257 files
```

2025-02-11 09:04:10
