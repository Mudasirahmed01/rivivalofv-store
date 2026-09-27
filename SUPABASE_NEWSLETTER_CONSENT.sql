-- Store explicit footer newsletter consent separately from customer accounts.
-- Run in Supabase SQL Editor before deploying the footer signup.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  consent boolean not null check (consent = true),
  consent_text text not null,
  source text not null default 'footer',
  consented_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Footer visitors can submit marketing consent" on public.newsletter_subscribers;
drop policy if exists "Admins can read newsletter subscribers" on public.newsletter_subscribers;
drop policy if exists "Admins can update newsletter subscribers" on public.newsletter_subscribers;

create policy "Footer visitors can submit marketing consent"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (consent = true and source = 'footer');

create policy "Admins can read newsletter subscribers"
  on public.newsletter_subscribers
  for select
  to authenticated
  using (public.is_admin());

create policy "Admins can update newsletter subscribers"
  on public.newsletter_subscribers
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant insert on public.newsletter_subscribers to anon, authenticated;
grant select, update on public.newsletter_subscribers to authenticated;