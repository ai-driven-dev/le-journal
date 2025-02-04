# Instruction: Génération des seeds pour la base de données Prisma

## 🎯 Objectif

Générer des **données de test cohérentes** pour initialiser la base de données.  
Les seeds doivent **respecter l’ordre des dépendances** et être **typiquement corrects** selon les types générés par Prisma.

⚠️ **Tous les objets doivent être typés avec `Prisma.<Model>CreateInput`.**  
⚠️ **Les relations entre les objets doivent être strictement respectées pour éviter toute incohérence.**  
⚠️ **Les seeds doivent d'abord être écrits dans un seul fichier `seed.ts` avant d’être modulaires.**

---

## 🚀 **1️⃣ Vérification et Préparation**

1. **Lister tous les types Prisma générés** et vérifier qu’ils sont bien à jour.
2. **S’assurer que chaque type correspond bien aux définitions de `schema.prisma`.**
3. **Exécuter la commande suivante pour s’assurer que les types Prisma sont bien générés :**

   ```sh
   pnpm --filter backend exec prisma generate
   ```

4. **Vérifier que les types suivants sont bien disponibles :**

   ```ts
   export namespace Prisma {
     export type UserCreateInput = { ... };
     export type ProjectCreateInput = { ... };
     export type NewsletterSubscriptionCreateInput = { ... };
     export type EmailCreateInput = { ... };
     export type NewsCreateInput = { ... };
     export type TransactionCreateInput = { ... };
   }
   ```

5. **S'assurer que `seed.ts` utilise ces types Prisma pour chaque entité.**

---

## 🚀 **2️⃣ Création des Seeds dans `seed.ts`**

1. **Tous les seeds doivent d'abord être écrits dans `apps/backend/prisma/seed.ts` en un seul bloc.**
2. **Respecter l’ordre de création des entités** (voir plus bas).
3. **Chaque seed doit être inséré en base de données en utilisant Prisma.**
4. **Une fois le fichier `seed.ts` terminé, valider avec `Prisma Studio`.**

---

## 🚀 **3️⃣ Validation avec Prisma Studio**

Après avoir inséré toutes les données avec `seed.ts`, exécuter la commande suivante pour vérifier que tout est bien en base :

```sh
pnpm --filter backend prisma studio
```

✅ **Si tout est correct, on passe à l’étape suivante : organisation en fichiers.**

---

## 📂 **4️⃣ Organisation en fichiers après validation**

⚠️ **Ne faire cette étape qu’après validation de `seed.ts` !**

Une fois les seeds validés, les répartir dans le dossier suivant :

```
apps/backend/prisma/
├── migrations/  # 🛠 Contient les migrations Prisma générées
├── seed.ts  # 🏗 Entry point du script de seed (appelant `index.ts`)
└── seeds/  # 📂 Contient les fichiers de fixture
    ├── users.seed.ts  # 👤 Seed des utilisateurs
    ├── projects.seed.ts  # 🏗 Seed des projets
    ├── newsletterSubscriptions.seed.ts  # 📰 Seed des abonnements
    ├── emails.seed.ts  # 📧 Seed des emails
    ├── news.seed.ts  # 🗞 Seed des news
    ├── transactions.seed.ts  # 💰 Seed des transactions
    └── index.ts  # 📌 Exporte tous les seeds pour le script principal
```

---

## 🔧 **5️⃣ Ordre de création des entités**

Les entités doivent être créées **dans cet ordre précis** pour éviter les erreurs de relation :

1. **Users** (utilisateur standard, administrateur premium, utilisateur premium)
2. **Projects** (un seul projet par utilisateur)
3. **NewsletterSubscriptions** (en fonction du type d’utilisateur)
4. **Emails** (chaque `NewsletterSubscription` reçoit 3 emails)
5. **News** (chaque `Email` reçoit 5 news)
6. **Transactions** (uniquement pour l’utilisateur premium)

---

## 🔧 **6️⃣ Règles pour les données à insérer**

#### **👤 Users (3 utilisateurs)**

| Type d’utilisateur | Nombre | Rôle    | Subscription Plan |
| ------------------ | ------ | ------- | ----------------- |
| Standard           | 1      | `user`  | `free`            |
| Administrateur     | 1      | `admin` | `premium`         |
| Premium            | 1      | `user`  | `premium`         |

- **Chacun a un projet par défaut.**

#### **🏗 Projects (1 par utilisateur)**

| Projet             | Propriétaire         |
| ------------------ | -------------------- |
| `project_standard` | Utilisateur standard |
| `project_admin`    | Administrateur       |
| `project_premium`  | Utilisateur premium  |

- **Chaque projet appartient à un utilisateur unique.**

#### **📩 NewsletterSubscriptions (différent selon les utilisateurs)**

| Type d’utilisateur | Nombre de subscriptions |
| ------------------ | ----------------------- |
| Standard           | 1                       |
| Administrateur     | 3                       |
| Premium            | 2                       |

- **Chaque `NewsletterSubscription` est liée au projet de l’utilisateur.**

#### **📧 Emails (3 par `NewsletterSubscription`)**

- **Chaque `NewsletterSubscription` reçoit**exactement 3 emails\*\*.

#### **🗞 News (5 par email)**

- **Chaque `Email` reçoit**exactement 5 news\*\*.

#### **💳 Transactions (1 pour l’utilisateur premium)**

| Type d’utilisateur | Nombre de transactions |
| ------------------ | ---------------------- |
| Standard           | 0                      |
| Administrateur     | 0                      |
| Premium            | 1                      |

- **L’utilisateur premium a **une transaction** liée à son abonnement.**

---

## 🔧 **7️⃣ Contraintes relationnelles**

✅ **User → Project** (Un projet **doit** être rattaché à un utilisateur)  
✅ **Project → NewsletterSubscription** (Une `NewsletterSubscription` **doit** être rattachée à un projet)  
✅ **NewsletterSubscription → Email** (Un `Email` **doit** être rattaché à une `NewsletterSubscription`)  
✅ **Email → News** (Une `News` **doit** être rattachée à un `Email`)  
✅ **Transaction → User** (Une `Transaction` **doit** être rattachée à un utilisateur)  
✅ **NewsletterSubscription → User** (Chaque `NewsletterSubscription` **doit** appartenir à un utilisateur)  
✅ **Un utilisateur premium doit avoir une transaction, mais un admin premium n’en a pas.**

---

## 🚀 **8️⃣ Exécution du script**

Une fois les seeds créés, exécuter la commande :

```sh
pnpm --filter backend prisma:seed
```

---

## ✅ **9️⃣ Validation Finale**

- **Vérifier que chaque entité a bien été insérée en base de données.**
- **S’assurer que les relations sont bien respectées en consultant `pnpm --filter backend prisma studio`.**
- **Si une erreur de relation survient, ajuster l’ordre des créations.**
