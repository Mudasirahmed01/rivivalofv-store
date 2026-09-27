-- Fixes: Supabase "Database error saving new user" during signup.
-- Run in Supabase SQL Editor.
--
-- The existing auth trigger is failing while inserting user_profiles.
-- Customer signup only needs Supabase Auth, so remove custom auth.users
-- triggers for now. This prevents profile-table schema/RLS issues from
-- blocking account creation. Admin can use auth.users separately.

do $$
declare
  trigger_record record;
begin
  for trigger_record in
    select tgname
    from pg_trigger
    where tgrelid = 'auth.users'::regclass
      and not tgisinternal
  loop
    execute format(
      'drop trigger if exists %I on auth.users',
      trigger_record.tgname
    );
  end loop;
end
$$;