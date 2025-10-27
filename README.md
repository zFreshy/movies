# Flixo — Local Development Guide

A movie catalog app built with React (Vite) that integrates with TMDB for real data and provides a local Express API to persist user favorites in SQLite.

## Overview
- Frontend: React + Vite.
- Local API: Express under `/api` (proxied by Vite in dev).
- Favorites persistence: SQLite at `server/data/favorites.db`.
- Catalog data: TMDB trending, discover, and search (requires `VITE_TMDB_API_KEY`).

## Prerequisites
- Node.js 18+ and npm.
- A TMDB API Key (free). Create one on TMDB and use it in `.env.local`.

## Install
```bash
npm install
```

## Run Locally
1) Start the local API (port `3001`):
```bash
npm run server
```
You should see: `Favorites API listening on http://localhost:3001`.

2) In another terminal, start the frontend (Vite):
```bash
npm run dev
```
Open the URL printed by Vite (typically `http://localhost:5173` or similar). Vite proxies requests from `/api` to `http://localhost:3001` (see `vite.config.ts`).

### Environment Variables
Create `.env.local` in the project root:
```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
# Production/Vercel only (not needed for local dev):
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```
- `VITE_TMDB_API_KEY`: enables real TMDB queries. Without it, the catalog may be empty or fall back to static data on some screens.
- `BLOB_READ_WRITE_TOKEN`: required only in Vercel production when using Blob persistence. Not needed for local development.

## Local API Endpoints
All endpoints are served under `/api`:
- `GET /api/health` — health check.
- `GET /api/favorites` — list favorites.
- `POST /api/favorites` — add or update a favorite.
  - JSON body: `{ "movieId": string, "title": string, "posterUrl": string }`
- `DELETE /api/favorites/:movieId` — remove a favorite.

Examples:
```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/favorites
curl -X POST http://localhost:3001/api/favorites \
  -H "Content-Type: application/json" \
  -d '{"movieId":"123","title":"Example","posterUrl":"https://image.tmdb.org/t/p/w500/abc.jpg"}'
curl -X DELETE http://localhost:3001/api/favorites/123
```

## Data Flow
- The frontend loads trending (`fetchTrending`) and catalog (`fetchDiscover` or `searchMovies`) directly from TMDB.
- Favorites are loaded automatically when the app mounts and are displayed in “My List”.
- Local persistence: `server/data/favorites.db` (SQLite with WAL). The file is created automatically.

## Scripts
- `npm run dev` — start the React app.
- `npm run server` — start the local Express API.
- `npm run build` — production build.
- `npm run preview` — preview the production build.
- `npm run lint` — run ESLint.
- `npm run check` — type-check with TypeScript.

## Troubleshooting
- Catalog shows random images or is empty: ensure `VITE_TMDB_API_KEY` is set correctly in `.env.local`.
- Frontend cannot reach the API: confirm `npm run server` is running on `http://localhost:3001`. Vite proxies `/api` in dev.
- Favorites not persisting: verify write permissions and that `server/data/favorites.db` is being created.

## Deploy Notes
- The main branch uses the local API under `server/`. If deploying to Vercel/serverless, use the functions in `api/` and configure `BLOB_READ_WRITE_TOKEN` for Blob persistence in production.
