-- Fixes: 42P17 infinite recursion detected in policy for relation "user_profiles"
-- Run once in Supabase Dashboard -> SQL Editor.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

alter table public.user_profiles enable row level security;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'user_profiles'
  loop
    execute format(
      'drop policy if exists %I on public.user_profiles',
      policy_record.policyname
    );
  end loop;
end
$$;

create policy "Users can read their own profile"
on public.user_profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

create policy "Admins can manage profiles"
on public.user_profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

alter table public.products enable row level security;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
  loop
    execute format(
      'drop policy if exists %I on public.products',
      policy_record.policyname
    );
  end loop;
end
$$;

create policy "Published products are public"
on public.products
for select
to anon, authenticated
using (is_published = true or public.is_admin());

create policy "Admins can manage products"
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());