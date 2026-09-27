-- Admin content and customer address tables.
-- Run in Supabase SQL Editor before using the admin app.

create table if not exists public.homepage_banners (
  id uuid primary key default gen_random_uuid(),
  pre_title text not null default '',
  headline text not null,
  subheadline text not null default '',
  cta text not null default 'SHOP NOW',
  image_url text not null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.homepage_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null default '',
  image_url text not null,
  page text not null check (page in ('shirts', 'pants', 'new-releases')),
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'Home',
  first_name text not null,
  last_name text not null,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  country text not null default 'Pakistan',
  phone text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.store_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.product_images add column if not exists cloudinary_public_id text;
alter table public.product_images add column if not exists url text;
alter table public.product_images add column if not exists alt_text text;
alter table public.product_images add column if not exists is_primary boolean default false;
alter table public.product_images add column if not exists display_order integer default 0;

alter table public.homepage_banners enable row level security;
alter table public.homepage_categories enable row level security;
alter table public.addresses enable row level security;
alter table public.store_settings enable row level security;

drop policy if exists "Active banners are public" on public.homepage_banners;
drop policy if exists "Admins manage banners" on public.homepage_banners;
drop policy if exists "Active categories are public" on public.homepage_categories;
drop policy if exists "Admins manage categories" on public.homepage_categories;
drop policy if exists "Users manage their addresses" on public.addresses;
drop policy if exists "Store settings are public" on public.store_settings;
drop policy if exists "Admins manage store settings" on public.store_settings;

create policy "Active banners are public"
  on public.homepage_banners for select to anon, authenticated
  using (is_active = true or public.is_admin());

create policy "Admins manage banners"
  on public.homepage_banners for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "Active categories are public"
  on public.homepage_categories for select to anon, authenticated
  using (is_active = true or public.is_admin());

create policy "Admins manage categories"
  on public.homepage_categories for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "Users manage their addresses"
  on public.addresses for all to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

create policy "Store settings are public"
  on public.store_settings for select to anon, authenticated using (true);

create policy "Admins manage store settings"
  on public.store_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());