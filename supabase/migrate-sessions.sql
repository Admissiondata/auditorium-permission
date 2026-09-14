-- Serverless-compatible session store (express-session backed by Supabase).
-- Fixed logins on Vercel, where the local FileSessionStore cannot write to disk.
create table if not exists public.sessions (
  sid text primary key,
  session_data jsonb not null default '{}'::jsonb,
  expires bigint,
  created_at timestamptz not null default now()
);

create index if not exists sessions_expires_idx on public.sessions (expires);

alter table public.sessions enable row level security;
drop policy if exists "Allow all on sessions" on public.sessions;
create policy "Allow all on sessions" on public.sessions for all using (true) with check (true);