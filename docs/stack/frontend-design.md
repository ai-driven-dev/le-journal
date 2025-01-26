# 🎨 Front-End Design

## 🛠️ Stack Technologique

- **Framework** : Remix (React)
- **Styling** : TailwindCSS
- **Animations** : Framer Motion
- **Router** : React Router v7
- **State Management** : MobX pour la gestion globale du state
- **Requêtes API** : Remix Loaders pour charger les données côté serveur
- **React Query (optionnel)** : Peut être utilisé pour le caching ou les requêtes dynamiques si nécessaire
- **Navigation** : Hybrid SSR/CSR avec Remix
- **Gestion des URLs** : Découpage des routes pour un accès rapide et structuré

## ⚡ Rendu & Navigation

- **Landing Page** → SSR (Server-Side Rendering) pour un chargement optimisé et un bon SEO
- **Application (Dashboard, Stepper, etc.)** → CSR (Client-Side Rendering) pour des transitions rapides
- **Utilisation des URLs pour la navigation dans le Stepper** afin de conserver la progression et éviter un stockage excessif en mémoire

## 🏗️ Architecture

- **Approche Feature-Based** (chaque composant organisé en fonction de sa fonctionnalité)
- **Découpage des URLs** pour une structure claire et scalable
- **UI Components** → Utilisation de composants Tailwind réutilisables (ex: boutons, modales, stepper)
- **Animations & UX** → Framer Motion utilisé pour fluidifier les transitions de pages et interactions

## 🔒 Authentification & Sécurité

- **OAuth 2.0 avec Google** via Remix Auth pour la connexion utilisateur
- **Transmission du token OAuth vers NestJS** pour stockage sécurisé
- **Sessions stockées en cookies HTTPOnly et sécurisées par Redis**
- **JWT généré par NestJS** pour sécuriser les requêtes API entre le front et le back

## 🚀 Performance & Optimisation

- **Préchargement des routes** pour améliorer les temps de navigation
- **Utilisation des Remix Loaders** pour charger les données avant le rendu
- **React Query (optionnel)** si besoin de caching avancé ou requêtes dynamiques
