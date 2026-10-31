create table public.review_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id uuid not null references public.cards (id) on delete set null,
  rating smallint not null,
  created_at timestamptz not null default now()

);

create index review_logs_user_created_idx
    on public.review_logs (user_id, created_at desc);

alter table public.review_logs enable row level security;

create policy "Own review logs"
    on public.review_logs for all to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);

create or replace function public.daily_review_counts(days int default 90)
returns table (day date, count int)
language sql
security invoker
stable
as $$
  select (created_at at time zone 'Europe/Berlin')::date as day,
          count(*)::int as count
  from public.review_logs
  where user_id = auth.uid()
    and created_at >= now() - make_interval(days => days)
  group by 1
  order by 1;
$$;
