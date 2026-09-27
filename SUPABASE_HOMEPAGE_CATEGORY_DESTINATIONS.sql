-- Allow homepage category cards to target custom product categories.
-- Run in Supabase SQL Editor before saving a custom category destination.

do $$
declare
  constraint_record record;
begin
  for constraint_record in
    select conname
    from pg_constraint
    where conrelid = 'public.homepage_categories'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%page%'
  loop
    execute format('alter table public.homepage_categories drop constraint %I', constraint_record.conname);
  end loop;
end
$$;

notify pgrst, 'reload schema';