-- Enable admin-managed product categories and homepage placements.
-- Safe to rerun: preserves admin-created options and only adds missing defaults.

do $$
declare
  constraint_record record;
begin
  for constraint_record in
    select conname
    from pg_constraint
    where conrelid = 'public.products'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%homepage_slot%'
  loop
    execute format('alter table public.products drop constraint %I', constraint_record.conname);
  end loop;
end
$$;

alter table public.products alter column homepage_slot drop default;
alter table public.products alter column homepage_slot type text using homepage_slot::text;
alter table public.products alter column homepage_slot set default 'none';

insert into public.store_settings (key, value)
values (
  'catalog_options',
  '{
    "categories": [
      {"key": "tops", "label": "Shirts", "requiresSize": true, "active": true},
      {"key": "bottoms", "label": "Pants", "requiresSize": true, "active": true}
    ],
    "placements": [
      {"key": "none", "label": "No homepage placement", "active": true},
      {"key": "new_release", "label": "Latest Drops", "active": true},
      {"key": "best_seller", "label": "Best Sellers", "active": true},
      {"key": "hero", "label": "Featured Products", "active": true}
    ]
  }'::jsonb
)
on conflict (key) do nothing;

update public.store_settings as settings
set value = jsonb_set(
  jsonb_set(
    settings.value,
    '{categories}',
    coalesce(settings.value->'categories', '[]'::jsonb) || coalesce((
      select jsonb_agg(seed.value)
      from jsonb_array_elements('[
        {"key":"tops","label":"Shirts","requiresSize":true,"active":true},
        {"key":"bottoms","label":"Pants","requiresSize":true,"active":true}
      ]'::jsonb) as seed(value)
      where not exists (
        select 1
        from jsonb_array_elements(coalesce(settings.value->'categories', '[]'::jsonb)) as existing(value)
        where existing.value->>'key' = seed.value->>'key'
      )
    ), '[]'::jsonb)
  ),
  '{placements}',
  coalesce(settings.value->'placements', '[]'::jsonb) || coalesce((
    select jsonb_agg(seed.value)
    from jsonb_array_elements('[
      {"key":"none","label":"No homepage placement","active":true},
      {"key":"new_release","label":"Latest Drops","active":true},
      {"key":"best_seller","label":"Best Sellers","active":true},
      {"key":"hero","label":"Featured Products","active":true}
    ]'::jsonb) as seed(value)
    where not exists (
      select 1
      from jsonb_array_elements(coalesce(settings.value->'placements', '[]'::jsonb)) as existing(value)
      where existing.value->>'key' = seed.value->>'key'
    )
  ), '[]'::jsonb)
)
where settings.key = 'catalog_options';

notify pgrst, 'reload schema';