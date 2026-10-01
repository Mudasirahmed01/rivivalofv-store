-- Allow admins to create and edit product images and variants.
-- Public users can read media and variants belonging to published products.
-- Run in Supabase Dashboard -> SQL Editor.

alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;

drop policy if exists "Public can view images for published products" on public.product_images;
drop policy if exists "Admins can manage product images" on public.product_images;
drop policy if exists "Public can view variants for published products" on public.product_variants;
drop policy if exists "Admins can manage product variants" on public.product_variants;

create policy "Public can view images for published products"
  on public.product_images for select to anon, authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.products
      where products.id = product_images.product_id
        and products.is_published = true
    )
  );

create policy "Admins can manage product images"
  on public.product_images for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can view variants for published products"
  on public.product_variants for select to anon, authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.products
      where products.id = product_variants.product_id
        and products.is_published = true
    )
  );

create policy "Admins can manage product variants"
  on public.product_variants for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

notify pgrst, 'reload schema';