# Monorepo Setup Guide

## Prerequisites

- Node.js (v18+)
- pnpm (v8+)

## Initial Setup

1. Create root directory and initialize:

```bash
mkdir my-monorepo
cd my-monorepo
pnpm init
```

2. Install Turborepo:

```bash
pnpm add turbo -D
```

3. Create basic structure:

```bash
mkdir apps
mkdir packages
```

## Backend Setup (NestJS)

1. Create backend app:

```bash
cd apps
nest new backend --package-manager pnpm
```

2. Configure backend structure:

```bash
cd backend
```

- Follow the architecture pattern from `0-architecture.md`
- Create basic folders:

  ```bash
  mkdir -p src/features
  mkdir -p src/tests/{unit,e2e}
  ```

## Frontend Setup (Remix)

1. Create Remix app:

```bash
cd apps
npx create-remix@latest frontend
```

2. Configure frontend structure:

```bash
cd frontend
```

- Follow the architecture pattern from `0-architecture.md`
- Create basic folders:

  ```bash
  mkdir -p app/{features,shared}
  mkdir -p app/features/{components,stores,hooks,api,types,tests}
  ```

## Turbo Configuration

Create `turbo.json` in root:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    }
  }
}
```

## Root Package Configuration

Update root `package.json`:

```json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "lint": "turbo run lint"
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

## Next Steps

- Configure TypeScript
- Set up shared packages
- Configure environment variables
- Set up testing framework
- Configure CI/CD pipeline
