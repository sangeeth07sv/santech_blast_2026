# BLAST 2026

**Beyond Limits: AI, Innovation & Technology**
Hosted by **RVS Institute of Technology**

A premium, full-stack symposium website with Google-authenticated registration,
a live dashboard, and a FastAPI + Firestore backend.

---

## Tech Stack

| Layer          | Technology                                   |
|----------------|-----------------------------------------------|
| Frontend       | Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion |
| Backend        | FastAPI, Python, Firebase Admin SDK           |
| Database       | Firebase Firestore                            |
| Authentication | Firebase Google Login                         |
| Frontend host  | Vercel                                        |
| Backend host   | Render                                        |
| Source control | GitHub                                        |

## Project Structure

```
blast2026/
├── frontend/            Next.js app (Home, Register, Dashboard)
│   ├── app/              Routes: /, /register, /dashboard
│   ├── components/       Hero, About, Events, Schedule, PrizePool, FAQ, Contact, Footer, Navbar...
│   ├── lib/               Firebase client, Auth context, API helper
│   └── types/             Shared TypeScript types
├── backend/              FastAPI app
│   ├── app/
│   │   ├── main.py         FastAPI app + CORS
│   │   ├── config.py       Environment settings
│   │   ├── firebase.py     Firebase Admin initialization
│   │   ├── models/         Pydantic schemas
│   │   └── routes/         health.py, register.py
│   ├── main.py            Entrypoint (`main:app`)
│   └── requirements.txt
└── README.md              You are here
```

---

## 1. Prerequisites

- Node.js 18.18+ and npm
- Python 3.11+
- A Firebase project (free Spark plan is enough)
- Git + a GitHub account
- Vercel account (frontend hosting)
- Render account (backend hosting)

---

## 2. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) → **Add project** → name it e.g. `blast-2026`.
2. **Enable Authentication**
   - Build → Authentication → Get Started
   - Sign-in method → enable **Google**
3. **Enable Firestore**
   - Build → Firestore Database → Create database → start in **production mode**
   - Firestore will auto-create two collections the first time data is written:
     - `users` — one document per authenticated user (`uid` as document ID)
     - `registrations` — one document per event registration
4. **Get the Web App config (for the frontend)**
   - Project settings (gear icon) → General → Your apps → Add app → Web (`</>`)
   - Copy the `firebaseConfig` values into `frontend/.env.local` (see below).
5. **Get a Service Account key (for the backend)**
   - Project settings → Service accounts → **Generate new private key**
   - This downloads a JSON file. Keep it secret — never commit it to Git.
6. **Firestore Security Rules** (recommended baseline — edit in Firestore → Rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{docId} {
      allow read: if false;   // reads happen only via the backend (Admin SDK bypasses rules)
      allow write: if false;  // writes happen only via the backend
    }
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false;
    }
  }
}
```

   All reads/writes in this project go through the FastAPI backend using the
   Admin SDK, which bypasses these rules by design — the rules above simply
   lock the database down from direct client access.

---

## 3. Frontend — Local Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Fill in `frontend/.env.local` with your Firebase Web App config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

Build for production:

```bash
npm run build
npm start
```

---

## 4. Backend — Local Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env`:

- Place your downloaded Firebase service account JSON file at
  `backend/serviceAccountKey.json` and set:
  ```
  GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
  ```
- Set `ALLOWED_ORIGINS` to include your frontend URL(s), comma-separated:
  ```
  ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
  ```

Run the API:

```bash
uvicorn main:app --reload --port 8000
```

- Root: `http://localhost:8000/`
- Health check: `http://localhost:8000/health`
- Interactive docs: `http://localhost:8000/docs`

### Backend routes

| Method | Path             | Description                              |
|--------|------------------|-------------------------------------------|
| GET    | `/`              | API status message                        |
| GET    | `/health`        | Health check                              |
| POST   | `/register`      | Create a registration in Firestore        |
| GET    | `/registrations` | List registrations, optional `?uid=` filter |

---

## 5. GitHub

```bash
cd blast2026
git init
git add .
git commit -m "Initial commit: BLAST 2026 symposium website"
git branch -M main
git remote add origin https://github.com/<your-username>/blast-2026.git
git push -u origin main
```

`serviceAccountKey.json`, `.env`, `.env.local`, and `node_modules`/`venv` are
already excluded via `.gitignore` in both `frontend/` and `backend/` — never
commit real credentials.

---

## 6. Deploy the Backend to Render

1. Push this repo to GitHub (above).
2. In [Render](https://render.com/) → **New → Web Service** → connect the repo.
3. Render will detect `backend/render.yaml`, or configure manually:
   - **Root directory:** `backend`
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables in Render → Environment:
   - `FIREBASE_SERVICE_ACCOUNT_JSON` — paste the **entire contents** of your
     service account JSON file as a single-line string (this avoids uploading
     a file to Render).
   - `FIREBASE_PROJECT_ID` — your Firebase project ID.
   - `ALLOWED_ORIGINS` — your deployed Vercel URL, e.g.
     `https://blast-2026.vercel.app`.
5. Deploy. Note the resulting URL, e.g. `https://blast-2026-backend.onrender.com`.

---

## 7. Deploy the Frontend to Vercel

1. In [Vercel](https://vercel.com/) → **Add New → Project** → import the same GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Add environment variables (Project Settings → Environment Variables) —
   same keys as `frontend/.env.local`, plus:
   - `NEXT_PUBLIC_API_BASE_URL` = your Render backend URL from step 6
     (e.g. `https://blast-2026-backend.onrender.com`).
4. Deploy. Vercel auto-detects Next.js — no extra build configuration needed.
5. Add your Vercel domain to **Firebase Console → Authentication → Settings →
   Authorized domains**, or Google Sign-In will be blocked on the live site.
6. Update `ALLOWED_ORIGINS` on Render to match your final Vercel domain.

---

## 8. Environment Variables Reference

### `frontend/.env.local`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_API_BASE_URL` | Backend base URL (FastAPI) |

### `backend/.env`

| Variable | Description |
|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to local service account JSON (local dev) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full service account JSON as one line (used on Render) |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed frontend origins (CORS) |
| `PORT` | Port the API listens on (Render sets this automatically) |

---

## 9. Pages

- **Home (`/`)** — Hero with countdown, About, Events, Schedule, Prize Pool, FAQ, Contact, Footer.
- **Register (`/register`)** — Registration form (Name, Email, Phone, College, Department, Year, Event) that posts to `POST /register` and writes to Firestore.
- **Dashboard (`/dashboard`)** — Google-authenticated page showing user photo, name, email, registered event, registration date, and a logout button.

## 10. Design

Black / gold / white premium theme with glassmorphism cards, rounded corners,
and Framer Motion animations (fade, slide, hover, scale) throughout. Fully
responsive from mobile to desktop, with `prefers-reduced-motion` respected
and visible keyboard focus states.
