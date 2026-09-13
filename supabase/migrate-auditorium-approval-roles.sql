-- Add check constraints to auditorium approval role columns
-- Validates that only approved roles can be used for approval stages
-- approval_4_role allows multiple roles separated by '|'

alter table public.auditoriums
  drop constraint if exists auditoriums_approval_1_role_check,
  drop constraint if exists auditoriums_approval_2_role_check,
  drop constraint if exists auditoriums_approval_3_role_check,
  drop constraint if exists auditoriums_approval_4_role_check;

alter table public.auditoriums
  add constraint auditoriums_approval_1_role_check
    check (approval_1_role in ('none', 'head', 'electrician', 'principal', 'maintenance', 'admin_officer', 'chairman', 'higher_authority', 'purchase_officer', 'work_done', 'department_user', 'sub_admin', 'admin')),
  add constraint auditoriums_approval_2_role_check
    check (approval_2_role in ('none', 'head', 'electrician', 'principal', 'maintenance', 'admin_officer', 'chairman', 'higher_authority', 'purchase_officer', 'work_done', 'department_user', 'sub_admin', 'admin')),
  add constraint auditoriums_approval_3_role_check
    check (approval_3_role in ('none', 'head', 'electrician', 'principal', 'maintenance', 'admin_officer', 'chairman', 'higher_authority', 'purchase_officer', 'work_done', 'department_user', 'sub_admin', 'admin')),
  add constraint auditoriums_approval_4_role_check
    check (approval_4_role ~ '^(none|head|electrician|principal|maintenance|admin_officer|chairman|higher_authority|purchase_officer|work_done|department_user|sub_admin|admin)(\|(head|electrician|principal|maintenance|admin_officer|chairman|higher_authority|purchase_officer|work_done|department_user|sub_admin|admin))*$');

-- Ensure head_user_id, principal_user_id, maintenance_user_id columns exist
alter table public.auditoriums
  add column if not exists head_user_id text,
  add column if not exists principal_user_id text,
  add column if not exists maintenance_user_id text,
  add column if not exists electrician_user_id text,
  add column if not exists admin_officer_user_id text;

-- Notify PostgREST to reload schema
notify pgrst, 'reload schema';