# Blabber Frontend 🗣️

The **frontend** of Blabber – a modern social posting app built with **Next.js 14** and **TypeScript**. It connects to a FastAPI backend via API.

---

## ⚙️ Tech Stack
- Framework: **Next.js 14** (App Router)
- Language: **TypeScript**
- Styling: **Tailwind CSS**
- API: **Fetch** requests to FastAPI backend

---

## Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/sparsh-Tyagi01/blabber.git
cd blabber
npm install
```

### 2. Setup Environment
Create a `.env` file at the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run the App
```bash
npm run dev
```

---

## 📦 Folder Structure
```
blabber/
├── public/
├── src/
├── .env.example
├── .gitignore
├── next.config.ts
├── tsconfig.json
└── ...
```

---

## 🔗 Backend
API is served by a separate FastAPI backend:  
👉 [Blabber Backend Repo](https://github.com/sparsh-Tyagi01/blabber-backend)

---
