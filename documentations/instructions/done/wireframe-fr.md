## Wireframe du Dashboard - Le Journal

### 🌟 **1. Header (Barre Supérieure)**

#### 🎨 **Contenu & Organisation**

- **Gauche** :
  - 🎨 **Logo cliquable** (**Bouton**) → Retour à l'accueil.
- **Milieu** :
  - 🔎 **Barre de recherche** (**Input**) pour trier la vue avec un terme.
- **Droite** :
  - ✉️ **Indicateur du nombre de newsletters** (**Texte statique**) (reçues & traitées).
  - 👤 **Avatar utilisateur + Nom** (**Menu déroulant**) :
    - ❌ **Se déconnecter** (**Bouton**).
    - ♻️ **Supprimer son compte** (**Bouton**).
    - 🔧 **Accès aux paramètres** (**Lien**).
    - 💰 **Upgrade de plan** (**Bouton** "Ajouter un plan").

### 📈 **2. Tableau principal - Newsletters reçues**

#### 🗒️ **Organisation & Structure**

- **Groupement par semaine** (**Section dynamique**) :
  - 🕒 "Semaine 7 - 8 au 15 février".
- **Organisation par newsletter** (**Tableau interactif**) :
  - 📒 **Newsletter (ex: TLDR)**.
    - 📅 **Date de réception** (**Colonne**).
    - 📧 **Sujet** (**Colonne**).
    - 🔍 **Voir la newsletter** (**Bouton**) → Ouvre une **popup** avec le contenu HTML.
    - ⏳ **Statut** → En cours de traitement (Texte dynamique).
  - 📑 **Liste des articles associés** (**Toggle déplié par défaut**).
  - ▶️ **Éléments affichés** (**Colonnes**) :
    - 📰 **Sujet de la news**.
    - 🔍 **Score d'importance**.
    - 📄 **Description courte**.

### 🛋️ **3. Sidebar droite - Statut des newsletters**

#### ➕ **Ajout de newsletter**

- 🔗 **Alias utilisateur** (**Texte readonly**) avec 📋 **Bouton "Copier"** (**Icône**).

#### 🔄 **Suivi des newsletters** (**Liste verticale dynamique**)

- ✅ **Inscription validée** (**Statut**).
- ⏳ **En attente de validation** (**Statut**).
- ⚠️ **Newsletter bloquée (plan limité)** (**Statut grisé**).

### 💳 **4. Bannière Upgrade (En bas à droite)**

#### 📃 **Contenu simplifié**

- **Texte d’accroche attractif** (**Texte**).
- 👉 **Bouton "Upgrade"** (**Lien vers offre premium**).

### 📝 **5. Footer flottant - Zone de personnalisation IA**

#### ✏️ **Saisie & Sécurisation**

- **Champ de saisie sécurisé** (**textarea avec limite de tokens**).
- ⭐ **Bouton de sauvegarde** avec **Pop-in de confirmation** (**Modal**).

---

## 🔍 **Recommandations UX/UI**

- 🚶‍♂️ **Navigation intuitive** : Menu simple, actions visibles et accessibles.
- 🎨 **Design épuré** : Priorité à la lisibilité et à l’organisation des informations.
- ⌚ **Réactivité & performance** : Affichage fluide, chargement optimisé.
- 👀 **Focus sur l'essentiel** : Suppression du menu sous le header, regroupement par semaines.
