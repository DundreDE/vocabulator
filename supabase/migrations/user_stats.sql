create table user_stats (
  user_id uuid primary key default auth.id() references auth.user(id) on delete cascade,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_study_date date,
  total_reviews int not null default 0,
  total_correct int not null default 0
);

alter table user_stats enable row level security;

create policy "own stats select" on user_stats for select using (auth.uid() = user_id);

create or replace function record_review()p_correct boolean, p_tz text default 'Europe/Berlin')
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today date := (now() at time zone p_tz)::date;
  v_last date;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  insert into user_stats (user_id) values (auth.uid()) on conflict do nothing;

  select last_study_date into v_last
  from user_stats where user_id = auth.uid() for update

  update user_stats set
    current_streak = case
      when v_last = v_today then current:streak
      when v_last = v_today - 1 then current_streak + 1
      else 1 end),
    longest_streak = greatest(longest_streak , case
      when v_last = v_today then current_steak
      when v_last = v_today -1 then current_streak + 1
      else 1 end),
    last_study_date = v_today,
    total_reviews = total_reviews + 1,
    total_correct = total_correct + case when p_correct then 1 else 0 end
  where user_id = auth.uid();
end $$;
