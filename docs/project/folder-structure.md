# 📁 Full Folder Structure – Feature-Based, Tests Added & Clarifications

```
root/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── features/
│   │   │   │   ├── users/
│   │   │   │   │   ├── application/
│   │   │   │   │   │   ├── use-cases/
│   │   │   │   │   │   │   ├── create-user.ts
│   │   │   │   │   │   │   ├── update-user.ts
│   │   │   │   │   │   │   ├── delete-user.ts
│   │   │   │   │   │   ├── users.facade.ts
│   │   │   │   │   ├── domain/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   ├── user.ts
│   │   │   │   │   │   ├── value-objects/
│   │   │   │   │   │   │   ├── email.ts
│   │   │   │   │   │   │   ├── password.ts
│   │   │   │   │   │   ├── policies/           # ⬅️ Optionnel (ex: gestion stricte des règles métier)
│   │   │   │   │   │   │   ├── password-policy.ts
│   │   │   │   │   │   │   ├── email-verification-policy.ts
│   │   │   │   │   │   ├── exceptions/
│   │   │   │   │   │   │   ├── user-not-found.exception.ts
│   │   │   │   │   │   │   ├── invalid-password.exception.ts
│   │   │   │   │   ├── repositories/
│   │   │   │   │   │   ├── user.repository.ts
│   │   │   │   │   ├── adapters/
│   │   │   │   │   │   ├── external-auth.adapter.ts
│   │   │   │   │   ├── emails/
│   │   │   │   │   │   ├── user-notification.mail.ts
│   │   │   │   │   ├── config/
│   │   │   │   │   │   ├── users.config.ts
│   │   │   │   ├── users.module.ts
│   │   │   ├── tests/
│   │   │   │   ├── unit/
│   │   │   │   │   ├── users/
│   │   │   │   │   │   ├── create-user.spec.ts
│   │   │   │   │   │   ├── update-user.spec.ts
│   │   │   │   ├── e2e/
│   │   │   │   │   ├── users.e2e-spec.ts
│   │   ├── README.md

│   ├── frontend/
│   │   ├── app/
│   │   │   ├── routes/
│   │   │   │   ├── newsletters/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── [id].tsx
│   │   │   ├── features/
│   │   │   │   ├── newsletters/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── NewsletterCard.tsx
│   │   │   │   │   │   ├── NewsletterList.tsx
│   │   │   │   │   │   ├── NewsletterItem.tsx
│   │   │   │   │   │   ├── NewsletterForm.tsx
│   │   │   │   │   │   ├── NewsletterActions.tsx
│   │   │   │   │   ├── stores/
│   │   │   │   │   │   ├── newsletters.store.ts
│   │   │   │   │   ├── hooks/
│   │   │   │   │   │   ├── useNewsletter.ts
│   │   │   │   │   │   ├── useNewsletterForm.ts
│   │   │   │   │   │   ├── useNewsletterActions.ts
│   │   │   │   │   ├── api/
│   │   │   │   │   │   ├── newsletters.api.ts
│   │   │   │   │   ├── types/
│   │   │   │   │   │   ├── newsletter.ts
│   │   │   │   │   ├── tests/
│   │   │   │   │   │   ├── newsletters.spec.ts
│   │   │   │   │   ├── newsletters.module.ts
│   │   │   ├── shared/
│   │   │   │   ├── stores/
│   │   │   │   │   ├── auth.store.ts
│   │   │   │   │   ├── notifications.store.ts
│   │   │   │   ├── api/
│   │   │   │   │   ├── http.ts
│   │   │   ├── entry.server.tsx
│   │   ├── README.md
```
