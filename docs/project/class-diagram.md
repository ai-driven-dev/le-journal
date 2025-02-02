# Diagramme de Classe de l'application

````mermaid
classDiagram
    class User {
        +UUID id
        +STRING email  %% UNIQUE INDEX
        +STRING google_id
        +STRING access_token
        +STRING refresh_token
        +STRING first_name
        +STRING last_name
        +STRING profile_picture
        +STRING username  %% UNIQUE INDEX
        +ENUM role  %% "admin", "user"
        +TIMESTAMP created_at
        +TIMESTAMP last_login_at

        %% @@map("users") → Prisma table mapping
    }

    class Project {
        +UUID id
        +UUID user_id
        +INT project_number  %% UNIQUE INDEX (user_id, project_number)
        +STRING name  %% UNIQUE INDEX
        +STRING slug  %% UNIQUE INDEX (user_id, slug)
        +TIMESTAMP created_at

        %% @@map("projects") → Prisma table mapping
    }

    class UserProfile {
        +UUID id
        +UUID user_id
        +ENUM subscription_plan  %% "free", "premium"
        +STRING newsletter_email_alias
        +TEXT prompt_instruction
        +STRING gmail_alias_folder_url

        %% @@map("user_profiles") → Prisma table mapping
    }

    class NewsletterSubscription {
        +UUID id
        +UUID user_id  %% INDEX
        +STRING newsletter_name
        +STRING newsletter_email
        +STRING newsletter_url
        +ENUM status  %% "pending", "active", "failed"
        +TIMESTAMP subscribed_at

        %% @@map("newsletter_subscriptions") → Prisma table mapping
    }

    class Email {
        +UUID id
        +UUID project_id  %% INDEX
        +UUID newsletter_subscription_id  %% INDEX
        +STRING subject  %% FULL-TEXT INDEX (MeiliSearch)
        +TEXT raw_content
        +TIMESTAMP received_at  %% INDEX (project_id, received_at DESC)
        +ENUM status  %% INDEX

        %% @@map("emails") → Prisma table mapping
    }

    class News {
        +UUID id
        +UUID email_id  %% INDEX
        +STRING title  %% FULL-TEXT INDEX (MeiliSearch)
        +TEXT description  %% FULL-TEXT INDEX (MeiliSearch)
        +STRING url
        +TEXT content
        +FLOAT relevance_score
        +TIMESTAMP extracted_at

        %% @@map("news") → Prisma table mapping
    }

    class Transaction {
        +UUID id
        +UUID user_id  %% INDEX
        +STRING stripe_payment_id
        +DECIMAL amount
        +STRING currency
        +ENUM status  %% "paid", "pending", "failed"
        +ENUM payment_method  %% "card", "paypal", "crypto"
        +TIMESTAMP payment_date
        +STRING invoice_url

        %% @@map("transactions") → Prisma table mapping
    }

    %% Relationships
    User "1" -- "MANY" Project : owns
    User "1" -- "1" UserProfile : owns
    User "1" -- "MANY" NewsletterSubscription : subscribed_to
    Project "1" -- "MANY" Email : contains
    Email "1" -- "MANY" News : generates
    Email "1" -- "1" NewsletterSubscription : originates_from
    User "1" -- "MANY" Transaction : makes
````
