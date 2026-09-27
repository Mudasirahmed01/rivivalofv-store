-- Seed media and variants for existing products.
-- Run after the base products table exists.
-- Safe to rerun: existing product media/variants are replaced by this seed.

-- Normalize older product_images schemas before inserting seed rows.
alter table public.product_images add column if not exists url text;
alter table public.product_images add column if not exists alt_text text;
alter table public.product_images add column if not exists is_primary boolean default false;
alter table public.product_images add column if not exists display_order integer default 0;
alter table public.product_images add column if not exists cloudinary_public_id text;

-- Preserve URLs from the older cloudinary_url column when it exists.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'product_images'
      and column_name = 'cloudinary_url'
  ) then
    update public.product_images
    set url = cloudinary_url
    where url is null and cloudinary_url is not null;
  end if;
end
$$;

do $$
declare
  product_record record;
begin
  for product_record in
    select id, slug, title from public.products
    where slug in ('ro5-heavyweight-hoodie', 'ro5-relaxed-fit-tee', 'ro5-technical-cargo')
  loop
    delete from public.product_images where product_id = product_record.id;
    delete from public.product_variants where product_id = product_record.id;

    if product_record.slug = 'ro5-heavyweight-hoodie' then
      insert into public.product_images (product_id, url, cloudinary_url, cloudinary_public_id, alt_text, is_primary, display_order) values
        (product_record.id, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&h=1200&fit=crop', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&h=1200&fit=crop', '', product_record.title || ' front', true, 0),
        (product_record.id, 'https://images.unsplash.com/photo-1578768079470-0f0d1c7e1a2e?w=900&h=1200&fit=crop', 'https://images.unsplash.com/photo-1578768079470-0f0d1c7e1a2e?w=900&h=1200&fit=crop', '', product_record.title || ' detail', false, 1);
      insert into public.product_variants (product_id, size, stock_count, sku) values
        (product_record.id, 'S', 50, 'HWD-S-001'), (product_record.id, 'M', 100, 'HWD-M-001'),
        (product_record.id, 'L', 80, 'HWD-L-001'), (product_record.id, 'XL', 30, 'HWD-XL-001');
    elsif product_record.slug = 'ro5-relaxed-fit-tee' then
      insert into public.product_images (product_id, url, cloudinary_url, cloudinary_public_id, alt_text, is_primary, display_order) values
        (product_record.id, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=1200&fit=crop', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=1200&fit=crop', '', product_record.title || ' front', true, 0),
        (product_record.id, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&h=1200&fit=crop', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&h=1200&fit=crop', '', product_record.title || ' detail', false, 1);
      insert into public.product_variants (product_id, size, stock_count, sku) values
        (product_record.id, 'S', 60, 'TEE-S-002'), (product_record.id, 'M', 120, 'TEE-M-002'),
        (product_record.id, 'L', 90, 'TEE-L-002'), (product_record.id, 'XL', 40, 'TEE-XL-002');
    elsif product_record.slug = 'ro5-technical-cargo' then
      insert into public.product_images (product_id, url, cloudinary_url, cloudinary_public_id, alt_text, is_primary, display_order) values
        (product_record.id, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&h=1200&fit=crop', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&h=1200&fit=crop', '', product_record.title || ' front', true, 0),
        (product_record.id, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&h=1200&fit=crop', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&h=1200&fit=crop', '', product_record.title || ' detail', false, 1);
      insert into public.product_variants (product_id, size, stock_count, sku) values
        (product_record.id, 'S', 30, 'CRG-S-003'), (product_record.id, 'M', 70, 'CRG-M-003'),
        (product_record.id, 'L', 55, 'CRG-L-003'), (product_record.id, 'XL', 25, 'CRG-XL-003');
    end if;
  end loop;
end
$$;

-- Optional initial homepage content. Existing rows are not duplicated.
insert into public.homepage_banners (pre_title, headline, subheadline, cta, image_url, display_order)
select 'REVIVAL OF V // COLLECTION 01', 'ENGINEERING WEARABLE PRECISION.', 'Crafted for the modern era. High-density fabrics, zero compromises.', 'EXPLORE COLLECTION', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop', 0
where not exists (select 1 from public.homepage_banners);

insert into public.homepage_categories (title, subtitle, image_url, page, display_order)
select * from (values
  ('SHIRTS', 'Premium Tees & Hoodies', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1200&fit=crop', 'shirts', 0),
  ('PANTS', 'Cargos, Denim & Joggers', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=600&fit=crop', 'pants', 1),
  ('NEW SEASON', 'Latest Drops - Limited Stock', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop', 'new-releases', 2)
) as seed(title, subtitle, image_url, page, display_order)
where not exists (select 1 from public.homepage_categories where homepage_categories.page = seed.page);

insert into public.store_settings (key, value) values
  ('checkout', '{"free_shipping_threshold":50000,"delivery_charge":250,"tax_rate":8}'::jsonb),
  ('marquee', '{"items":["NEW COLLECTION 01","FREE SHIPPING OVER RS 50,000","PREMIUM ORGANIC COTTON","ARCHITECTURAL SILHOUETTES","SUSTAINABLE FASHION"]}'::jsonb)
on conflict (key) do nothing;
