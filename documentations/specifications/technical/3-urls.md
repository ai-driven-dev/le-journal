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
