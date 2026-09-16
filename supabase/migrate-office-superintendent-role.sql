-- Add office_superintendent role for auditorium-wise department heads approval
-- This role allows an Office Superintendent to be assigned per-auditorium for direct approval

-- 1. Add office_superintendent to auditorium approval role check constraints
alter table public.auditoriums
  drop constraint if exists auditoriums_approval_1_role_check,
  drop constraint if exists auditoriums_approval_2_role_check,
  drop constraint if exists auditoriums_approval_3_role_check,
  drop constraint if exists auditoriums_approval_4_role_check;

alter table public.auditoriums
  add constraint auditoriums_approval_1_role_check
    check (approval_1_role in ('none', 'head', 'electrician', 'principal', 'maintenance', 'admin_officer', 'office_superintendent', 'chairman', 'higher_authority', 'purchase_officer', 'work_done', 'department_user', 'sub_admin', 'admin')),
  add constraint auditoriums_approval_2_role_check
    check (approval_2_role in ('none', 'head', 'electrician', 'principal', 'maintenance', 'admin_officer', 'office_superintendent', 'chairman', 'higher_authority', 'purchase_officer', 'work_done', 'department_user', 'sub_admin', 'admin')),
  add constraint auditoriums_approval_3_role_check
    check (approval_3_role in ('none', 'head', 'electrician', 'principal', 'maintenance', 'admin_officer', 'office_superintendent', 'chairman', 'higher_authority', 'purchase_officer', 'work_done', 'department_user', 'sub_admin', 'admin')),
  add constraint auditoriums_approval_4_role_check
    check (approval_4_role ~ '^(none|head|electrician|principal|maintenance|admin_officer|office_superintendent|chairman|higher_authority|purchase_officer|work_done|department_user|sub_admin|admin)(\|(head|electrician|principal|maintenance|admin_officer|office_superintendent|chairman|higher_authority|purchase_officer|work_done|department_user|sub_admin|admin))*$');

-- 2. Add office_superintendent_user_id column to auditoriums table
alter table public.auditoriums
  add column if not exists office_superintendent_user_id text;

-- 3. Add office_superintendent to user_accounts role check constraint
alter table public.user_accounts drop constraint if exists user_accounts_role_check;
alter table public.user_accounts add constraint user_accounts_role_check check (role in ('admin', 'sub_admin', 'admin_officer', 'purchase_officer', 'purchase_clerk', 'chairman', 'department_user', 'head', 'maintenance', 'electrician', 'principal', 'office_superintendent', 'higher_authority', 'work_done'));

-- Notify PostgREST to reload schema
notify pgrst, 'reload schema';
