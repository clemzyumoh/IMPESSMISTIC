# Impessmistic

Lead-generation site for a "we buy your property" business. Sellers submit
their property through a form (with photo upload); the owner reviews and
manages leads through a password-protected admin dashboard.

Stack: Next.js (App Router) + Tailwind CSS v4, Supabase (database + photo
storage), Resend (email notifications).

## 1. Install

```bash
npm install
```

## 2. Set up Supabase

1. Create a project at supabase.com.
2. Open the SQL editor and run everything in `supabase/schema.sql`. This
   creates the `leads` table, its row-level-security policy, and the
   `property-photos` storage bucket.
3. Get your keys from Project Settings > API:
   - Project URL
   - `anon` public key
   - `service_role` key (keep this secret — server only)

## 3. Set up Resend

1. Create an account at resend.com and verify a sending domain (or use
   their test domain while developing).
2. Create an API key.

## 4. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` — from Supabase.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LEAD_NOTIFICATION_EMAIL` — from
  Resend. `LEAD_NOTIFICATION_EMAIL` is where new-lead alerts are sent
  (your boss's email).
- `ADMIN_PASSWORD` — the password to log into `/admin`.
- `ADMIN_SESSION_SECRET` — any long random string (used to sign the admin
  session cookie).

## 5. Run locally

```bash
npm run dev
```

- Public site: http://localhost:3000
- Sell form: http://localhost:3000/sell
- Admin login: http://localhost:3000/admin (password = `ADMIN_PASSWORD`)

## 6. Deploy

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add all the same environment variables from `.env.local` in the Vercel
   project settings (Production + Preview).
4. Deploy. Point your domain at the Vercel project.

## What still needs real content

Search the codebase for `[ADD ...]` and `[PLACEHOLDER ...]` — these are in:

- `components/Footer.tsx` — phone/email
- `app/contact/page.tsx` — phone/email
- `app/about/page.tsx` — bio, stats, story
- `app/page.tsx` — testimonials and stats are placeholder numbers, swap in
  real ones
- Logo — none yet, wordmark text is used as the logo everywhere

## Project structure

- `app/` — pages and API routes (App Router)
- `app/api/leads` — public endpoint the sell form submits to
- `app/api/admin/*` — protected endpoints for the dashboard (login, list
  leads, update a lead, CSV export)
- `components/` — `SellForm.tsx` (the big form) and `LeadsDashboard.tsx`
  (the admin table + detail panel)
- `lib/supabase.ts` — browser + server Supabase clients
- `lib/auth.ts` — admin session cookie logic
- `middleware.ts` — protects `/admin/dashboard` and the admin API routes
- `supabase/schema.sql` — run once in the Supabase SQL editor
