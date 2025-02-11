# Instruction: Google Authentication with NestJS

## Goal

Implement Google OAuth 2.0 authentication on the backend using NestJS. The frontend will trigger the authentication process but will not handle any authentication logic.

## Affected files

- `apps/backend/src/features/auth/auth.module.ts`
- `apps/backend/src/features/auth/auth.controller.ts`
- `apps/backend/src/features/auth/auth.service.ts`
- `apps/backend/src/features/auth/strategies/google.strategy.ts`
- `apps/backend/src/features/auth/guards/jwt.guard.ts`
- `apps/backend/src/features/auth/guards/google-auth.guard.ts`
- `apps/backend/prisma/schema.prisma`

## Tasks

### Backend: Implement Google OAuth

> Set up Google OAuth in NestJS and handle user authentication.

- [x] Configure **Google OAuth 2.0** credentials (client ID, client secret) in environment variables.
- [ ] Create an **authentication module** in NestJS.
- [ ] Implement a **Google strategy** using `@nestjs/passport`.
- [ ] Define an **authentication controller** with the following endpoints:
  - `/auth/google` → Redirects user to Google authentication.
  - `/auth/google/callback` → Handles the OAuth callback.
  - `/auth/logout` → Clears session and refresh token.
- Extract **email, name, avatar** from Google’s OAuth response.
- Check if the user exists in Prisma:
  - If **exists** → Update user data.
  - If **does not exist** → Create a new user.
- Store **refresh token** securely.
- Generate and return **JWT access token** to the frontend.
- Implement a **JWT authentication guard** for protected routes.

## Validation checkpoints

- User can log in with Google.
- User data is correctly stored and updated in the database.
- JWT is correctly generated and sent to the frontend.
- Refresh token is stored and can be used to generate a new access token.
- Authenticated routes are protected using JWT guards.
- User can log out and the refresh token is invalidated.

## Review o1

🛠 Résumé des corrections recommandées :
🔐 Sécuriser le refresh token (hash en base avec bcrypt).
⌛ Réduire la durée de vie du JWT (passer de 1d à 15m).
🛑 Vérifier que googleId et email sont bien définis avant de créer un user.
🔄 Implémenter /auth/refresh pour renouveler un access token.
💥 Ajouter des erreurs explicites dans JwtStrategy et AuthController.
✔️ Vérifier FRONTEND_URL dès le chargement de l’application.
