---
date: 2025-02-09 14:15:07
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

---


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
- `/auth/callback` → **Callback Google OAuth** _(Stockage des tokens après connexion)_

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
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "document": "sh ./documentations/knowledge.sh",
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
    "test": "dotenv -e .env.test -- jest --config jest.config.ts --coverage",
    "test:watch": "jest --config jest.config.ts --watch --coverage",
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
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
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
  prompt_instruction String? @db.Text @map("prompt_instruction")
  created_at        DateTime @default(now()) @map("created_at")

  user   User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]

  @@unique([user_id, project_number])
  @@unique([user_id, slug])
  @@unique([user_id, name])
  @@map("projects")
  @@index([user_id])
}

model Newsletter {
  id           String   @id @default(uuid())
  user_id     String
  email       String
  subscribed_at DateTime @default(now()) @map("subscribed_at")
  subscription_status SubscriptionStatus @default(ACTIVE) @map("subscription_status")

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
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
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

### .cursor/rules/global.mdc

```mdc
---
description: Global rules when generating code.
globs: 
---
# Roles

- You are the AI Editor, responsible of coding a high quality code.

# Installation

- Always use latest available version of packages.
- Use PNPM
- Always ask before installation new packages.

# Code generation

- **Strict Type for every variables, functions and components.**
- Minimal file size.
- Use single responsibility principle.
- Never generate anemic models, `setId()`, `getId()` functions are forbidden.
- Never comment code, except for complexe logic, interfaces, configuration.

## Data fetching

- Use loaders.
- Use defer whenever possible.
- Use [fetcher.ts](mdc:apps/frontend/app/utils/api/fetcher.ts) (add routes if necessary).

# Tests

- Never generate Retires!

## Error

- Type `catch(error: unknown)`
- Use [error.ts](mdc:apps/frontend/app/utils/api/error.ts) to handle errors.

## Lint

- Respect `eslint@typescript-eslint/strict-boolean-expressions`, do not `if (!obj)`, prefer ` if (obj === null)`.

# Functions

- Must reflect user actions.
- Focus on use-case.
- Avoid technical names:
  - No `setNewsletters()`, `loadNewsletters()` is a true user action
  - Prefer domain actions.

# Bug finding

- Alaways propose top 3 solutions.
- Indicate confidence score.
- Ask user to choose.

# Common types

- Data type that are used from backend api to frontend components must be in "packages/shared-types".
- Must be focused on feature, small sub-types only are allowed.
- Prefer one file per type.
- Export must be made in [index.ts](mdc:packages/shared-types/src/index.ts).

# Interfaces and Types

- No prefix for interfaces (e.g. no `IUser`).
- No suffix for types (e.g. no `UserType`)```

### .cursor/rules/frontend.mdc

```mdc
---
description: Rules for frontend code
globs: apps/frontend/**
---
# Frontends Rules

- Use versions from [package.json](mdc:apps/frontend/package.json)
- use "/~" for root import.
- Use English and domain language everywhere.
- French language is use only in components for end-users.

## State

- Use Smart/Dump component pattern:
  - Smart : MobX for state.
  - Dump : React Component, only the UI, minimal logic.
- No React Hook only if stricly necessary.
Use "mobx-react-lite" instead of "mobx-react".
- Use "mobx" for core.
- Use `makeAutoObservable`, no annotations.
- Computed for Derived State.
- Actions to Modify State.
- runInAction for Side Effects (especially when async) and Reactions.
- Split store in feature the more you can. No large stores, split by parent > children logic.

## Store creation

- Remember to generate factory at the bottom of a store.
  - Use that comment before: `// eslint-disable-next-line @typescript-eslint/explicit-function-return-type`
- Inject that store in the parent.
- Use static displayName when creating new component.

## Architecture

- A feature can contain sub-features. It follows same architectural folder structure.
- Use feature based folder structure.
 
Example:
```text
user-profile/
| user-profile.component.tsx # minimal logic, only UI component
| user-profile.store.ts # for actions, computed, reactions...
| user-profile.hook.ts # if necessary
| user-profile.context.ts # if necessary, for providers
| user-profile.mock.ts # test data for UI
| user-profile.type.ts # for store types: state, actions...
```

Example:
```text
newsletter.ts
user.ts
article.ts
profile.ts
```

## Remix

- Always use "Remix" instead of "NextJS".
- Use "@remix-run/node" for server rendering.
- Use "@remix-run/react" for client rendering.

### Remix Loaders

- Loader are direct children of features (e.g. `features/dashboard/dashboard.loader.ts`)
- Never return json(), return plain objects instead.

## Testing

- Test with Vitest.

## Config

- Use "Vite" instead of "Webpack".
- Use "eslint.config.js" with flat config when using Eslint.```

### .cursor/rules/backend.mdc

```mdc
---
description: Rules for backend changes.
globs: apps/backend/**
---

# Backend Rules

- Check versions in [package.json](mdc:apps/backend/package.json) before generating code.
- Language is English for everything!
- Use Node, never Express.

## Rest API controllers

- No CRUD, create use-cases.
- Fully Document API using Swagger annotations with NestJS.
- Use-cases must be linked to controllers.

### DTOs

- Constructor is mapping data from Prisma to DTO type, not `Object.assign`, full mapping.
- Use Prisma prefix when getting type (e.g. `import { Prisma, User as PrismaUser } from '@prisma/client';`).
- DTOs implements its sibling in "shared-types".
- Use DTOs with Validation and APIProperties from Swagger.
- Swagger doc in english.

## Use-cases

- Domain and feature focused.

## Repository

- For update and creation, use DTOs.

## Mapping

- No mapper, using mapped-types.
- No ValueObject, use DTOs.

## Testing

- Use Jest.

### Integration tests

- Do not create anything, always use [seed.ts](mdc:apps/backend/prisma/seed.ts).
- Always test use-cases.
- Uso DTOs to instanciate object when testing use-cases.
- Never use Prisma directly, no repositories, no Prisma services.

## Examples

- Use english examples.```

2025-02-09 14:15:07
