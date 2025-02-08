# Frontend : Refactoring du "dashboard"

1. extraire les types de données dans le fichier type du répertoire correspondant.
2. s'assurer qu'ils sont cohérents.
3. déplacer dans "shared-types" mais uniquement pour les types de données, pas le reste du store.

# User-Stories

- Prompt à utiliser pour clairifier intentions courtes
- User-Story ULTRA COURTES pour parcours minimaliste.

# Backend

- définition des routes sous forme de use-case
- swagger
- utilisation des shared-types pour renvoyer les types de données au frontend.

# Link - Relier le back et le front

- le frontend récupère les données du backend via le schema API.
- Les données sont typées avec les shared-types.
- On affiche les données du backend sur le frontend.
