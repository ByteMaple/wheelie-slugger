-- Wheelie Slugger: globally unique username reservation
-- Run this entire file once in the Supabase SQL Editor.

create table if not exists public.player_profiles (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  username_key text generated always as (lower(username)) stored,
  player_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(),
  constraint player_username_length check (char_length(username) between 3 and 16),
  constraint player_username_format check (username ~ '^[A-Za-z0-9_]+$'),
  constraint player_username_unique unique (username_key)
);

alter table public.player_profiles enable row level security;

-- Browsers cannot read or write the player table directly.
revoke all on table public.player_profiles from anon, authenticated;

create or replace function public.reserve_username(requested_username text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  clean_name text := btrim(requested_username);
  new_player_id uuid;
  new_player_token uuid;
begin
  if char_length(clean_name) < 3 or char_length(clean_name) > 16 then
    return jsonb_build_object(
      'ok', false,
      'error', 'length',
      'message', 'Username must be between 3 and 16 characters.'
    );
  end if;

  if clean_name !~ '^[A-Za-z0-9_]+$' then
    return jsonb_build_object(
      'ok', false,
      'error', 'format',
      'message', 'Use only letters, numbers, and underscores.'
    );
  end if;

  insert into public.player_profiles (username)
  values (clean_name)
  returning id, player_token into new_player_id, new_player_token;

  return jsonb_build_object(
    'ok', true,
    'username', clean_name,
    'playerId', new_player_id,
    'playerToken', new_player_token
  );
exception
  when unique_violation then
    return jsonb_build_object(
      'ok', false,
      'error', 'taken',
      'message', 'That username is already taken.'
    );
end;
$$;

revoke all on function public.reserve_username(text) from public;
grant execute on function public.reserve_username(text) to anon, authenticated;
