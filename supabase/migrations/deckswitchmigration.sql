begin;


alter table public.card_progress
add column direction text not null default 'front-back' check (direction in ('front-back', 'back-front'));
do $$
declare
  pk_name text;
begin
  select conname into pk_name
  from pg_constraint
  where conrelid = 'public.card_progress'::regclass and contype = 'p';

  if pk_name is not null then
    execute format('alter table public.card_progress drop constraint %I', pk_name);
  end if;
end $$;

alter table public.card_progress
add primary key (user_id, card_id, direction);

commit;
