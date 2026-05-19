# SmartComplaint — AI-Powered Civic Complaint Management System

SmartComplaint is a modern MERN Stack application designed as a civic complaint management system for India. It integrates the Groq API (LLaMA 3.3 70B model) to automatically categorize complaints, detect urgency, determine sentiments, and draft professional auto-responses.

This project was built to satisfy all requirements for the **B.Tech 4th Semester ESE Examination (AIML Blended), Even Sem. 2025-26** for the course **AI Driven Full Stack Development (AI308B)**.

---

## Course Assessment Mapping

- **Q1: Frontend Modules** → Registration Form (with Name, Email, Category, Location, Description), Track Complaints List, Status Update Dropdown, and AI Analysis results cards.
- **Q2: Backend RESTful APIs** → Node.js/Express controllers and routes for all required endpoints (`POST /api/complaints`, `GET /api/complaints`, `PUT /api/complaints/:id`, `GET /api/complaints/search`).
- **Q3: MongoDB Schema** → Mongoose schema for complaints and users.
- **Q4: MERN Integration** → Complete reactive full-stack integration storing complaints in MongoDB and rendering them dynamically.
- **Q5: AI Integration** → Autonomously triggers Groq API call inside `POST /api/complaints` to populate priority, sentiment, summary, and auto-response.
- **Q6: Authentication & Security** → Implements JWT authentication, protected routes, bcrypt password hashing, and user signup/login workflows.
- **Q7: Git & GitHub** → Git repository initialized with clean commits.
- **Q8: Deployment** → Clean configuration ready for Render deployment.

---

## Folder Structure

```text
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI Components (ComplaintForm, Navigation, AnalysisDashboard)
│   │   ├── pages/          # Router Pages (Login, Signup, ComplaintList)
│   │   ├── App.jsx         # App routing & entry point
│   │   ├── index.css       # Custom Glassmorphism Styles & Design System
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express.js Backend
│   ├── config/             # DB Connection configuration
│   ├── controllers/        # Express Route Controllers (auth, complaint, AI)
│   ├── middleware/         # Custom Express Middlewares (authMiddleware)
│   ├── models/             # Mongoose DB Schemas (User, Complaint)
│   ├── prompts/            # System Prompt rules for Groq AI
│   ├── routes/             # Express API Routers
│   ├── .env                # Environment Config (JWT_SECRET, MONGO_URI, GROQ_API_KEY)
│   └── index.js            # Node app entry point
│
├── package.json            # Root configuration
├── .gitignore              # Ignored files configuration
└── README.md               # Documentation
```

---

## Tech Stack

- **Frontend:** React.js, Vite, Axios, React Router v6
- **Backend:** Node.js, Express.js, JWT, bcryptjs, Groq SDK
- **Database:** MongoDB Atlas, Mongoose
- **Styling:** Vanilla CSS Custom UI System (Glassmorphism, fluid micro-animations)

---

## How to Run Locally

### 1. Setup Backend
1. Go to `server/` directory and configure your `.env` file:
   ```env
   GROQ_API_KEY=gsk_xxxxxxxxxxxxxxx
   GROQ_MODEL=llama-3.3-70b-versatile
   PORT=9000
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=secretkey
   ```
2. From the root directory, install backend dependencies:
   ```bash
   npm install
   ```
3. Run the backend development server:
   ```bash
   npm run dev
   ```
   The backend starts at `http://localhost:9000`.

### 2. Setup Frontend
1. Navigate to the `client/` directory and install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   The frontend starts at `http://localhost:5174` (or `5173`).

---

## API Documentation

### Authentication APIs

| Endpoint | Method | Description | Body Params |
| :--- | :--- | :--- | :--- |
| `/api/auth/signup` | `POST` | Registers a new user account | `{ name, email, password }` |
| `/api/auth/login` | `POST` | Logs in and returns a JWT token | `{ email, password }` |

### Complaint APIs (Protected via JWT)

| Endpoint | Method | Description | Headers Required |
| :--- | :--- | :--- | :--- |
| `/api/complaints` | `POST` | Registers a new complaint (Public) | None |
| `/api/complaints` | `GET` | Fetches all complaints | `Authorization: Bearer <JWT>` |
| `/api/complaints/:id` | `PUT` | Updates a complaint status | `Authorization: Bearer <JWT>` |
| `/api/complaints/search?location=<location>` | `GET` | Searches complaints by location | `Authorization: Bearer <JWT>` |

---

## MongoDB Schema Description

### Complaint Schema
```javascript
{
  name: String,
  email: String,
  title: String,
  description: String,
  category: String,
  location: String,
  status: { type: String, default: "Pending" },
  aiAnalysis: {
    priority: String,
    department: String,
    urgency_score: Number,
    sentiment: String,
    summary: String,
    auto_response: String,
    estimated_resolution_days: Number,
    tags: [String]
  },
  createdAt: { type: Date, default: Date.now }
}
```

---

*SmartComplaint · AIML Blended · Even Semester 2025-26*
