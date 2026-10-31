alter table public.decks
  add column if not exists is_shared boolean not null default false,
  add column if not exists share_token uuid not null default gen_random_uuid(),
  add column if not exists cloned_from uuid references public.decks (id) on delete set null;

create unique index if not exists decks_share_token_idx on public.decks (share_token);

create or replace function public.get_shared_deck(p_token uuid)
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'name', d.name,
    'cards', coalesce((select json_agg(
      json_build_object('front', c.front, 'back', c.back)
    )
    from public.cards c
    where c.deck_id = d.id
    ), '[]'::json)
  )
  from public.decks d
  where d.share_token = p_token
    and d.is_shared;
$$;

create or replace function public.clone_shared_deck(p_token uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  src public.decks%rowtype;
  new_id uuid;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  select * into src
  from public.decks
  where share_token = p_token
    and is_shared;

  if not found then
    raise exception 'deck not found';
  end if;

  insert into public.decks (user_id, name, cloned_from)
  values (auth.uid(), src.name, src.id)
  returning id into new_id;

  insert into public.cards (deck_id, front, back)
  select new_id, c.front, c.back
  from public.cards c
  where c.deck_id = src.id;

  return new_id;
end;
$$;

revoke all on function public.get_shared_deck(uuid) from public;
revoke all on function public.clone_shared_deck(uuid) from public;

grant execute on function public.get_shared_deck(uuid) to anon, authenticated;
grant execute on function public.clone_shared_deck(uuid) to authenticated;
