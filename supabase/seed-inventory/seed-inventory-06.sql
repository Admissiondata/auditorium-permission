-- Seed data for 350 inventory records (Computer ... Computer).
-- Run this file in the Supabase SQL editor. Safe to re-run.
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'Tables', '(a) Reading Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Tables', '(a) Reading Tables', 14)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Tables', '(c) Comp. Tables', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Tables', '(c) Comp. Tables', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Tables', '(c) Comp. Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Tables', '(c) Comp. Tables', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Tables', '(c) Comp. Tables', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Tables', '(c) Comp. Tables', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Tables', '(c) Comp. Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Tables', '(c) Comp. Tables', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Tables', '(c) Comp. Tables', 143)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Tables', '(e) Drawer Table', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Tables', '(e) Drawer Table', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Tables', '(h) Lab Faculty Table', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Tables', '(h) Lab Faculty Table', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Tables', '(l) Office Tables', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Tables', '(l) Office Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Tables', '(l) Office Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Staff Room-2', 'Tables', '(l) Office Tables', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Tables', '(l) Office Tables', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Tables', '(l) Office Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Tables', '(l) Office Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Tables', '(l) Office Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Tables', '(l) Office Tables', 33)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Benches', 'Benches', 33)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Benches', 'Benches', 32)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Benches', 'Benches', 30)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Benches', 'Benches', 35)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Benches', 'Benches', 45)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-1', 'Benches', 'Benches', 14)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Benches', 'Benches', 319)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Chairs', '(b) Plastic', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Chairs', '(b) Plastic', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Chairs', '(b) Plastic', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Chairs', '(b) Plastic', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Chairs', '(b) Plastic', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Chairs', '(b) Plastic', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Staff Room-2', 'Chairs', '(b) Plastic', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Chairs', '(b) Plastic', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'E-1 Lab.', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Chairs', '(b) Plastic', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Chairs', '(b) Plastic', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Chairs', '(b) Plastic', 41)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Chairs', '(d) Visitor''s', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Chairs', '(d) Visitor''s', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Chairs', '(d) Visitor''s', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Chairs', '(e) Chair (Revolving)', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Chairs', '(e) Chair (Revolving)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Chairs', '(e) Chair (Revolving)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Staff Room-2', 'Chairs', '(e) Chair (Revolving)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'E-1 Lab.', 'Chairs', '(e) Chair (Revolving)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Chairs', '(e) Chair (Revolving)', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Chairs', '(e) Chair (Revolving)', 34)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Chairs', '(f) Chair for Computer', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Chairs', '(f) Chair for Computer', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Chairs', '(f) Chair for Computer', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Chairs', '(f) Chair for Computer', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Chairs', '(f) Chair for Computer', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Chairs', '(f) Chair for Computer', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Chairs', '(f) Chair for Computer', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Chairs', '(f) Chair for Computer', 20)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Chairs', '(f) Chair for Computer', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Chairs', '(f) Chair for Computer', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Chairs', '(f) Chair for Computer', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Chairs', '(f) Chair for Computer', 20)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Chairs', '(f) Chair for Computer', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Chairs', '(f) Chair for Computer', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Chairs', '(f) Chair for Computer', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Chairs', '(f) Chair for Computer', 15)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Chairs', '(f) Chair for Computer', 276)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-1', 'Chairs', '(h) Chairs for writing pad', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Chairs', '(h) Chairs for writing pad', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Cupboard', '(a) Both side Glass Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Dept.Library', 'Cupboard', '(a) Both side Glass Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Cupboard', '(a) Both side Glass Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Cupboard', '(c) Big Steel', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Cupboard', '(c) Big Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Cupboard', '(c) Big Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Cupboard', '(c) Big Steel', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Cupboard', '(d) Small Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Cupboard', '(d) Small Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Wooden Racks/ Iron Racks', '(a) Wooden Racks (Big)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Wooden Racks/ Iron Racks', '(a) Wooden Racks (Big)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Wooden Racks/ Iron Racks', '(b) Wooden Racks (Small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Wooden Racks/ Iron Racks', '(b) Wooden Racks (Small)', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Wooden Racks/ Iron Racks', '(b) Wooden Racks (Small)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Wooden Racks/ Iron Racks', '(b) Wooden Racks (Small)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Wooden Racks/ Iron Racks', '(b) Wooden Racks (Small)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Wooden Racks/ Iron Racks', '(b) Wooden Racks (Small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Wooden Racks/ Iron Racks', '(b) Wooden Racks (Small)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Wooden Racks/ Iron Racks', '(b) Wooden Racks (Small)', 27)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-1', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Class Room Platforms', 'Class Room Platforms', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Corridor G.F.', 'Notice Boards', 'Notice Boards', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Notice Boards', 'Notice Boards', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Corridor F.F.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Corridor T.F.', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Notice Boards', 'Notice Boards', 27)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Corridor F.F.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'E-1 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'White Board', '(c) White Board', 26)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Corridor G.F.', 'Paper Racks', 'Book Supporter (Iron)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Corridor F.F.', 'Paper Racks', 'Book Supporter (Iron)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Corridor', 'Paper Racks', 'Book Supporter (Iron)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Dept.Library', 'Paper Racks', 'Book Supporter (Iron)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Paper Racks', 'Book Supporter (Iron)', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'College Water Jung (Liter Specify)', 'Small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Corridor', 'College Water Jung (Liter Specify)', 'Small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'College Water Jung (Liter Specify)', 'Small', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Stools for Computers', 'Stools for Computers', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Stools for Computers', 'Stools for Computers', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Stools for Computers', 'Stools for Computers', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Stools for Computers', 'Stools for Computers', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Stools for Computers', 'Stools for Computers', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Stools for Computers', 'Stools for Computers', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Stools for Computers', 'Stools for Computers', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Stools for Computers', 'Stools for Computers', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Stools for Computers', 'Stools for Computers', 44)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Corridor G.F.', 'Dustbin (BIG)', 'Dustbin (BIG)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Dustbin (BIG)', 'Dustbin (BIG)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Dustbin (BIG)', 'Dustbin (BIG)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Dustbin (BIG)', 'Dustbin (BIG)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Dustbin (BIG)', 'Dustbin (BIG)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Dustbin (BIG)', 'Dustbin (BIG)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Dustbin (BIG)', 'Small', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Staff Room-2', 'Dustbin (BIG)', 'Small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Corridor F.F.', 'Dustbin (BIG)', 'Small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Dustbin (BIG)', 'Small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Corridor', 'Dustbin (BIG)', 'Small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Dustbin (BIG)', 'Small', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Extension Board', 'Extension Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Extension Board', 'Extension Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Extension Board', 'Extension Board', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'Projector Screen', 'Projector Screen', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Projector Screen', 'Projector Screen', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-1', 'Green Board', 'Green Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Green Board', 'Green Board', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Curtains', 'Curtains', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Curtains', 'Curtains', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Curtains', 'Curtains', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Curtains', 'Curtains', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Curtains', 'Curtains', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Curtains', 'Curtains', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Curtains', 'Curtains', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Curtains', 'Curtains', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Curtains', 'Curtains', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Curtains', 'Curtains', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Staff Room-2', 'Curtains', 'Curtains', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Curtains', 'Curtains', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Curtains', 'Curtains', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Curtains', 'Curtains', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Curtains', 'Curtains', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'Curtains', 'Curtains', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Curtains', 'Curtains', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Curtains', 'Curtains', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Curtains', 'Curtains', 53)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Curtains', 'Plastic curtain', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Curtains', 'Plastic curtain', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Curtains', 'Plastic curtain', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Curtains', 'Plastic curtain', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Curtains', 'Plastic curtain', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Curtains', 'Plastic curtain', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Corridor G.F.', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Corridor F.F.', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'E-2 Lab.', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Corridor', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Corridor T.F.', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Vision Mission Board', 'Vision Mission Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Vision Mission Board', 'Vision Mission Board', 38)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Corridor G.F.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Staff Room-2', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Corridor F.F.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'E-1 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Corridor', 'Fire Extinguisher', 'Fire Extinguisher', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Corridor T.F.', 'Fire Extinguisher', 'Fire Extinguisher', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Fire Extinguisher', 'Fire Extinguisher', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Punch (Jumbo)', 'Punch (small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Punch (Jumbo)', 'Punch (small)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Punch (Jumbo)', 'Punch (small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Punch (Jumbo)', 'Punch (small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Punch (Jumbo)', 'Punch (small)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Stapler', 'Stapler', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Stapler', 'Stapler', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Stapler', 'Stapler', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Stapler', 'Stapler', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Stapler', 'Stapler', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Fans', 'Fans', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Fans', 'Fans', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Fans', 'Fans', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Fans', 'Fans', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Fans', 'Fans', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Fans', 'Fans', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Fans', 'Fans', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Fans', 'Fans', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Fans', 'Fans', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-1', 'Fans', 'Fans', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Fans', 'Fans', 58)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Staff Room-2', 'Fans', '(b) Pedestal fan', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Fans', '(b) Pedestal fan', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Fans', '(b) Pedestal fan', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Fans', '(c) Wall Mount Fan', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Fans', '(c) Wall Mount Fan', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Fans', '(c) Wall Mount Fan', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Fans', '(c) Wall Mount Fan', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Fans', '(c) Wall Mount Fan', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Fans', '(c) Wall Mount Fan', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Tube Lights', 'Tube Lights (pl)', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Tube Lights', 'Tube Lights (pl)', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Tube Lights', 'Tube Lights (pl)', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Tube Lights', 'Tube Lights (pl)', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Tube Lights', 'Tube Lights (pl)', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Tube Lights', 'Tube Lights (pl)', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Tube Lights', 'Tube Lights (pl)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Tube Lights', 'Tube Lights (pl)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Tube Lights', 'Tube Lights (pl)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Staff Room-2', 'Tube Lights', 'Tube Lights (pl)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Tube Lights', 'Tube Lights (pl)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Tube Lights', 'Tube Lights (pl)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Tube Lights', 'Tube Lights (pl)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'E-1 Lab.', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'E-2 Lab.', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Tube Lights', 'Tube Lights (pl)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
