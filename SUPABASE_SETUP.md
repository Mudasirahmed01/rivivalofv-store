# Supabase Setup Order

Run these files in Supabase Dashboard -> SQL Editor in this order:

1. `SUPABASE_RLS_FIX.sql`
2. `SUPABASE_AUTH_PROFILE_FIX.sql`
3. `SUPABASE_ADMIN_SCHEMA.sql`
4. `SUPABASE_PRODUCT_MEDIA_SEED.sql`

After each query, confirm Supabase shows a successful result.

## Email notifications

Install/login to the Supabase CLI, then from this project folder run:

```bash
supabase functions deploy order-confirmation
supabase secrets set RESEND_API_KEY=re_xxx ORDER_EMAIL_FROM="REVIVAL OF V <orders@your-domain.com>"
```

Verify the sending domain in Resend before using a custom `ORDER_EMAIL_FROM` address.

## Secure Cloudinary deletion

The frontend never receives the Cloudinary API secret. Deploy the deletion function:

```bash
supabase functions deploy delete-cloudinary-asset
supabase secrets set CLOUDINARY_CLOUD_NAME=your_cloud_name CLOUDINARY_API_KEY=your_api_key CLOUDINARY_API_SECRET=your_api_secret
```

The `CLOUDINARY_API_SECRET` must only be a Supabase secret. Never add it to Vite `.env`, Vercel public environment variables, or browser code.

Image replacement deletes the old Cloudinary asset only when its `cloudinary_public_id` was stored. The seed images use external Unsplash URLs, so they are not Cloudinary assets and will not be deleted.

## Vercel variables

Only public frontend variables belong in Vercel:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_CLOUDINARY_CLOUD_NAME=...
VITE_CLOUDINARY_UPLOAD_PRESET=...
```

Do not add `RESEND_API_KEY`, `CLOUDINARY_API_KEY`, or `CLOUDINARY_API_SECRET` to Vercel frontend variables.
