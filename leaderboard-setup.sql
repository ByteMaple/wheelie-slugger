-- Wheelie Slugger: global money and longest-wheelie leaderboards
-- Run this entire file once in the Supabase SQL Editor.

alter table public.player_profiles
  add column if not exists money bigint not null default 0,
  add column if not exists longest_wheelie numeric(10, 2) not null default 0;

create or replace function public.submit_player_stats(
  requested_player_id uuid,
  requested_player_token uuid,
  requested_money bigint,
  requested_longest_wheelie numeric
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.player_profiles
  set
    money = greatest(0, requested_money),
    longest_wheelie = greatest(longest_wheelie, requested_longest_wheelie)
  where id = requested_player_id
    and player_token = requested_player_token;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'invalid_player');
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

create or replace function public.get_leaderboards()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  money_board jsonb;
  wheelie_board jsonb;
  player_count bigint;
begin
  select count(*) into player_count from public.player_profiles;

  select coalesce(jsonb_agg(row_data), '[]'::jsonb)
  into money_board
  from (
    select jsonb_build_object(
      'username', username,
      'value', money
    ) as row_data
    from public.player_profiles
    order by money desc, created_at asc
    limit 20
  ) ranked_money;

  select coalesce(jsonb_agg(row_data), '[]'::jsonb)
  into wheelie_board
  from (
    select jsonb_build_object(
      'username', username,
      'value', longest_wheelie
    ) as row_data
    from public.player_profiles
    order by longest_wheelie desc, created_at asc
    limit 20
  ) ranked_wheelies;

  return jsonb_build_object(
    'playerCount', player_count,
    'money', money_board,
    'wheelies', wheelie_board
  );
end;
$$;

revoke all on function public.submit_player_stats(uuid, uuid, bigint, numeric) from public;
revoke all on function public.get_leaderboards() from public;
grant execute on function public.submit_player_stats(uuid, uuid, bigint, numeric) to anon, authenticated;
grant execute on function public.get_leaderboards() to anon, authenticated;
