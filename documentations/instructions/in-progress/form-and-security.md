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

- [ ] Prompt de test pour le use case
- [ ] Requête HTTP dans le loader avec rules

## Growth

- NotePad :vidéo
- Melvyn Fichiers règles
- X et Reddit pour les cursor rules elles ne s'appliquent pas toujours
- [ ] Class Validator à comprendre !!!- définir la stratégie même si je dois faire des mappers.
- [ ] Test sur les règles de Cursor suivant le contexte. Vérifie qu'elle sont bien appliquées.
- [ ] Class Validator partagé à valider dans un type partagé ? Comme au début finalement... Je pourrais faire une abstraction de class pour mapper l'API ?
  - [ ] Obligatoire d'avoir une validation front des types reçues au load + à l'update
  - [ ] Idem pour le backend
  - [ ] Clarifier la logique du DTO en entrée (qui est un type partagé), DTO ensuite pour API Property qui implement Type partagé validé, conversion jouer avec Prisma, puis retour au DTO en sortie (validé à nouveau par le type partagé  )
    - [ ] Ici ne pas avoir peut de faire des mappers (même si c'est chiant) - si c'est la bonne pratique on les fera générer à l'IA.
- [ ] Me mettre sur le front, demander la modif d'un composant, véirifer quelles règles (global, front) sont appelé avec une instructions.
