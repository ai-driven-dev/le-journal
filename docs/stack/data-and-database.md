# 💾 Data & Database Management

## 🛠️ Choix de la Base de Données

- **Base principale** : PostgreSQL
- **ORM** : Prisma
- **Migrations** : Prisma Migrate pour versionner les changements

## 📂 Structuration des Données

### 🏗️ Tables principales

- **Utilisateurs** : Stocke les informations d'authentification et de connexion
- **Tokens OAuth** : Stockage des tokens OAuth (chiffrés) pour accéder aux emails Google
- **Newsletters récupérées** : Emails extraits pour l'affichage et la recherche
- **Logs des tâches planifiées** : Stockage en fichiers sur disque au lieu de la base

## 📌 Stockage des Logs

- **Winston** utilisé pour écrire les logs sur disque
- **Rotation des logs** pour éviter un stockage excessif
- **Possibilité d'archivage périodique en S3** si un historique est nécessaire

## 🔍 Indexation et Optimisation PostgreSQL

### **Index créés pour optimiser les requêtes fréquentes**

| 📂 **Table** | 🏷️ **Champ Indexé** | ⚡ **Pourquoi ?** |
| --- | --- | --- |
| **users** | `email` (UNIQUE) | 🔥 Recherche rapide par email |
| **users** | `google_id` (UNIQUE) | 🔐 Authentification rapide via Google |
| **tokens** | `user_id` | ⚡ Association rapide utilisateur/token |
| **tokens** | `expires_at` | ⏳ Nettoyage rapide des tokens expirés |
| **projects** | `id` (PRIMARY) | 📂 Accès rapide aux projets |
| **projects** | `user_id` | 🔍 Recherche des projets d'un utilisateur |
| **newsletters** | `project_id` | 🔎 Recherche rapide des newsletters par projet |

## 🚀 Caching et Authentification

- **Redis**
  - Stockage temporaire des sessions utilisateurs
  - Utilisé pour le système de queue avec BullMQ
- **JWT**
  - **Stocké en PostgreSQL avec une longue durée de vie** (index sur `user_id`)
  - **Stocké en cookie HTTPOnly côté Remix pour sécuriser l'accès**
  - **Les sessions Redis permettent d'éviter d'interroger PostgreSQL à chaque requête**

## 🔎 Recherche et Indexation

- **MeiliSearch pour indexer**
  - **Newsletters** (titre, contenu)
  - **Utilisateurs (optionnel)** pour une future recherche dans l'admin
- **Synchronisation PostgreSQL → MeiliSearch** via événements Prisma
