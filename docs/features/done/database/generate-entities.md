# Instruction: Génération des entités Prisma avec relations et contraintes

## 🎯 Objectif  

Créer et configurer les **entités Prisma** selon le **schéma Mermaid**, en respectant les contraintes suivantes :  

- **Respect de la Clean Architecture & DDD**  
- **Relations strictes** entre `User`, `Project`, `NewsletterSubscription`, `Email`, etc.  
- **Suppression en cascade** sur les relations critiques.  
- **Migrations Prisma et génération des types TypeScript**.  
- **⚠️ L'entité `User` existe déjà et ne doit pas être modifiée. Les nouvelles entités doivent être liées à cet utilisateur existant.**  

---

## 🚀 **Global Steps**  

1. **Créer/Mettre à jour `schema.prisma`** avec les nouvelles entités.  
2. **Définir les relations et contraintes (`cascadeOnDelete`).**  
3. **Lancer les commandes Prisma adaptées à `pnpm` pour appliquer la migration.**  
4. **Générer les types TypeScript Prisma.**  
5. **Valider les modèles et leurs relations avant de passer à l’étape du seed.**  

---

## 🔧 **Guidelines & Contraintes**  

### 📂 **Organisation des fichiers**  

- **Le fichier principal** est : `apps/backend/prisma/schema.prisma`.  
- **On ne crée pas de fichiers TypeScript d’entités** → Prisma gère déjà les types.  
- **Le fichier de migration sera généré automatiquement** après validation du `schema.prisma`.  

### ⚠️ **Contraintes à respecter**  

- **Respect strict du schéma Mermaid fourni.**  
- **Relations bien définies avec suppression en cascade (`onDelete: Cascade`).**  
- **Index sur les clés utilisées en recherche (`email`, `subject`, etc.).**  
- **Les UUID sont les identifiants principaux.**  
- **L'entité `User` existe déjà**, il faut mettre à jour la nôtre dans le projet avec ces nouvelles informations.

---

## 🛠 **Étapes Techniques**  

### 📌 **1️⃣ Mise à jour de `schema.prisma`**

1. **Ajouter les nouvelles entités dans `apps/backend/prisma/schema.prisma`.**  
2. **Respecter le format suivant pour chaque entité :**  

```prisma
model Project {
  id             String   @id @default(uuid())
  user_id        String
  project_number Int      @unique
  name           String   @unique
  slug           String   @unique
  created_at     DateTime @default(now())

  user   User   @relation(fields: [user_id], references: [id], onDelete: Cascade)
  emails Email[]
}

model UserProfile {
  id                        String   @id @default(uuid())
  user_id                   String   @unique
  subscription_plan          SubscriptionPlan
  newsletter_email_alias     String
  prompt_instruction        Text
  gmail_alias_folder_url    String

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)
}

model NewsletterSubscription {
  id                  String   @id @default(uuid())
  user_id             String
  newsletter_name     String
  newsletter_email    String
  newsletter_url      String
  status              SubscriptionStatus
  subscribed_at       DateTime @default(now())

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)
}

model Email {
  id                        String   @id @default(uuid())
  project_id                String
  newsletter_subscription_id String
  subject                   String
  raw_content               Text
  received_at               DateTime @default(now())
  status                    EmailStatus

  project Project @relation(fields: [project_id], references: [id], onDelete: Cascade)
  newsletterSubscription NewsletterSubscription @relation(fields: [newsletter_subscription_id], references: [id], onDelete: Cascade)
  news News[]
}

model News {
  id                String   @id @default(uuid())
  email_id          String
  title             String
  description       Text
  url               String
  content           Text
  relevance_score   Float
  extracted_at      DateTime @default(now())

  email Email @relation(fields: [email_id], references: [id], onDelete: Cascade)
}

model Transaction {
  id                String   @id @default(uuid())
  user_id           String
  stripe_payment_id String
  amount            Decimal
  currency          String
  status            PaymentStatus
  payment_method    PaymentMethod
  payment_date      DateTime @default(now())
  invoice_url       String

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

---

### 📌 **2️⃣ Définir les relations et contraintes**

- **Chaque relation doit être explicitement définie avec `@relation()`.**  
- **Les `onDelete: Cascade` doivent être mis sur les relations suivantes :**  
  - `User → Project`  
  - `User → UserProfile`  
  - `User → NewsletterSubscription`  
  - `Project → Email`  
  - `Email → News`  

---

### 📌 **3️⃣ Lancer les commandes Prisma (via `pnpm`)**

Une fois les entités mises à jour, exécuter :  

```sh
pnpm --filter backend prisma migrate dev --name init_entities
pnpm --filter backend prisma generate
```

✅ **Explication** :  

- `prisma migrate dev` → Applique les modifications à la base.  
- `prisma generate` → Génère les types TypeScript correspondants.  

---

### 📌 **4️⃣ Vérifications & Validation**  

**S’assurer que les relations fonctionnent bien en exécutant :**  

```sh
pnpm --filter backend prisma studio
```  

**Objectif** : Vérifier que les tables et relations sont bien créées.  

---

## ✅ **Validation Finale**  

- **Si tout est correct**, on passe à l’étape suivante : la **génération des seeds**.  
- **Si un problème est détecté**, ajuster `schema.prisma` avant de continuer.  
