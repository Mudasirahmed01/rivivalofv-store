-- Add an optional mobile-specific image to homepage hero banners.
-- Existing banners keep using image_url on all screen sizes until updated.

alter table public.homepage_banners
  add column if not exists mobile_image_url text not null default '';

notify pgrst, 'reload schema';