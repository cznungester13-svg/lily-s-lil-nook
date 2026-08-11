# lily-s-lil-nook

This project includes a storefront plus a secure admin backend.

- Open `index.html` for the landing page.
- Open `lilys-lil-nook.html` for the shop experience.
- Open `admin.html` for the admin dashboard.
- The admin dashboard now uses a backend login API and server-side Supabase access.

## Local setup

1. Copy `.env.example` to `.env`.
2. Install dependencies:
   - `npm install`
3. Start the app:
   - `npm start`
4. Open `http://localhost:3000`.

## Environment variables

Set these values in `.env`:

- `SUPABASE_URL` — your Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (server-only).
- `ADMIN_PASSWORD_HASH` — SHA-256 hash of the admin password.
- `ADMIN_JWT_SECRET` — a strong secret for admin session tokens.

The default `ADMIN_PASSWORD_HASH` in `.env.example` matches `lily-admin-2026`.

## Deploying to production

This repository should be deployed as a Node app, not GitHub Pages, because admin actions require backend APIs.

### Vercel

- Set build command: `npm install`
- Set start command: `npm start`
- Add the environment variables in the Vercel dashboard.

### Other hosts

Use any Node-capable host that supports environment variables, such as Render, Fly, Railway, or Heroku.

## Security notes

- Do not commit `.env` to source control.
- Keep `SUPABASE_SERVICE_ROLE_KEY` private.
- Keep `ADMIN_JWT_SECRET` private.
- If you want a new admin password, generate its SHA-256 hash and place it in `ADMIN_PASSWORD_HASH`.