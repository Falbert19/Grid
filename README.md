# Grid – Local Brand Scroll-Based App

**Grid** is a social-style mobile-first web app that showcases local clothing brands through an infinite scroll feed. Built as a minimal viable product (MVP) to empower small businesses and connect them with the lovsl fashion audience.

---

## MVP Features

- Infinite scroll of local-brands posts (images, descriptions, prices)
- User registration & login (JWT-based)
- Brand dashboard to upload items
- Like system with real-time UI updates
- MongoDB-based product and user management

---

## Current Sprint

| Feature          | Status     | Assignee      |
|------------------|------------|---------------|
| Auth (JWT)       | Done     | Fernando Albert |
| Feed Scroll      | Working  | Fernando Albert |
| Upload Item      | Done     | Fernando Albert |
| Like Button      | In Dev   | Fernando Albert |
| Filter by Brand  | Planned  | Fernando Albert |

Sprint Board → [Trello Link](#)  
Bug Tracker → [GitHub Issues](#)

---

## Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React + TailwindCSS           |
| Backend     | Node.js + Express             |
| Auth        | JWT (JSON Web Tokens)         |
| Database    | MongoDB + Mongoose            |
| Deployment  | Vercel (Frontend), Render API |

---

## QA Testing

Test Flow:

- Create account → login
- Upload brand item
- View feed with uploaded post
- Like button registers +1
- Testing filters and edge cases

Postman Collection → [Download](#)

---

## Project Structure

```bash
Grid/
├── backend/
│   ├── routes/
│   ├── controllers/
│   └── models/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
├── tests/
├── .env
└── README.md


# 1. Clone repo
git clone https://github.com/youruser/Grid.git

# 2. Install backend
cd backend
npm install

# 3. Install frontend
cd ../frontend
npm install

# 4. Set up .env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 5. Run dev
# In two terminals:
npm run dev    # backend
npm start      # frontend
