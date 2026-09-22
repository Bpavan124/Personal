# Boddu Pavankalyan — Portfolio & Project Booking Service

An ultra-modern, full-stack personal portfolio and project booking application built with **Node.js, Express, and modern web standards**. 

Features complete engineering documentation / case study pages for every project, along with an interactive **"Book a Project"** requirements submission system that automatically sends emails to `bpavanqwe@gmail.com`.

---

## 🚀 Key Features

1. **Complete Project Documentation Pages (`project-details.html?id=...`)**:
   - In-depth technical case studies for all projects (*Student Management System*, *MongoDB Shell Automation*, *AI in Healthcare*, and *Data Visualization Engine*).
   - System architecture breakdowns, relational database ER schemas, and RESTful API endpoints.
   - Key engineering challenges and solutions.

2. **Automated "Book a Project" & Email Dispatch**:
   - Modern accessible modal dialog (`<dialog>`).
   - Gathers client name, email, phone/WhatsApp, company, project category, budget, deadline, and detailed requirements.
   - Dispatches a structured, high-priority HTML email to `bpavanqwe@gmail.com`.
   - Sends an automated confirmation receipt to the client.

3. **RESTful Backend APIs**:
   - `GET /api/health` — Server and email status.
   - `GET /api/projects` — List of showcase projects with filter support.
   - `GET /api/projects/:id` — Complete technical documentation for a specific project.
   - `POST /api/book-project` — Receives project briefs, validates inputs, and triggers email notifications.
   - `POST /api/contact` — Direct message inbox API.

4. **Modern UI & Aesthetic**:
   - Sleek dark theme with CSS custom properties, glassmorphism, responsive grid, status badges, and interactive category filter tabs.
   - Toast notifications for instant feedback.

---

## 🛠️ Getting Started

### 1. Installation

Ensure you have [Node.js](https://nodejs.org/) installed:

```bash
npm install
```

### 2. Configure Email (Gmail App Password)

To have project requirements automatically delivered to your Gmail inbox (`bpavanqwe@gmail.com`):

1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Enable **2-Step Verification**.
3. Under 2-Step Verification, search for or click **App passwords**.
4. Create an App Password with the name `Portfolio`.
5. Copy the 16-character password into `.env`:

```env
PORT=5000
EMAIL_USER=bpavanqwe@gmail.com
EMAIL_PASS=your_16_character_app_password
RECIPIENT_EMAIL=bpavanqwe@gmail.com
```

*(Note: If `.env` is not yet configured, the server runs in safe development preview mode and outputs received bookings directly to the terminal console without crashing).*

### 3. Run the Application

```bash
npm start
```

Or for automatic reload during development:

```bash
npm run dev
```

Visit the portfolio in your browser:
**`http://localhost:5000`**

---

## 📡 API Reference

### `GET /api/projects`
Query Params: `?category=fullstack|devops|ai|data|all`
Returns list of projects with tags and summaries.

### `GET /api/projects/:id`
Parameters: `:id` (e.g. `student-management`, `mongodb-shell-setup`, `ai-in-healthcare`, `data-visualization`)
Returns full documentation, ER schema, architecture, and API specs.

### `POST /api/book-project`
Body:
```json
{
  "clientName": "Sarah Connor",
  "clientEmail": "sarah@example.com",
  "clientPhone": "+91 98765 43210",
  "company": "Tech Corp",
  "projectType": "Full-Stack Web Application",
  "timeline": "Standard (2 - 4 weeks)",
  "estimatedBudget": "$500 - $1,500 / ₹40k - ₹1.2L",
  "deadline": "2026-10-15",
  "techPreferences": "Node.js, Express, MySQL",
  "projectRequirements": "Need a multi-tenant client portal with role-based auth..."
}
```

### `POST /api/contact`
Body:
```json
{
  "name": "Alex",
  "email": "alex@example.com",
  "message": "Hi, I would like to discuss an opportunity."
}
```