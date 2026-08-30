-- Add department email and designation fields to the departments table.
-- Run this once in the Supabase SQL editor for existing databases.

alter table public.departments add column if not exists email text;
alter table public.departments add column if not exists designation text;
