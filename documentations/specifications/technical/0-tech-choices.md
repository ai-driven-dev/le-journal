## Choix initial des technologies

### Main technologies

- Node 22
- TypeScript

### Paradigms

- Use-case based architecture
- Domain-driven design
- Feature-driven development

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
