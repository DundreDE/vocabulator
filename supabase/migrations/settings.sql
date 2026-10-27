create table settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  max_new_cards_per_session integer not null default 10
    check (max_new_cards_per_session between 1 and 100)


);

alter table settings enable row level security;

create policy "users control their own settings"
  on settings
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
