create table jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  status text not null default 'pending',
  image_path text,
  result jsonb,
  error text,
  created_at timestamptz default now()
);

create index jobs_user_id_idx on jobs (user_id, created_at desc);

create table rate_limits (
  key text,
  window_start timestamptz,
  count int not null default 0,
  primary key (key, window_start)

);

create function hit_rate_limit(p_key text, p_limit int, p_window int)
returns boolean
language plpgsql
set search_path = public
as $$
declare
  w timestamptz := to_timestamp(floor(extract(epoch from now()) / p_window) * p_window);
  c int;
begin
  insert into rate_limits (key, window_start, count) values (p_key, w, 1)
  on conflict (key, window_start) do update set count = rate_limits.count + 1
  returning count into c;
  return c <= p_limit;
end $$;

alter table jobs enable row level security;
alter table rate_limits enable row level security;

create policy "jobs_select_own"
on jobs for select
to authenticated
using ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false)
on conflict (id) do nothing;

revoke execute on function hit_rate_limit(text, int, int) from public, anon, authenticated;
grant execute on function hit_rate_limit(text, int, int) to service_role;
