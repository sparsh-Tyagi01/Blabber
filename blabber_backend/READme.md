# Blabber Backend

This is the **FastAPI backend** for Blabber – a social posting platform. It provides JWT authentication and REST APIs for user and post management.

---

## ⚙️ Tech Stack

- Framework: **FastAPI**
- Auth: **JWT**
- DB: **SQLite** (or switchable to PostgreSQL)
- ORM: **SQLAlchemy**
- Password Hashing: **bcrypt**

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/sparsh-Tyagi01/blabber-backend.git
cd blabber-backend
```

### 2. Setup Environment

Create `.env` file based on `.env.example`

```env
DATABASE_URL=sqlite:///./blabber.db
JWT_SECRET=your_secret_key
```

### 3. Install Dependencies

Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### 4. Run the Server

```bash
uvicorn blabber.main:app --reload
```

---

## 📦 Folder Structure

```
BLABBER_BACKEND/
├── blabber/
│   ├── main.py
│   ├── auth.py
│   ├── model.py
│   ├── schemas.py
│   ├── hashing.py
│   └── database.py
├── blabber.db
├── .env.example
├── .gitignore
└── requirements.txt
```

---

## 🔗 Frontend
Blabber’s frontend lives here:  
👉 [Blabber Frontend Repo](https://github.com/sparsh-Tyagi/blabber)

---

## 🪪 License

MIT
