create table card_progress (
    user_id uuid not null references auth.users(id) on delete cascade,
    card_id uuid not null references cards(id) on delete cascade,
    ease real not null default 2.5,
    interval_days integer not null default 0,
    repetition integer not null default 0,
    due_on date not null default current_date,
    last_reviewed_at timestamptz,
    primary key (user_id, card_id)
);

alter table card_progress enable row level security;

create policy "users manage their own progress"
  on card_progress
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create index card_progress_due_idx on card_progress (user_id, due_on);
