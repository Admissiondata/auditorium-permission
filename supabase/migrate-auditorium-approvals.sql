alter table public.auditoriums
  add column if not exists approval_1_role text not null default 'head',
  add column if not exists approval_2_role text not null default 'electrician',
  add column if not exists approval_3_role text not null default 'principal';
alter table public.auditoriums add column if not exists is_locked boolean not null default false;

alter table public.requests add column if not exists requester_id text not null default 'public';
alter table public.requests add column if not exists end_date date not null default current_date;
alter table public.requests add column if not exists duration text not null default '1 day';
alter table public.requests drop constraint if exists requests_duration_check;
alter table public.requests add constraint requests_duration_check check (duration in ('1 day', '2 days', 'multiple days'));
alter table public.requests drop constraint if exists requests_status_check;
alter table public.requests add constraint requests_status_check check (status in ('pending', 'first_approved', 'second_approved', 'approved', 'rejected'));

notify pgrst, 'reload schema';
