# AI Mock Interviewer

An AI-powered mock interview platform that helps candidates practice technical and behavioral interviews, get instant feedback, and build interview confidence — before the real thing.

**Live App:** https://ai-mock-interviewer-eta-wheat.vercel.app/
**Repository:** https://github.com/NAKUL1707/Ai-Mock-Interviewer

---

## ✨ Features

- 🎙️ **Voice-based interview practice** using the Web Speech API for real-time speech recognition
- 🤖 **AI-generated interview questions & feedback** powered by Groq's `GPT-OSS 12B` model
- 🔐 **Secure authentication** via Google OAuth (Passport.js)
- 📊 **Structured feedback** on answers to help identify strengths and areas of improvement
- ⚡ **Fast, modern UI** built with React 19 and Tailwind CSS v4
- 🗄️ **Persistent user & interview data** stored in PostgreSQL via Supabase, managed with Prisma ORM

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Web Speech API

**Backend**
- Node.js + Express.js
- Prisma ORM (v5)
- PostgreSQL (via Supabase)
- Passport.js (Google OAuth)
- Groq API (`llama-3.3-70b-versatile`)

**Deployment**
- Frontend: [Vercel](https://vercel.com)
- Backend: [Render](https://render.com)

---

## 🏗️ Architecture

```
┌─────────────┐        ┌──────────────────┐        ┌────────────────┐
│   Frontend   │  API   │      Backend       │  SQL   │   PostgreSQL    │
│ React + Vite │ <----> │ Express + Prisma   │ <----> │   (Supabase)    │
│  (Vercel)    │        │     (Render)       │        │                 │
└─────────────┘        └──────────────────┘        └────────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │   Groq API   │
                        │ (LLM engine)  │
                        └──────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Supabase/PostgreSQL database
- A Groq API key
- Google OAuth credentials

### 1. Clone the repository
```bash
git clone https://github.com/NAKUL1707/Ai-Mock-Interviewer.git
cd Ai-Mock-Interviewer
```

### 2. Install dependencies
```bash
# In both /client and /server directories (adjust to actual folder names)
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory:
```env
DATABASE_URL=your_supabase_postgres_connection_string
GROQ_API_KEY=your_groq_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Run database migrations
```bash
npx prisma migrate dev
```

### 5. Start the app
```bash
# Backend
npm run dev

# Frontend (in a separate terminal)
npm run dev
```

The app should now be running locally, with the frontend on `http://localhost:5173` and backend on `http://localhost:5000`.

---

## ⚠️ Known Limitations

- Backend is hosted on Render's free tier, which spins down after inactivity — expect a **cold start delay of ~30-50 seconds** on the first request after idle periods. A keep-alive ping strategy is in place to help minimize this.

---

## 📌 Roadmap Ideas

- [ ] Reduce/remove backend cold-start delay (upgrade hosting tier or add a scheduled ping service)
- [ ] Add support for more LLM providers as fallback
- [ ] Expand feedback categories (communication, technical depth, structure)
- [ ] Add interview history/analytics dashboard

---

## 📄 License

This project is open for learning and portfolio reference. Feel free to fork and adapt it.

---

## 🙋 Author

Built by **Nakul** as a lead portfolio project demonstrating full-stack (MERN-adjacent) development, AI integration, and real-world deployment problem-solving.
