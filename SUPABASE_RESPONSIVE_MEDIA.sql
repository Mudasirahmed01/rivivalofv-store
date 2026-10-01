-- Add optional mobile artwork for product images and homepage category tiles.
-- Hero banners use mobile_image_url from SUPABASE_HERO_MOBILE_IMAGE.sql.

alter table public.product_images
  add column if not exists mobile_url text not null default '';

alter table public.homepage_categories
  add column if not exists mobile_image_url text not null default '';

notify pgrst, 'reload schema';