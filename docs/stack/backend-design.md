# ⚙️ Back-End Design

## 🛠️ Framework & Langage

- **NestJS (TypeScript)** confirmé.
- **REST API uniquement** (pas de GraphQL prévu pour l'instant).

## 🏗️ Architecture

- **Monolithe** (Backend & Frontend ensemble).
- **Architecture hexagonale** pour modularité et testabilité.
- **Génération automatique des routes** grâce à **`@AutoResource()`** (similaire à API Platform).

## 🗄️ Base de Données & ORM

- **PostgreSQL** comme base principale.
- **Prisma** comme ORM pour interagir avec la BDD.
- **MeiliSearch** ajouté pour l'indexation et la recherche rapide.

## ⚡ Scalabilité & Performance

- **Redis intégré avec NestJS** pour :
  - **Caching API** des entités (évite les requêtes inutiles en base).
  - **Job Queue (BullMQ)** pour exécuter des tâches asynchrones (rafraîchissement des tokens OAuth, traitement des emails).
- **Tâches planifiées (cron) pour la récupération des emails**.
- **MeiliSearch utilisé pour accélérer la recherche des newsletters**.

## 🔒 Sécurité & Authentification

- **Authentification OAuth 2.0 avec Google API**.
- **Chiffrement des tokens OAuth en base de données**.
- **Utilisation de Redis pour stocker temporairement les sessions OAuth** (évite d'interroger PostgreSQL à chaque requête).
- **JWT pour la gestion des utilisateurs**.

## 🚀 Déploiement & CI/CD

- **Serveur OVH avec Docker**.
- **GitHub Actions** pour linting, tests unitaires, et tests fonctionnels.
- **Pas de Kubernetes pour le moment** (scalabilité manuelle via Docker). 