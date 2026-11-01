alter table public.review_logs
  alter column card_id drop not null,
  alter column user_id set default auth.uid(),
  drop column rating,
  add column direction text not null default 'front-back'
    check (direction in ('front-back', 'back-front')),
  add column correct boolean not null default true;

alter table public.review_logs
  alter column direction drop default,
  alter column correct drop default;

create index if not exists review_logs_card_idx
  on public.review_logs (card_id);

create or replace function public.record_review(
  p_card_id   uuid,
  p_direction text,
  p_correct   boolean
)
returns void
language sql
security invoker
as $$
  insert into public.review_logs (card_id, direction, correct)
  values (p_card_id, p_direction, p_correct);
$$;
