# 🚀 Hosting & Deployment

## 🏢 Hébergement

- **Serveur dédié OVH** choisi pour **simplicité et coûts maîtrisés**.
- **Environnement unique en production**, avec une base de test en local.
- Pas d'environnement staging externe.

## 🛠️ Orchestration

- **Déploiement Dockerisé** sur OVH.
- **Pas d'orchestrateur Kubernetes** prévu pour le MVP.
- Scalabilité gérée **manuellement** en ajoutant des conteneurs si nécessaire.

## 🔄 CI/CD (Intégration & Déploiement)

- **GitHub Actions** utilisé pour :
  - Linting
  - Tests unitaires
  - Tests fonctionnels (E2E)
- **Déploiement manuel** sur OVH via Docker (pas d'automatisation complète pour le moment).
- **Rollback manuel** en cas de problème.

## 🏗️ Infrastructure as Code (IaC)

- **Pas d'IaC prévu** (Terraform, Ansible non utilisés).
- Configuration manuelle du serveur OVH.

## 📈 Scalabilité & Monitoring

- **Architecture monolithique** sur OVH.
- **Montée en charge gérée en ajoutant des conteneurs Docker** au besoin.
- **Gestion des tâches planifiées via OVH Cron Jobs**.
- **Monitoring** non prévu au MVP, mais possible en V2 (ex: Prometheus/Grafana). 