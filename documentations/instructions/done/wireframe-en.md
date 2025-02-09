## Wireframe of the Dashboard - Le Journal

### 1. Header (Top Bar)

#### Content & Organization

- **Left**:
  - Clickable **logo button** that redirects to the homepage.
- **Center**:
  - **Search bar input** to filter the view with a keyword.
- **Right**:
  - **Static text indicator** "Pending newsletters 2".
  - **Dropdown menu for user profile**:
    - **Logout button**.
    - **Delete account button**.
    - **Link to settings**.
    - **Upgrade button** labeled "Add a plan".

### 2. Main Table - Received Newsletters

#### Organization & Structure

- **Grouped by week** (Dynamic section):
  - Example: "Week 7 - February 8 to 15".
- **Organized by newsletter** (Interactive table in accordion to display news articles):
  - **Newsletter title** (e.g., TLDR).
    - **Received date column**.
    - **Subject column**.
    - **View newsletter button**, which opens a Drawer displaying the HTML content.
    - **Processing status dynamic text**.
  - **Associated articles list** (expanded by default).
  - **Displayed elements (Columns)**:
    - **News subject** with Link (if link is broken, use an icon and grayed link).
    - **Importance score**.
    - **Short description**.
  - A newsletter can be "processing", display a loader icon with text.
  - A newsletter can be "failed", with unknown statuts, display a warning icon with text.

### 3. Right Sidebar - Newsletter Status

#### Newsletter Addition

- **User alias readonly text** with a **copy button icon**.
- Hover-Card is used to display a beautiful information: "Please use this e-mail alias to register yourself in the newsletters forms you want to track. You will receive a notification when a new newsletter is available!"
- There is no "add a newsletter" button, just the generated alias.

#### Newsletter Tracking (Dynamic Vertical List)

- **Validated registration status**.
- **Pending validation status**.
- **Blocked newsletter status** (grayed out for limited plans).

### 4. Upgrade Banner (Bottom Right)

#### Simplified Content

- **Attractive promotional text**.
- **Upgrade button** linking to the premium offer.

### 5. Floating Footer - AI Customization Area

#### Input & Security

- Short label that informs "How should be personalized your newsletter score? What do you want to see more or less?"
- **Secure textarea with a token limit** on the right (Example : "83/200 tokens")
- **Save button** with a **confirmation pop-in modal**.

---

## UX/UI Recommendations

- **Intuitive navigation**: Simple menu, visible and accessible actions.
- **Clean design**: Prioritizing readability and information organization.
- **Responsiveness and performance**: Smooth display, optimized loading.
- **Focus on essentials**: Removal of unnecessary elements, weekly grouping for clarity.
