## 📨 Event & Async Processing

### 🛠️ Technologie utilisée

- **BullMQ + Redis** pour la gestion des files d'attente et l'exécution des tâches asynchrones
- **Workers dédiés** pour traiter les jobs en arrière-plan sans bloquer l'API principale
- **PostgreSQL pour le suivi des jobs** et récupération après crash

### 📌 Tâches asynchrones gérées

| 🛠 **Queue**        | 📌 **Usage**                                      | 🏆 **Priorité** |
| ------------------- | ------------------------------------------------- | --------------- |
| `fetchEmails`       | 📩 Récupération des emails via Gmail API          | 🔥 Haute        |
| `processMails`      | 📊 Analyse du contenu des emails avec API Mistral | 🔥 Haute        |
| `indexNews`         | 🔍 Indexation des newsletters dans MeiliSearch    | 🟡 Moyenne      |
| `sendNotifications` | 📩 Envoi d'alertes aux utilisateurs               | 🟡 Moyenne      |

### 🔄 Exécution et Priorisation

- **Récupération des emails → Haute priorité** (doit être fait en temps réel)
- **Traitement des emails avec Mistral → Haute priorité** (dépendant des emails récupérés)
- **Indexation MeiliSearch → Moyenne priorité** (optimisation de la recherche)
- **Envoi des notifications → Moyenne priorité** (pas critique mais doit être fluide)

### 🔒 Garantie d'Idempotence (Éviter les Jobs en Double)

1. **Avant d'ajouter un job dans Redis :**
   - Vérification si **le même job existe déjà dans la queue**.
   - Vérification si **le job a déjà été traité en base PostgreSQL**.
2. **Si le job n'existe pas, il est ajouté à la queue** avec un `jobId` unique.
3. **Après exécution réussie, le statut du job est mis à jour en PostgreSQL**.
4. **En cas d'échec, un retry automatique de 3 fois est appliqué**.
5. **Si après 3 tentatives, le job échoue, il est déplacé en Dead Letter Queue (DLQ)**.

### 🚨 Gestion des Erreurs et Retry

- **Retry automatique 3 fois en cas d'échec.**
- **Dead Letter Queue (DLQ)** pour stocker les jobs échoués et les analyser.
- **Cas d'échec critique :**
  - **API Gmail** : Si la récupération des mails échoue → Retry.
  - **API Mistral** : Si le JSON est mal formé → Retry.
  - **Après 3 échecs**, la newsletter est **marquée comme invalide** et une **alerte est envoyée à l'administrateur**.

### 🔄 Relance des Jobs après Crash

- **Si Redis plante :**
  - Toutes les tâches en cours sont **récupérées depuis PostgreSQL**.
  - **Comparaison avec la queue** pour relancer les tâches incomplètes.
  - **Aucune donnée critique n'est perdue**.

### 🔍 Monitoring & Debugging

- **Bull Board** pour visualiser l'état des jobs en temps réel.
- **Logging des jobs échoués avec Winston**.
- **Envoi d'alertes email aux admins en cas d'échec d'une tâche critique**.

### 🌍 Gestion des Webhooks & Events Externes

- **Webhooks Google pour détecter les nouveaux emails entrants** (évite du polling).
- **Possibilité d'envoyer des notifications webhooks à d'autres services**.

### 🚀 Monitoring & Alerte Discord

#### ✅ **1. Stratégie de Monitoring**

- **Aucune surcharge de la stack** → Solution **simple & ultra légère**.
- **Tout est géré en mémoire**, pas besoin de Redis ni de persistance.
- **Processus totalement asynchrone pour éviter de bloquer les requêtes API.**

#### ✅ **2. Gestion des Logs avec Winston**

- **Winston enregistre toutes les erreurs API dans `logs/errors.log`.**
- **L’écriture des logs est asynchrone pour ne pas impacter les performances.**
- **Les erreurs critiques (`500`) déclenchent une notification instantanée.**

#### ✅ **3. Comptage des Erreurs en Mémoire**

- **Un compteur `errorCount` est maintenu en mémoire.**
- **Chaque nouvelle erreur incrémente `errorCount`.**
- **Un `setTimeout()` remet `errorCount` à `0` après `5 minutes`.**
- **Si `errorCount` atteint `10 erreurs` en 5 minutes → Alerte Discord.**
- **Chaque erreur `500` en production envoie immédiatement une alerte Discord.**

---

## ✅ **4. Conditions d’Envoi des Alertes**

| Condition | Action |
| --- | --- |
| **10 erreurs API en moins de 5 minutes** | Envoi d’une alerte Discord |
| **Erreur `500` en production** | Alerte immédiate |
| **Base de données ou Redis down** | Alerte immédiate |
| **Erreur `429 Too Many Requests` répétée** | Optionnel, si besoin |

---

## ✅ **5. Optimisation : 100% Asynchrone**

- **Aucune opération synchrone bloquante sur les requêtes API.**
- **L’écriture des logs avec Winston est totalement asynchrone.**
- **Le système de notification NestJS en mémoire ne bloque pas le thread principal.**
- **Envoi des alertes Discord en arrière-plan sans ralentir les traitements.**

---
