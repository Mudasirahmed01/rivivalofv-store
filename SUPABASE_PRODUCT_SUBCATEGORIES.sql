-- Add optional product subcategories such as Women, Men, and Unisex.
-- Safe to rerun; existing products keep an empty subcategory.

alter table public.products
  add column if not exists subcategory text not null default '';

notify pgrst, 'reload schema';