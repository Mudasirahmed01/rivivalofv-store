-- Allow guest COD checkout without exposing order rows to anonymous visitors.
-- Run in Supabase SQL Editor after SUPABASE_RLS_FIX.sql.

alter table public.orders enable row level security;

drop policy if exists "Customers can create COD orders" on public.orders;
drop policy if exists "Customers and admins can read orders" on public.orders;
drop policy if exists "Admins manage orders" on public.orders;

create policy "Customers can create COD orders"
  on public.orders
  for insert
  to anon, authenticated
  with check (
    status = 'pending'
    and payment_method = 'cod'
    and (
      (auth.uid() is null and user_id is null)
      or user_id = auth.uid()
    )
  );

create policy "Customers and admins can read orders"
  on public.orders
  for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy "Admins manage orders"
  on public.orders
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());