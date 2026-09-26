# REVIVAL OF V Admin Dashboard

This is a separate, responsive web app for store administration. It reuses the repository's Supabase/Cloudinary service layer and admin components while remaining outside the customer storefront entrypoint.

## Local run

From this folder:

```cmd
npm install
copy .env.example .env
npm run dev
```

Set the four public client variables in `.env`. The Supabase account must have `app_metadata.role` set to `admin`, and the Supabase schema/RLS SQL files in the repository root must already have been run.

## Vercel deployment

Create a **separate Vercel project** from the same GitHub repository. Set its **Root Directory** to `admin-dashboard`. Vercel detects Vite; use build command `npm run build` and output directory `dist`.

Add these Environment Variables in the Vercel project:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

Do not add Supabase service-role, Cloudinary API secret, or Resend secret to Vercel frontend variables.

The admin and customer sites can have separate Vercel URLs and later receive separate domains. Both use the same Supabase project and Cloudinary cloud.
