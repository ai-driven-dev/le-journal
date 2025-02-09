# Frontend : Refactoring du "dashboard"

- [x] extraire les types de données dans le fichier type du répertoire correspondant.
- [x] s'assurer qu'ils sont cohérents.
- [x] déplacer dans "shared-types" mais uniquement pour les types de données, pas le reste du store.

# User-Stories

- [x] Prompt à utiliser pour clairifier intentions courtes
- [x] User-Story ULTRA COURTES pour parcours minimaliste.

# Backend

- [x] définition des routes sous forme de use-case
- [x] swagger
- [x] utilisation des shared-types pour renvoyer les types de données au frontend.

# Link - Relier le back et le front

- [x] le frontend récupère les données du backend via le schema API.
- [x] Les données sont typées avec les shared-types.
- [x] On affiche les données du backend sur le frontend.

---

- **If an error occurs during data retrieval, display a clear message** _(System)_
  - **Trigger**: When an API request fails
  - **Input**: API error
  - **Output**: Display an error message
