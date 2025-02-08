# Project Specifications

## Description (in French)

### Sommaire

Le projet consiste à développer un SaaS de veille automatisée qui permet de centraliser les newsletters reçues puis de les trier par pertinence avec un système de scoring.

Ainsi, un utilisateur peut suivre plusieurs newsletters et avoir uniquement les newsletters les plus pertinentes affichées dans un tableau de bord.

### Utilisateurs

1. **Utilisateurs "finaux"** :
   - Accès tableau de bord centralisé pour consulter leurs newsletters.
2. **Administrateurs** :
   - Accès tableau de bord admin pour gérer les utilisateurs.
   - Accès aux comptes des utilisateurs.

### Features

- Authentification : Google OAuth 2.0.
- Création d’un label et d’un dossier par défaut via l’API Gmail.
- Configuration rapide avec un stepper pour ajouter des newsletters (alias et tutoriel visuel).
- Mise à jour automatique des données utilisateur dans le tableau de bord avec récupération et traitement des newsletters.
- Plan de paiement disponible pour rajouter des newsletters à traiter (1 projet et 1 newsletter autorisée en mode "normal")

## Architecture

### Rules

### Current Architecture

<!-- docs/project-structure.txt -->

```txt

```
