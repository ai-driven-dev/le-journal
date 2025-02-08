
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
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "happy-dom": "^17.0.0",
    "postcss": "^8.4.38",
    "shadcn": "^2.3.0",
    "shadcn-cli": "^0.0.6",
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


{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "prisma": "prisma generate && prisma migrate deploy",
    "prisma:init": "prisma migrate dev --name init",
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
    "typecheck": "tsc --noEmit",
    "prisma:seed": "ts-node prisma/seed.ts"
  },
  "dependencies": {
    "@le-journal/shared-types": "workspace:*",
    "@nestjs/common": "^11.0.7",
    "@nestjs/core": "^11.0.7",
    "@nestjs/platform-express": "^11.0.7",
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
}

enum SubscriptionStatus {
  ACTIVE
  PENDING
  CANCELLED
  EXPIRED
}

enum EmailStatus {
  RECEIVED
  PROCESSED
  FAILED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum PaymentMethod {
  CREDIT_CARD
  PAYPAL
  BANK_TRANSFER
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  profile                 UserProfile?
  projects               Project[]
  newsletterSubscriptions NewsletterSubscription[]
  transactions           Transaction[]

  @@index([email])
}

model Project {
  id             String   @id @default(uuid())
  user_id        String
  project_number Int      @unique
  name           String   @unique
  slug           String   @unique
  created_at     DateTime @default(now())

  user   User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]

  @@index([user_id])
}

model UserProfile {
  id                      String           @id @default(uuid())
  user_id                 String           @unique
  subscription_plan       SubscriptionPlan
  newsletter_email_alias  String
  prompt_instruction      String           @db.Text
  gmail_alias_folder_url  String

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([user_id])
}

model NewsletterSubscription {
  id                  String             @id @default(uuid())
  user_id             String
  newsletter_name     String
  newsletter_email    String
  newsletter_url      String
  status              SubscriptionStatus
  subscribed_at       DateTime           @default(now())

  user   User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]

  @@index([user_id])
  @@index([newsletter_email])
}

model Email {
  id                        String   @id @default(uuid())
  project_id                String
  newsletter_subscription_id String
  subject                   String
  raw_content               String   @db.Text
  received_at               DateTime @default(now())
  status                    EmailStatus

  project                 Project                @relation(fields: [project_id], references: [id], onDelete: Cascade)
  newsletterSubscription  NewsletterSubscription @relation(fields: [newsletter_subscription_id], references: [id], onDelete: Cascade)
  news                   News[]

  @@index([project_id])
  @@index([newsletter_subscription_id])
  @@index([subject])
}

model News {
  id                String   @id @default(uuid())
  email_id          String
  title             String
  description       String   @db.Text
  url               String
  content           String   @db.Text
  relevance_score   Float
  extracted_at      DateTime @default(now())

  email Email @relation(fields: [email_id], references: [id], onDelete: Cascade)

  @@index([email_id])
}

model Transaction {
  id                String        @id @default(uuid())
  user_id           String
  stripe_payment_id String
  amount            Decimal
  currency          String
  status            PaymentStatus
  payment_method    PaymentMethod
  payment_date      DateTime      @default(now())
  invoice_url       String

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([user_id])
  @@index([stripe_payment_id])
}


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
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "happy-dom": "^17.0.0",
    "postcss": "^8.4.38",
    "shadcn": "^2.3.0",
    "shadcn-cli": "^0.0.6",
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
    "prisma": "prisma generate && prisma migrate deploy",
    "prisma:init": "prisma migrate dev --name init",
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
    "typecheck": "tsc --noEmit",
    "prisma:seed": "ts-node prisma/seed.ts"
  },
  "dependencies": {
    "@le-journal/shared-types": "workspace:*",
    "@nestjs/common": "^11.0.7",
    "@nestjs/core": "^11.0.7",
    "@nestjs/platform-express": "^11.0.7",
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
}

enum SubscriptionStatus {
  ACTIVE
  PENDING
  CANCELLED
  EXPIRED
}

enum EmailStatus {
  RECEIVED
  PROCESSED
  FAILED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum PaymentMethod {
  CREDIT_CARD
  PAYPAL
  BANK_TRANSFER
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  profile                 UserProfile?
  projects               Project[]
  newsletterSubscriptions NewsletterSubscription[]
  transactions           Transaction[]

  @@index([email])
}

model Project {
  id             String   @id @default(uuid())
  user_id        String
  project_number Int      @unique
  name           String   @unique
  slug           String   @unique
  created_at     DateTime @default(now())

  user   User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]

  @@index([user_id])
}

model UserProfile {
  id                      String           @id @default(uuid())
  user_id                 String           @unique
  subscription_plan       SubscriptionPlan
  newsletter_email_alias  String
  prompt_instruction      String           @db.Text
  gmail_alias_folder_url  String

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([user_id])
}

model NewsletterSubscription {
  id                  String             @id @default(uuid())
  user_id             String
  newsletter_name     String
  newsletter_email    String
  newsletter_url      String
  status              SubscriptionStatus
  subscribed_at       DateTime           @default(now())

  user   User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]

  @@index([user_id])
  @@index([newsletter_email])
}

model Email {
  id                        String   @id @default(uuid())
  project_id                String
  newsletter_subscription_id String
  subject                   String
  raw_content               String   @db.Text
  received_at               DateTime @default(now())
  status                    EmailStatus

  project                 Project                @relation(fields: [project_id], references: [id], onDelete: Cascade)
  newsletterSubscription  NewsletterSubscription @relation(fields: [newsletter_subscription_id], references: [id], onDelete: Cascade)
  news                   News[]

  @@index([project_id])
  @@index([newsletter_subscription_id])
  @@index([subject])
}

model News {
  id                String   @id @default(uuid())
  email_id          String
  title             String
  description       String   @db.Text
  url               String
  content           String   @db.Text
  relevance_score   Float
  extracted_at      DateTime @default(now())

  email Email @relation(fields: [email_id], references: [id], onDelete: Cascade)

  @@index([email_id])
}

model Transaction {
  id                String        @id @default(uuid())
  user_id           String
  stripe_payment_id String
  amount            Decimal
  currency          String
  status            PaymentStatus
  payment_method    PaymentMethod
  payment_date      DateTime      @default(now())
  invoice_url       String

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

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
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "happy-dom": "^17.0.0",
    "postcss": "^8.4.38",
    "shadcn": "^2.3.0",
    "shadcn-cli": "^0.0.6",
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
    "prisma": "prisma generate && prisma migrate deploy",
    "prisma:init": "prisma migrate dev --name init",
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
    "typecheck": "tsc --noEmit",
    "prisma:seed": "ts-node prisma/seed.ts"
  },
  "dependencies": {
    "@le-journal/shared-types": "workspace:*",
    "@nestjs/common": "^11.0.7",
    "@nestjs/core": "^11.0.7",
    "@nestjs/platform-express": "^11.0.7",
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
}

enum SubscriptionStatus {
  ACTIVE
  PENDING
  CANCELLED
  EXPIRED
}

enum EmailStatus {
  RECEIVED
  PROCESSED
  FAILED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum PaymentMethod {
  CREDIT_CARD
  PAYPAL
  BANK_TRANSFER
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  profile                 UserProfile?
  projects               Project[]
  newsletterSubscriptions NewsletterSubscription[]
  transactions           Transaction[]

  @@index([email])
}

model Project {
  id             String   @id @default(uuid())
  user_id        String
  project_number Int      @unique
  name           String   @unique
  slug           String   @unique
  created_at     DateTime @default(now())

  user   User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]

  @@index([user_id])
}

model UserProfile {
  id                      String           @id @default(uuid())
  user_id                 String           @unique
  subscription_plan       SubscriptionPlan
  newsletter_email_alias  String
  prompt_instruction      String           @db.Text
  gmail_alias_folder_url  String

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([user_id])
}

model NewsletterSubscription {
  id                  String             @id @default(uuid())
  user_id             String
  newsletter_name     String
  newsletter_email    String
  newsletter_url      String
  status              SubscriptionStatus
  subscribed_at       DateTime           @default(now())

  user   User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]

  @@index([user_id])
  @@index([newsletter_email])
}

model Email {
  id                        String   @id @default(uuid())
  project_id                String
  newsletter_subscription_id String
  subject                   String
  raw_content               String   @db.Text
  received_at               DateTime @default(now())
  status                    EmailStatus

  project                 Project                @relation(fields: [project_id], references: [id], onDelete: Cascade)
  newsletterSubscription  NewsletterSubscription @relation(fields: [newsletter_subscription_id], references: [id], onDelete: Cascade)
  news                   News[]

  @@index([project_id])
  @@index([newsletter_subscription_id])
  @@index([subject])
}

model News {
  id                String   @id @default(uuid())
  email_id          String
  title             String
  description       String   @db.Text
  url               String
  content           String   @db.Text
  relevance_score   Float
  extracted_at      DateTime @default(now())

  email Email @relation(fields: [email_id], references: [id], onDelete: Cascade)

  @@index([email_id])
}

model Transaction {
  id                String        @id @default(uuid())
  user_id           String
  stripe_payment_id String
  amount            Decimal
  currency          String
  status            PaymentStatus
  payment_method    PaymentMethod
  payment_date      DateTime      @default(now())
  invoice_url       String

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

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
