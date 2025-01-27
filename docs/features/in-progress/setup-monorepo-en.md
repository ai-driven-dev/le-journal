# 🚀 Guide: NestJS/Remix Monorepo Setup

## 🎯 Instructions Goal

1. Set up Turborepo monorepo to manage multiple applications
2. Set up NestJS backend using hexagonal architecture
3. Set up Remix frontend using modular architecture

## 📚 Required Documentation

### Required Folder Structure

```
le-journal/ # root directory (current)
├── apps/
│   ├── backend/    # NestJS Application
│   └── frontend/   # Remix Application
├── packages/       # Shared code between applications
```

## 🏗️ Complete Monorepo Setup

- Use provided example commands when possible
- Use pnpm -D for dependencies, avoid global installations

### 1. Turborepo Setup

- **Docs**: [Turborepo](https://turbo.build/repo/docs/crafting-your-repository)
- **Goal**: Initialize monorepo structure
- **Steps**:

1. Initialize pnpm
2. Install Turborepo with PNPM (no template)
3. Verify folder creation
4. Check Turborepo config (package.json, turbo.json, .gitignore)

### 2. Backend Setup (NestJS)

- **Docs**: [NestJS](https://docs.nestjs.com/first-steps)
- **Goal**: Create NestJS application
- **Steps**:

1. Navigate to apps folder
2. Create NestJS app
3. Requirements:
   1. TypeScript
   2. No template
   3. No .git

Example command:

```bash
cd apps
pnpm exec @nestjs/cli new backend --language typescript --packageManager pnpm --strict --skipGit
```

### 3. Frontend Setup (Remix)

- **Docs**:
  - [Remix](https://remix.run/docs/en/main/start/quickstart)
  - [React Router](https://reactrouter.com/start/framework/installation)
  - [React Route Template](https://github.com/remix-run/react-router-templates/tree/main/default)
- **Goal**: Create Remix application
- **Steps**:

1. Create Remix app
2. Requirements:
   1. No template
   2. Remove generated .git

Example command:

```bash
npx create-react-router@latest --template remix-run/react-router-templates/default frontend --package-manager pnpm --no-install --no-git-init
```

## ✅ Verification

1. pnpm install should install dependencies in apps/* too
2. pnpm run dev should start both apps:
   1. Backend at <http://localhost:3000>
   2. Frontend at <http://localhost:8080>
3. pnpm run build should generate packages
