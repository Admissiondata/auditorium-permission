-- Allow a fifth real approver (e.g. Maintenance Officer as the final auditorium step).
-- Run in the Supabase SQL editor. Safe to run more than once.
alter table public.requests drop constraint if exists requests_status_check;
alter table public.requests add constraint requests_status_check check (status in ('pending', 'first_approved', 'second_approved', 'third_approved', 'fourth_approved', 'approved', 'rejected'));