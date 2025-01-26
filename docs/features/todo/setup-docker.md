## 🐳 Docker Setup

### 1. Docker Compose

- **Objectif** : Orchestrer les conteneurs backend et frontend
- **Template de référence** : Exemple docker-compose.yml fourni
- **Étapes** :

 1. Créer le fichier à la racine
    1. Ignore node_modules dans tous les services
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

## ✅ Vérification

### 1. Build des images

- **Objectif** : Construire les images Docker
- **Commande** : `docker-compose up --build`
- **Vérification** :

 1. Les images se construisent sans erreur
 2. Les conteneurs démarrent
 3. Pas d'erreur dans les logs
