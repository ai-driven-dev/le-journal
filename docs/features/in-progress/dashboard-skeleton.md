# Refactorisation et Structuration des Composants dans `features/dashboard/`

## 📂 1. Déplacement et Renommage des Fichiers en kebab-case

**Déplacer et renommer** les fichiers existants comme suit :

| Fichier actuel | Nouveau chemin |
|---------------|---------------|
| `dashboard/components/Elements/ai-customization.tsx` | `features/dashboard/footer/ai-customization.component.tsx` |
| `dashboard/components/Elements/newsletter-table.tsx` | `features/dashboard/main/newsletter-table.component.tsx` |
| `dashboard/components/Elements/newsletter-status.tsx` | `features/dashboard/sidebar/status-list.component.tsx` |
| `dashboard/components/Elements/header.tsx` | `features/dashboard/header/title.component.tsx` |
| `dashboard/components/Elements/upgrade-banner.tsx` | `features/dashboard/sidebar/upgrade-banner.component.tsx` |

---

## 📜 2. Création de la Structure des Dossiers (À Réaliser Après Déplacement des Fichiers)

Créer les dossiers suivants dans `features/dashboard/` pour la séparation UI / Logique Métier :

```
📂 features/dashboard
 ┣ 📂 header
 ┃ ┣ 📂 title
 ┃ ┃ ┣ 📜 title.component.tsx
 ┃ ┃ ┣ 📜 title.store.ts
 ┃ ┃ ┣ 📜 title.type.ts
 ┃ ┣ 📂 search-bar
 ┃ ┃ ┣ 📜 search-bar.component.tsx
 ┃ ┃ ┣ 📜 search-bar.store.ts
 ┃ ┃ ┣ 📜 search-bar.type.ts
 ┃ ┣ 📂 pending-newsletters
 ┃ ┃ ┣ 📜 pending-newsletters.component.tsx
 ┃ ┃ ┣ 📜 pending-newsletters.store.ts
 ┃ ┃ ┣ 📜 pending-newsletters.type.ts
 ┃ ┣ 📂 user-profile
 ┃ ┃ ┣ 📜 user-profile.component.tsx
 ┃ ┃ ┣ 📜 user-profile.store.ts
 ┃ ┃ ┣ 📜 user-profile.type.ts
 ┣ 📂 main
 ┃ ┣ 📂 newsletter-table
 ┃ ┃ ┣ 📜 newsletter-table.component.tsx
 ┃ ┃ ┣ 📜 newsletter-table.store.ts
 ┃ ┃ ┣ 📜 newsletter-table.type.ts
 ┃ ┣ 📂 news-list
 ┃ ┃ ┣ 📜 news-list.component.tsx
 ┃ ┃ ┣ 📜 news-list.store.ts
 ┃ ┃ ┣ 📜 news-list.type.ts
 ┣ 📂 footer
 ┃ ┣ 📂 ai-customization
 ┃ ┃ ┣ 📜 ai-customization.component.tsx
 ┃ ┃ ┣ 📜 ai-customization.store.ts
 ┃ ┃ ┣ 📜 ai-customization.type.ts
 ┣ 📂 sidebar
 ┃ ┣ 📂 newsletter-alias
 ┃ ┃ ┣ 📜 newsletter-alias.component.tsx
 ┃ ┃ ┣ 📜 newsletter-alias.store.ts
 ┃ ┃ ┣ 📜 newsletter-alias.type.ts
 ┃ ┣ 📂 status-list
 ┃ ┃ ┣ 📜 status-list.component.tsx
 ┃ ┃ ┣ 📜 status-list.store.ts
 ┃ ┃ ┣ 📜 status-list.type.ts
 ┃ ┣ 📂 upgrade-banner
 ┃ ┃ ┣ 📜 upgrade-banner.component.tsx
 ┃ ┃ ┣ 📜 upgrade-banner.store.ts
 ┃ ┃ ┣ 📜 upgrade-banner.type.ts
 ┣ 📂 global
 ┃ ┣ 📜 dashboard.store.ts (Store parent qui gère les sous-stores)
```

---

## 🏗 3. Séparation UI / Logique Métier

Une fois les fichiers déplacés et renommés, **séparer la logique métier et l’UI** en créant les stores et les types associés dans chaque sous-dossier.

Chaque dossier doit contenir **3 fichiers** :

- **Composant UI** : `*.component.tsx`
- **Store MobX** : `*.store.ts`
- **Types associés** : `*.type.ts`

Exemple pour **AI Customization** :

```
📂 footer/ai-customization
 ┣ 📜 ai-customization.component.tsx
 ┣ 📜 ai-customization.store.ts
 ┣ 📜 ai-customization.type.ts
```

---

## 🔗 4. Création des Stores et Connexion à `dashboard.store.ts`

- **Créer un store pour chaque fonctionnalité** (`ai-customization.store.ts`, `newsletter-table.store.ts`...).  
- **`dashboard.store.ts`** doit **uniquement** contenir les sous-stores et les états globaux (ex. authentification).  
- **Chaque store peut interagir avec d’autres via `dashboard.store.ts`**.  
- **Éviter toute dépendance cyclique entre stores**.  

---

## 🔄 5. Mise à Jour des Imports et Références

- **Mettre à jour les imports** des composants pour pointer vers la nouvelle structure.  
- **Remplacer les références directes aux anciens fichiers**.  
- **Corriger les chemins dans les fichiers TypeScript**.  

---

### 📌 **Validation**

✅ **Tous les fichiers sont bien déplacés et renommés**.  
✅ **Tous les stores sont indépendants et correctement connectés au `dashboard.store.ts`**.  
✅ **Tous les imports et références sont mis à jour**.  
✅ **Le projet compile et fonctionne sans erreurs**.  

🔥 **Lancer la refactorisation et s’assurer que tout fonctionne correctement !** 🚀
