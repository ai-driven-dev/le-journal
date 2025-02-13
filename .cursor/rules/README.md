<!-- markdownlint-disable MD033 -->

# Cursor Project Rules

Si vous vous demandez comment je code 2x plus vite avec l'IA, une partie de la réponse est ici.

## Des questions ?

- Notre Discord `AI-Driven-Dev` : <https://bit.ly/ai-driven-dev-groupe-prive>
- Mon LinkedIn : <https://www.linkedin.com/in/alexandre-soyer/>

## Pourquoi utiliser des règles ?

Cursor propose un moyen de générer du code en utilisant des règles.

- Ces règles sont stockées dans le dossier `.cursor/rules/*.mdc`.
- Systématiquement, quand je génère du code, il suit les règles, et c'est redoutable.
- Probablement la meilleure manière de générer du code IA de qualité.

### Notes

Voici ma configuration des project rules de Cursor sur mon projet.

> `.cursorrules`est déprécié, splittez vos règles dans `.cursor/rules/*.mdc`.

## Comment les utiliser ?

> Ce sont pour la plupart des règles spécifiques à mon projet. Créez les vôtres en fonction de vos besoins.

1. Ouvrez `Cursor`, aller dans les `Settings`.
2. Dans `Project Rules`.
3. Cliquer sur `+ Add new rule`.
   1. `Description`: Quand votre règle est appliquée.
   2. `Globs`: Sur quels fichiers appliquer la règle.
   3. `Content`: Le contenu de la règle (`markdown` ou `XML`).
4. Le contenu se retrouvera directement dans des `.cursor/rules/*.mdc`
   1. <img src="https://alexsoyes.com/wp-content/uploads/2025/02/cursor-project-rules.png" width="500" alt="cursor-rules-settings">
5. Exemple d'utilisation dans le chat
   1. <img src="https://alexsoyes.com/wp-content/uploads/2025/02/cursor-chat-rules.png" width="500" alt="cursor-rules-chat">
6. Vous avez mes règles persos en guise de template.
7. Enjoy 🙂
