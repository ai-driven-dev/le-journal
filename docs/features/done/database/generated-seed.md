# Instruction: Génération des seeds pour la base de données Prisma

## 🎯 Objectif

Générer des **données de test cohérentes** pour initialiser la base de données.  
Les seeds doivent **respecter l’ordre des dépendances** et être **typiquement corrects** selon les types générés par Prisma.

⚠️ **Tous les objets doivent être typés avec `Prisma.<Model>CreateInput`.**  
⚠️ **Les relations entre les objets doivent être strictement respectées pour éviter toute incohérence.**

---

## 📂 **Structure des fichiers de seed**

Tous les fichiers de seed doivent être placés dans le dossier suivant :

```
apps/backend/prisma/
├── migrations/  # 🛠 Contient les migrations Prisma générées
├── seed.ts  # 🏗 Entry point du script de seed
└── seeds/  # 📂 Contient les fichiers de fixture
    ├── users.seed.ts  # 👤 Seed des utilisateurs
    ├── projects.seed.ts  # 🏗 Seed des projets
    ├── newsletterSubscriptions.seed.ts  # 📰 Seed des abonnements
    ├── emails.seed.ts  # 📧 Seed des emails
    ├── news.seed.ts  # 🗞 Seed des news
    ├── transactions.seed.ts  # 💰 Seed des transactions
    └── index.ts  # 📌 Exporte tous les seeds pour le script principal
```

✅ **Pourquoi cette structure ?**

- **Chaque entité a son propre fichier de seed** → **Modularité & scalabilité**
- **Le fichier `index.ts`** agrège tous les seeds pour une exécution unique.
- **Le `seed.ts` est l’entrée principale** qui appelle `index.ts` et exécute Prisma.

---

## 🚀 **1️⃣ Vérification des types Prisma**

Avant de commencer à générer les seeds, **on doit s’assurer que les types Prisma existent bien.**

✔ **Exécuter la commande suivante pour générer les types Prisma :**

```sh
pnpm --filter backend prisma generate
```

✔ **Vérifier que les types Prisma sont disponibles dans le projet :**  
Dans le fichier `node_modules/@prisma/client/index.d.ts`, on doit voir les types suivants :

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

📌 **Si ces types ne sont pas présents, la génération a échoué et doit être corrigée avant de continuer.**

✔ **Vérifier que chaque fichier de seed importe correctement les types Prisma :**

```ts
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userSeed: Prisma.UserCreateInput = { ... };

export async function seedUsers() {
  await prisma.user.create({ data: userSeed });
}
```

📌 **✅ Chaque fichier de seed doit utiliser les types corrects de Prisma pour éviter les erreurs.**

Attention, avant chaque génération vérifier les propriétés des types `prisma` des objets à créer. On doit s'assurer que nos seeds vont matcher les types Prisma.

---

## 🚀 **2️⃣ Global Steps**

1. **Créer les entités dans le bon ordre** pour éviter les erreurs de relations.
2. **Respecter les contraintes relationnelles** définies plus bas.
3. **Respecter les nombres spécifiques** de chaque entité.

---

## 🔧 **3️⃣ Ordre de création des entités**

Les entités doivent être créées **dans cet ordre précis** :

1. **Users** (utilisateur standard, administrateur premium, utilisateur premium)
2. **Projects** (un seul projet par utilisateur)
3. **NewsletterSubscriptions** (en fonction du type d’utilisateur)
4. **Emails** (chaque `NewsletterSubscription` reçoit 3 emails)
5. **News** (chaque `Email` reçoit 5 news)
6. **Transactions** (uniquement pour l’utilisateur premium)

---

## 🔧 **4️⃣ Règles pour les données à insérer**

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

- **Chaque `NewsletterSubscription` reçoit **exactement 3 emails\*\*.

#### **🗞 News (5 par email)**

- **Chaque `Email` reçoit **exactement 5 news\*\*.

#### **💳 Transactions (1 pour l’utilisateur premium)**

| Type d’utilisateur | Nombre de transactions |
| ------------------ | ---------------------- |
| Standard           | 0                      |
| Administrateur     | 0                      |
| Premium            | 1                      |

- **L’utilisateur premium a **une transaction** liée à son abonnement.**

---

## 🔧 **5️⃣ Contraintes relationnelles**

✅ **User → Project** (Un projet **doit** être rattaché à un utilisateur)  
✅ **Project → NewsletterSubscription** (Une `NewsletterSubscription` **doit** être rattachée à un projet)  
✅ **NewsletterSubscription → Email** (Un `Email` **doit** être rattaché à une `NewsletterSubscription`)  
✅ **Email → News** (Une `News` **doit** être rattachée à un `Email`)  
✅ **Transaction → User** (Une `Transaction` **doit** être rattachée à un utilisateur)  
✅ **NewsletterSubscription → User** (Chaque `NewsletterSubscription` **doit** appartenir à un utilisateur)  
✅ **Un utilisateur premium doit avoir une transaction, mais un admin premium n’en a pas.**

---

## 🚀 **6️⃣ Exécution du script**

Une fois les seeds créés, exécuter la commande :

```sh
pnpm --filter backend prisma:seed
```

---

## ✅ **7️⃣ Validation Finale**

- **Vérifier que chaque entité a bien été insérée en base de données.**
- **S’assurer que les relations sont bien respectées en consultant `pnpm --filter backend prisma studio`.**
- **Si une erreur de relation survient, ajuster l’ordre des créations.**
