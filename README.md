## Overview

**CineBai** is a full-stack **AI-powered movie and TV show streaming platform** built with **React, Node.js, Express, and MongoDB**. Powered by the **TMDB API** and **Gemini AI**, CineBai delivers an AI-powered, prompt-based discovery streaming experience for movie/TV lovers.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Live Demo](#live-demo)
- [Author](#author)

## Features

- 🤖 **Gemini AI Recommendations** — Prompt-based, mood-aware suggestions powered by Google's Gemini API
- 🔍 **Smart Search** — Real-time search across movies and TV shows
- 🎥 **Watch & Explore** — Detailed title pages with metadata and related content
- ❤️ **Favorites** — Save and manage favorite titles
- 🕒 **Watch Later** — Build a personal watchlist
- 🔐 **Secure Authentication** — JWT-based auth with Google Sign-In support
- 🔄 **Session Persistence** — Stay signed in across visits
- 📡 **Live TMDB Data** — Up-to-date movie and TV metadata sourced directly from TMDB

## Tech Stack

| Layer          | Technology                              |
|----------------|------------------------------------------|
| Frontend       | React, Tailwind CSS                      |
| Backend        | Node.js, Express.js                      |
| Database       | MongoDB                                  |
| External APIs  | [TMDB API],[Gemini API]                  |
| Authentication | JSON Web Tokens (JWT), Google OAuth      |
| Deployment     | Render                                   |
| CI             | GitHub Actions                           |

## Project Structure

```
CineBai/
├── .github/workflows/   # CI/CD pipelines
├── backend/             # Express API, MongoDB models, auth, AI/TMDB integrations
├── frontend/             # React client (Tailwind CSS)
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/)
- A [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- API keys for [TMDB](https://developer.themoviedb.org/docs/getting-started) and [Google Gemini](https://ai.google.dev/)
- Google OAuth credentials (for Google Sign-In)

### Installation

```bash
# Clone the repository
git clone https://github.com/AndreJarl/CineBai.git
cd CineBai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

> **Note:** Confirm the exact variable names expected by `backend/` against the source — the values above reflect the integrations described in this README (MongoDB, JWT, TMDB, Gemini, Google OAuth).

If the frontend requires its own environment file (e.g., an API base URL), add a `.env` in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Running Locally

```bash
# Start the backend (from /backend)
npm start

# In a separate terminal, start the frontend (from /frontend)
npm run dev
```

The frontend will typically be available at `http://localhost:5173` (or your configured port), with the API running at `http://localhost:5000`.

## Live Demo

A hosted version is available at **[cinebai.onrender.com](https://cinebai.onrender.com/)**.

> Deployed on Render's free tier. A scheduled [GitHub Actions workflow](.github/workflows/) pings the app every few minutes to keep the instance warm and avoid cold-start delays.

## Author

**Andre Jarl Aniana**

- 📍 Cebu, Philippines
- 📧 [andrejarlaniana@gmail.com](mailto:andrejarlaniana@gmail.com)
- 🔗 [GitHub](https://github.com/AndreJarl)

---

⭐ If you find CineBai useful, consider giving the repo a star — it helps others discover the project.
