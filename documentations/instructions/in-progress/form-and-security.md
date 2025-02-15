- [ ] Security prompt après validation et test

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

NestJS Throttler

[07:44, 15/02/2025] Alex: Étape 2 backend route pour les étapes dans un google contrôleur , informer l’utilise true qu’on va le déconnecter

Dégrisée le bouton

Lu demander de se re authentifier en readonly

Boom étape 4 avec confetti + alias. Dem’eee d’aller inscrire

Bouton suivant «  on vous a envoyé un mail que vous puissiez voir le rendu »

Taguer le mail envoyer pour accepter de recevoir les emails en « register mail »

Ceeer un use case remix avec sendNewEmailToOnboardedUserWithAlexsNews

Un article LinkedIn que le lancement du SaaS
[07:46, 15/02/2025] Alex: Google API obligatoire. Vérifier le webhook à appeler avec un bouton pour récupérer les nouveaux emails ?

Créer un label « le journal processed » en statut d’un mail en base de données pour nous assurer que tout est bon

ChatGPT OPÉRATEUR pour review de code que Reddit. Faire la prochaine MR en mode test avec les outils
