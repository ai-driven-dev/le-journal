# Frontend : Refactoring du "dashboard"

- [x] extraire les types de données dans le fichier type du répertoire correspondant.
- [x] s'assurer qu'ils sont cohérents.
- [x] déplacer dans "shared-types" mais uniquement pour les types de données, pas le reste du store.

# User-Stories

- [x] Prompt à utiliser pour clairifier intentions courtes
- [x] User-Story ULTRA COURTES pour parcours minimaliste.

# Backend

- [ ] définition des routes sous forme de use-case
- [x] swagger
- [x] utilisation des shared-types pour renvoyer les types de données au frontend.

# Link - Relier le back et le front

- [ ] le frontend récupère les données du backend via le schema API.
- [ ] Les données sont typées avec les shared-types.
- [ ] On affiche les données du backend sur le frontend.

---

## 📜 User Stories

### **👤 User Data**

- **The dashboard retrieves the user profile** _(System)_

  - **Trigger**: On dashboard load
  - **Input**: `userId: string`
  - **Output**: `{ id, firstName, lastName, avatarUrl }`

- **The dashboard retrieves the user's email alias** _(System)_
  - **Trigger**: On dashboard load
  - **Input**: `projectId: string`
  - **Output**: `newsletterAlias: string`

---

### **📩 Newsletter Management**

- **The dashboard loads the latest received newsletters** _(System)_

  - **Trigger**: On dashboard load
  - **Input**: `userId: string`
  - **Output**: `NewsletterEmail[]`

- **Articles linked to a newsletter are preloaded and displayed** _(System)_
  - **Trigger**: When newsletters are loaded
  - **Input**: `newsletterId: string`
  - **Output**: `Article[]` _(inside `NewsletterEmail`)_

---

### **🔍 Search & Reading**

- **The user searches for a newsletter by keyword** _(User)_

  - **Trigger**: When entering a search term
  - **Input**: `searchTerm: string`
  - **Output**: `NewsletterEmail[]`

- **The user opens a newsletter and sees its articles** _(User)_
  - **Trigger**: When clicking on a newsletter
  - **Input**: `newsletterId: string`
  - **Output**: `{ id, subject, content, articles }`

---

### **🤖 AI Personalization**

- **The user configures a message for the AI** _(User)_

  - **Trigger**: When modifying the input field
  - **Input**: `customMessage: string`
  - **Output**: Stored in `UserProfile.prompt_instruction`

- **The dashboard verifies that the sent message matches the stored one** _(System)_
  - **Trigger**: When receiving the API response
  - **Input**: `customMessage: string`
  - **Output**:
    - ✅ **If identical** → Normal display
    - ❌ **If different** → Show error and update the value

---

### **📋 Other Interactions**

- **The user copies their email alias** _(User)_
  - **Trigger**: When clicking the copy button
  - **Input**: `newsletterAlias: string`
  - **Output**: Alias copied to clipboard

---

### **⚠️ Error Handling**

- **If an error occurs during data retrieval, display a clear message** _(System)_
  - **Trigger**: When an API request fails
  - **Input**: API error
  - **Output**: Display an error message
