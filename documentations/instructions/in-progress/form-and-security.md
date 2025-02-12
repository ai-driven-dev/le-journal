# Form and security

## Prompts

- [x] Prompt : Quelles seraient les meilleures bonnes pratiques pour … use case en DDD avec www ?
- [x] Prompt extract rules

## Rules

- [x] Règles Cursor pour loguer d’abord puis vérifier que ça fonctionne en envoyant le payload du front

## Backend

- [x] windston et logs de tout en mode debug
- [ ] Security prompt après validation et test
- [ ] formulaires et validation

## Frontend

- [x] Prompt de test pour le use case
- [x] Requête HTTP dans le loader avec rules

## Growth

- NotePad :vidéo
- Rules propres pour moi + doc dans le Notion (melvyn)

- [ ] Test sur les règles de Cursor suivant le contexte. Vérifie qu'elle sont bien appliquées.
  - [ ] Me mettre sur le front, demander la modif d'un composant, véirifer quelles règles (global, front) sont appelé avec une instructions.

🛠 Résumé des corrections recommandées :
• 🔐 Sécuriser le refresh token (hash en base avec bcrypt).
• ⌛ Réduire la durée de vie du JWT (passer de 1d à 15m).
• 🛑 Vérifier que googleId et email sont bien définis avant de créer un user.
• 🔄 Implémenter /auth/refresh pour renouveler un access token.
• 💥 Ajouter des erreurs explicites dans JwtStrategy et AuthController.
• ✔️ Vérifier FRONTEND_URL dès le chargement de l’application.

- [ ] Check Domain and types against prisma (name required in domain, not in prisma)

- envoyer toutes les règles dans o1 et s'assurer que les règles sont ok avec DDD et clean archi
