## Initial Scope

### Version 0 (MVP)

**Fonctionnalités :**

1. **Inscription et Onboarding :**
   - Google OAuth 2.0.
   - Création labels/filtres Gmail.
   - Stepper configuration (alias, tutoriel).
2. **Tableau de bord :**
   - Newsletters reçues :
     - Date, sujet, récapitulatif, statut, bouton HTML.
     - Liste actualités (Curation IA) :
       - Titre, description, URL, score pertinence.
       - Vérification doublons, fusion si nécessaire.
   - Liste newsletters :
     - Indicateur validation, affichage grisé si non traitée.
   - Filtre contenu (texte simple).
3. **Paiement :**
   - Limite 2 newsletters gratuites.
   - Upgrade : pop-in bénéfices, Stripe.
4. **Header :**
   - Lien dashboard, infos utilisateur, menu (déconnexion, suppression, mise à jour).
5. **Landing Page :**
   - Bénéfices, visuel dashboard, CTA inscription.
   - Footer légal.
6. **Automatisation :**
   - Cron nocturne emails.
   - Validation auto confirmations.
   - Alerte Discord en cas d'erreurs répétées.
7. **Personnalisation :**
   - Champs extraction contenus spécifiques.
8. **Sécurité/RGPD :**
   - Suppression données, gestion tokens, réduction scopes.

---
