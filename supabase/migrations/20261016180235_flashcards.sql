create table public.decks (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
    name        text not null,
    created_at  timestamp with time zone default timezone('utc'::text, now())
);

create table public.cards (
  id          uuid primary key default gen_random_uuid(),
  deck_id     uuid not null references public.decks (id) on delete cascade,
  front       text not null,
  back        text not null,
  learned     boolean not null default false,
  next_review timestamptz,
  interval    integer not null default 0,
  created_at  timestamptz not null default now()
);

create index cards_deck_id_index on public.cards (deck_id);

alter table public.cards enable row level security;
alter table public.decks enable row level security;

create policy "Own decks"
    on public.decks for all to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);

create policy "Cards of own decks"
    on public.cards for all to authenticated
    using (exists (select 1 from public.decks d
    where d.id = cards.deck_id and d.user_id = auth.uid()))
  with check (exists (
    select 1 from public.decks d
    where d.id = cards.deck_id and d.user_id = (select auth.uid())
  ));
  