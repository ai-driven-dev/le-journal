# 🚀 Instructions : Monorepo NestJS/Remix

- Les instructions sont à suivre comme un point de références.
- Les exemples sont des exemples, à adapter en fonction des besoins.

## 📑 Table des matières

- [🚀 Instructions : Monorepo NestJS/Remix](#-instructions--monorepo-nestjsremix)
  - [📑 Table des matières](#-table-des-matières)
  - [🎯 Objectifs de l'instruction](#-objectifs-de-linstruction)
  - [Requis](#requis)
  - [📚 Documentation à suivre](#-documentation-à-suivre)
    - [Structure obligatoire des dossiers](#structure-obligatoire-des-dossiers)
  - [🏗️ Installation Monorepo](#️-installation-monorepo)
    - [1. Configuration Turborepo](#1-configuration-turborepo)
    - [2. Installation Backend (NestJS)](#2-installation-backend-nestjs)
    - [3. Installation Frontend (Remix)](#3-installation-frontend-remix)
  - [🐳 Docker Setup](#-docker-setup)
    - [1. Docker Compose](#1-docker-compose)
      - [Docker Compose Example](#docker-compose-example)
    - [2. Backend Dockerfile](#2-backend-dockerfile)
      - [Backend Dockerfile Example](#backend-dockerfile-example)
    - [3. Frontend Dockerfile](#3-frontend-dockerfile)
      - [Frontend Dockerfile Example](#frontend-dockerfile-example)
  - [✅ Vérification ❌](#-vérification-)
    - [1. Build des images](#1-build-des-images)
    - [2. Test des applications](#2-test-des-applications)
    - [3. Vérification de l'isolation](#3-vérification-de-lisolation)

## 🎯 Objectifs de l'instruction

- Mettre en place un monorepo avec Turborepo pour gérer plusieurs applications
- Configurer NestJS pour le backend en utilisant une architecture hexagonale
- Configurer Remix pour le frontend avec une architecture modulaire
- Dockeriser l'ensemble de l'application pour un environnement de développement cohérent
- Assurer l'isolation complète des dépendances entre services

## Requis

- Node >= 20
- PNPM
- Docker
- Docker Compose

## 📚 Documentation à suivre

### Structure obligatoire des dossiers

```
le-journal/ # répertoire racine du projet (courant)
├── apps/
│   ├── backend/    # Application NestJS
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── frontend/   # Application Remix
│       ├── app/
│       ├── Dockerfile
│       └── package.json
├── packages/       # Code partagé entre applications
└── docker-compose.yml
```

## 🏗️ Installation Monorepo

### 1. Configuration Turborepo

- **Documentation**: [Turborepo](https://turbo.build/repo/docs/crafting-your-repository)
- **Objectif** : Initialiser la structure monorepo
- **Template de référence** : Structure apps/packages fournie plus haut
- **Étapes** :

 1. Se placer dans le dossier `le-journal`
 2. Initialiser Turborepo avec PNPM
 3. Vérifier la création des dossiers

```bash
cd le-journal
pnpm create turbo@latest . --use-pnpm
```

### 2. Installation Backend (NestJS)

- **Documentation**: [NestJS](https://docs.nestjs.com/first-steps)
- **Objectif** : Créer l'application NestJS
- **Template de référence** : Structure backend fournie
- **Étapes** :

 1. Se placer dans le dossier apps
 2. Créer l'application NestJS
 3. Supprimer le .git généré

```bash
cd apps
pnpm exec @nestjs/cli new backend --language typescript --packageManager pnpm --strict --skipGit
```

### 3. Installation Frontend (Remix)

- **Documentation**:
  - [Remix](https://remix.run/docs/en/main/start/quickstart)
  - [React Router](https://reactrouter.com/start/framework/installation)
  - [React Route Template](https://github.com/remix-run/react-router-templates/tree/main/default)
- **Objectif** : Créer l'application Remix
- **Template de référence** : Structure frontend fournie
- **Étapes** :

 1. Rester dans le dossier apps
 2. Créer l'application Remix
 3. Supprimer le .git généré

```bash
npx create-react-router@latest --template remix-run/react-router-templates/default frontend
```

## 🐳 Docker Setup

### 1. Docker Compose

- **Objectif** : Orchestrer les conteneurs backend et frontend
- **Template de référence** : Exemple docker-compose.yml fourni
- **Étapes** :

 1. Créer le fichier à la racine
 2. Configurer les services
 3. Définir les volumes
 4. Mapper les ports

#### Docker Compose Example

```yaml
version: '3.8'
services:
 backend:
   build:
     context: ./apps/backend
     dockerfile: Dockerfile
   ports:
     - "3000:3000"
   volumes:
     - ./apps/backend:/app
     - /app/node_modules

 frontend:
   build:
     context: ./apps/frontend
     dockerfile: Dockerfile
   ports:
     - "8080:8080"
   volumes:
     - ./apps/frontend:/app
     - /app/node_modules
```

### 2. Backend Dockerfile

- **Objectif** : Créer l'image Docker pour NestJS
- **Template de référence** : Exemple Dockerfile backend fourni
- **Étapes** :

 1. Créer le Dockerfile dans apps/backend
 2. Configurer Node.js Alpine
 3. Installer les dépendances
 4. Exposer le port 3000

#### Backend Dockerfile Example

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "start:dev"]
```

### 3. Frontend Dockerfile

- **Objectif** : Créer l'image Docker pour Remix
- **Template de référence** : Exemple Dockerfile frontend fourni
- **Étapes** :

 1. Créer le Dockerfile dans apps/frontend
 2. Configurer Node.js Alpine
 3. Installer les dépendances
 4. Exposer le port 8080

#### Frontend Dockerfile Example

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN pnpm install
COPY . .
EXPOSE 8080
CMD ["pnpm", "dev"]
```

## ✅ Vérification ❌

### 1. Build des images

- **Objectif** : Construire les images Docker
- **Commande** : `docker-compose up --build`
- **Vérification** :

 1. Les images se construisent sans erreur
 2. Les conteneurs démarrent
 3. Pas d'erreur dans les logs

### 2. Test des applications

- **Objectif** : Vérifier le fonctionnement
- **Points de vérification** :

 1. Backend accessible sur <http://localhost:3000>
 2. Frontend accessible sur <http://localhost:8080>
 3. Les hot reloads fonctionnent

### 3. Vérification de l'isolation

- **Objectif** : Confirmer l'isolation des services
- **Points de vérification** :

 1. node_modules séparés
 2. Les modifications de code sont prises en compte
 3. Pas de conflits entre services
