# Flixo — React Frontend + Serverless Backend (deployed branch)

This README explains how to use this branch of Flixo with a deployed serverless backend (e.g., Vercel Functions). The frontend is React + Vite and consumes serverless endpoints to manage the Favorites list.

## Overview
- Frontend: `React` + `TypeScript` + `Vite` under `src/`.
- Serverless backend: handlers in `api/` (Vercel Functions) for Favorites and Health routes.
- Favorites storage: configurable via `Vercel Blob` or `Vercel KV`. Without these, on Vercel the app falls back to SQLite in `/tmp` (ephemeral).

## Prerequisites
- Node.js >= 18
- Vercel account (to use the serverless backend and environment variables)

## Environment Variables
Create a `.env.local` at the project root (or set them in your Vercel project):

- `VITE_API_BASE_URL` — base URL for the backend. Use `'/api'` when frontend and backend share the same domain. For a remote deployed backend, use something like `https://your-project.vercel.app/api`.
- `VITE_TMDB_API_KEY` — optional; a TMDB API key to enrich movie details. Without it, the app still works, with limitations and fallbacks.
- Storage (choose one):
  - `BLOB_READ_WRITE_TOKEN` — token with read/write permissions for `@vercel/blob`.
  - Or `KV_REST_API_URL` and `KV_REST_API_TOKEN` — credentials for `@vercel/kv`.

Example `.env.local` when consuming a deployed serverless backend:

```
VITE_API_BASE_URL=https://your-project.vercel.app/api
VITE_TMDB_API_KEY=your_tmdb_key
# One storage option (Blob OR KV)
BLOB_READ_WRITE_TOKEN=your_blob_token
# KV_REST_API_URL=https://api.kv.vercel-storage.com
# KV_REST_API_TOKEN=your_kv_token
```

> Note: On Vercel, set variables in the project settings. For Blob/KV, create the resource and copy the token/URL as per Vercel docs.

## Run Locally (using the deployed backend)
1. Install dependencies:
   - `npm install`
2. Configure `.env.local` with `VITE_API_BASE_URL` pointing to the deployed backend.
3. Run the frontend:
   - `npm run dev`
4. Open the app at the URL printed by Vite (e.g., `http://localhost:5173`).

## Serverless Endpoints
Base: `VITE_API_BASE_URL` (defaults to `'/api'`)

- `GET /favorites?userId=<id>`
  - Headers: `X-User-Id: <id>`
  - Returns the user's favorites list.

- `POST /favorites-add?userId=<id>`
  - Headers: `Content-Type: application/json`, `X-User-Id: <id>`
  - JSON body: `{ "movieId": string, "title": string, "posterUrl": string }`
  - Adds/updates a favorite.

- `DELETE /favorites-remove?movieId=<id>&userId=<id>`
  - Headers: `X-User-Id: <id>`
  - Removes a favorite.

- `GET /health`
  - Returns `{ ok: true }`.

> CORS: handlers allow dynamic origins with the required headers. In production, you may want to restrict allowed origins (tweak `allowCors` in `api/*`).

## `userId` Generation
The frontend auto-generates and stores `flixo_user_id` in `localStorage`. This value is sent on each request via the `X-User-Id` header.

## Deploy to Vercel (summary)
1. Import the repo to Vercel.
2. Configure environment variables (`VITE_API_BASE_URL`, `VITE_TMDB_API_KEY`, and Blob/KV according to your choice).
3. Deploy. Vercel automatically detects `api/` as Functions.
4. Use the public project URL (e.g., `https://your-project.vercel.app`) in `VITE_API_BASE_URL` for the frontend (if served from a different domain).

## Scripts
- `npm run dev` — development mode.
- `npm run build` — production build.
- `npm run preview` — preview the production build locally.

## Troubleshooting
- Favorites do not persist on serverless: ensure `BLOB_READ_WRITE_TOKEN` or `KV_REST_API_*` are set. Without storage config, persistence may be ephemeral on Vercel (`/tmp`).
- CORS errors: validate `VITE_API_BASE_URL` and, if needed, restrict/adjust `allowCors`.
- Some catalog images fail in preview: certain links (e.g., `picsum.photos`) can return `ERR_ABORTED` locally; this does not break the app.

---
This branch is ready to consume a deployed serverless backend. Set environment variables and run the scripts above to work on the frontend.
