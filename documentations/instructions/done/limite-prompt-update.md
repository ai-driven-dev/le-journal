## Instruction: Limiter l'envoi du prompt à une fois par jour

> Implémentation d'une restriction pour limiter la modification du prompt à une seule fois par jour.

### Goal

Restreindre l'envoi d'une modification de prompt à une fois toutes les 24 heures en stockant la date de la dernière modification en base de données et en exposant cette information à l'API pour mise à jour côté front-end.

### Affected files

- `apps/backend/prisma/schema.prisma`
- `apps/backend/src/modules/projects/application/update-project-prompt.use-case.ts`
- `apps/backend/src/modules/projects/presentation/projects.controller.ts`
- `apps/backend/src/modules/projects/domain/project.ts`
- `apps/backend/src/modules/projects/infrastructure/prisma-project.repository.ts`
- `packages/shared-types/src/project.class.ts`
- `apps/frontend/app/features/dashboard/custom-instructions/custom-instructions.store.ts`
- `apps/frontend/app/features/dashboard/custom-instructions/custom-instructions.component.tsx`
- `apps/frontend/app/features/dashboard/dashboard.loader.ts`

---

### Backend

#### 1. Modifier le schéma Prisma

- Ajouter `last_prompt_update` (**snake_case**) dans le modèle `Project`.
- Générer une migration Prisma.

#### 2. Mise à jour du Use Case `update-project-prompt`

- Ajouter une validation **métier** pour empêcher l'envoi si `last_prompt_update` < 24h.
- Retourner une **erreur 403** si l'utilisateur tente une modification avant la fin du délai.
- Mettre à jour `last_prompt_update` à la date actuelle en cas de succès.

#### 3. Exposer `canUpdatePrompt` via l'API

- Modifier `projects.controller.ts` pour renvoyer `canUpdatePrompt: boolean`.
- Calculer `canUpdatePrompt` en comparant `last_prompt_update` avec `Date.now()`.

#### 4. Mettre à jour `Project` dans `shared-types`

- Ajouter `lastPromptUpdate: string | null`.
- Ajouter `canUpdatePrompt: boolean`.

---

### Frontend

#### 1. Modifier le **loader Remix**

- Charger l'objet `Project` entier depuis l'API backend.
- Intégrer `canUpdatePrompt` dans le store du dashboard.

#### 2. Mettre à jour `custom-instructions.store.ts`

- Ajouter `canUpdatePrompt` dans le store MobX.
- Désactiver la soumission si `canUpdatePrompt === false`.

#### 3. Modifier `custom-instructions.component.tsx`

- Ici il faut rajouter le fait d'avertir l'utilisateur dans la pop-in que si jamais il soumet son prompt maintenant, il ne pourra plus le faire avant une journée.
- Désactiver le bouton de soumission si `canUpdatePrompt === false`.
- Ajouter un `Hover` (shadcn/ui) pour informer l'utilisateur de la restriction avec sa date de dernière modification (`lastPromptUpdate`)

---

### Validation checkpoints

- [ ] **Prisma** : `last_prompt_update` ajouté et migration appliquée.
- [ ] **Backend** : `canUpdatePrompt` + `lastPromptUpdate` renvoyé par l'API.
- [ ] **Use Case** : Retourne une **403** si modification interdite.
- [ ] **Shared Types** : `canUpdatePrompt` + `lastPromptUpdate` ajouté dans `project.class.ts`.
- [ ] **Front-end** : Bouton désactivé et message affiché si `canUpdatePrompt === false`.
- [ ] **Tests** : Cas normal et tentative d'envoi avant le délai couverte en tests unitaires.

> Confirmer avant passage à l'étape finale.
