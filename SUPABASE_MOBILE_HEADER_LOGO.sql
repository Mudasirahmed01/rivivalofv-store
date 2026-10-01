-- Ensure the mobile header logo setting exists for the admin dashboard.
-- store_settings is a JSON key/value table, so no new column is required.

insert into public.store_settings (key, value)
values ('mobile_header_logo', '{"url": ""}'::jsonb)
on conflict (key) do nothing;

notify pgrst, 'reload schema';