-- Allow custom product categories such as perfume, accessories, or footwear.
-- Run in Supabase SQL Editor before adding products with new category names.

do $$
declare
  constraint_record record;
begin
  for constraint_record in
    select conname
    from pg_constraint
    where conrelid = 'public.products'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%category%'
  loop
    execute format('alter table public.products drop constraint %I', constraint_record.conname);
  end loop;
end
$$;

alter table public.products alter column category drop default;
alter table public.products alter column category type text using category::text;
alter table public.products alter column category set default 'tops';

notify pgrst, 'reload schema';