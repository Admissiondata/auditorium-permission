-- Seed data for 350 inventory records (Mechanical ... Mechanical).
-- Run this file in the Supabase SQL editor. Safe to re-run.
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'SURFACE LAB', 'Stapler', 'Stapler', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Stapler', 'Stapler (Big)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Fans', '(a) Ceiling', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Staff Room 1', 'Fans', '(a) Ceiling', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Staff Room 2', 'Fans', '(a) Ceiling', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Fans', '(a) Ceiling', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'DEAN R&D', 'Fans', '(a) Ceiling', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'R&D LAB', 'Fans', '(a) Ceiling', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'AUTO. LAB', 'Fans', '(a) Ceiling', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAM.LAB', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'SSIP CELL', 'Fans', '(a) Ceiling', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Fans', '(a) Ceiling', 23)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Machine tool lab', 'Fans', '(a) Ceiling', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'MSM lab', 'Fans', '(a) Ceiling', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'RAC Lab', 'Fans', '(a) Ceiling', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'Fans', '(a) Ceiling', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CLASS ROOM 111', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 112', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 111A', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 112A', 'Fans', '(a) Ceiling', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'DOM LAB', 'Fans', '(a) Ceiling', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CONTROL LAB', 'Fans', '(a) Ceiling', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'TUTORIAL ROOM', 'Fans', '(a) Ceiling', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'Staff Room 1', 'Fans', '(a) Ceiling', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 211', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 212', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 211A', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Fans', '(a) Ceiling', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'RP LAB', 'Fans', '(a) Ceiling', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'SURFACE LAB', 'Fans', '(a) Ceiling', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311', 'Fans', '(a) Ceiling', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 312', 'Fans', '(a) Ceiling', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311A', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'ME 1', 'Fans', '(a) Ceiling', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'ME 2', 'Fans', '(a) Ceiling', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'DEPT. LIBRARY', 'Fans', '(a) Ceiling', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'ME CAD', 'Fans', '(a) Ceiling', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'PROJECT ROOM', 'Fans', '(a) Ceiling', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Fans', '(b) Pedestal fan', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'RAC Lab', 'Fans', '(b) Pedestal fan', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'Fans', '(b) Pedestal fan', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'SSIP CELL', 'Fans', '(c) Wall Mount Fan', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Fans', '(c) Wall Mount Fan', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'Fans', '(c) Wall Mount Fan', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Fans', '(d) Exhaust Fans', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'PASSAGE', 'Fans', '(d) Exhaust Fans', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'MSM lab', 'Fans', '(d) Exhaust Fans', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'TUTORIAL ROOM', 'Fans', '(d) Exhaust Fans', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'PASSAGE', 'Fans', '(d) Exhaust Fans', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'SURFACE LAB', 'Fans', '(d) Exhaust Fans', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Staff Room 2', 'Faculty cubical', 'Faculty cubical', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'SSIP CELL', 'Faculty cubical', 'Faculty cubical', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'Staff Room 1', 'Faculty cubical', 'Faculty cubical', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Staff Room 1', 'Tube Lights', 'Tube Lights (pl)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Staff Room 2', 'Tube Lights', 'Tube Lights (pl)', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Tube Lights', 'Tube Lights (pl)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'DEAN R&D', 'Tube Lights', 'Tube Lights (pl)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'R&D LAB', 'Tube Lights', 'Tube Lights (pl)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'AUTO. LAB', 'Tube Lights', 'Tube Lights (pl)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAM.LAB', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'SSIP CELL', 'Tube Lights', 'Tube Lights (pl)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'PASSAGE', 'Tube Lights', 'Tube Lights (pl)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tube Lights', 'Tube Lights (pl)', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'MSM lab', 'Tube Lights', 'Tube Lights (pl)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CLASS ROOM 111', 'Tube Lights', 'Tube Lights (pl)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 112', 'Tube Lights', 'Tube Lights (pl)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 111A', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 112A', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'DOM LAB', 'Tube Lights', 'Tube Lights (pl)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CONTROL LAB', 'Tube Lights', 'Tube Lights (pl)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'TUTORIAL ROOM', 'Tube Lights', 'Tube Lights (pl)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'Staff Room 1', 'Tube Lights', 'Tube Lights (pl)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 211', 'Tube Lights', 'Tube Lights (pl)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 212', 'Tube Lights', 'Tube Lights (pl)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 211A', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'RP LAB', 'Tube Lights', 'Tube Lights (pl)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'SURFACE LAB', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 312', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311A', 'Tube Lights', 'Tube Lights (pl)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'ME 1', 'Tube Lights', 'Tube Lights (pl)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'ME 2', 'Tube Lights', 'Tube Lights (pl)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'DEPT. LIBRARY', 'Tube Lights', 'Tube Lights (pl)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'ME CAD', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'PROJECT ROOM', 'Tube Lights', 'Tube Lights (pl)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'PASSAGE', 'Tube Lights', 'Tube Lights (pl)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Tube Lights', 'Bulbs', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'PASSAGE', 'Tube Lights', 'Bulbs', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tube Lights', 'Bulbs', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Machine tool lab', 'Tube Lights', 'Bulbs', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'PASSAGE', 'Tube Lights', 'Bulbs', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Tube Lights', 'Bulbs', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'RP LAB', 'Tube Lights', 'Bulbs', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'PASSAGE', 'Tube Lights', 'Bulbs', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311A', 'Tube Lights', 'Bulbs', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'PROJECT ROOM', 'Tube Lights', 'Bulbs', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Air Conditioner', 'Window', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Staff Room 2', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'DEAN R&D', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'R&D LAB', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'SSIP CELL', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CLASS ROOM 111', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 112', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 111A', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 211', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 212', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Air Conditioner', 'Split', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'SURFACE LAB', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 312', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'SSIP CELL', 'Telephone', 'Telephone', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'DEAN R&D', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 211A', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311A', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Computer (Set)', 'Computer (Set)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Computer (Set)', 'Computer (Set)', 21)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'DEAN R&D', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'R&D LAB', 'Computer (Set)', 'Computer (Set)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAM.LAB', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'SSIP CELL', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'MSM lab', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'RP LAB', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'SURFACE LAB', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Printer (Specify Make)', 'Laser', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Printer (Specify Make)', 'Laser', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'DEAN R&D', 'Printer (Specify Make)', 'Laser', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'SSIP CELL', 'Printer (Specify Make)', 'Laser', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'SURFACE LAB', 'Printer (Specify Make)', 'Laser', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Scanner (Specify Make :       )', 'Scanner (Specify Make :       )', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'R&D LAB', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAM.LAB', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'DEAN R&D', 'CVT (Specify Walt)  (3 kva)', 'CVT (Specify Walt)  (3 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'R&D LAB', 'CVT (Specify Walt)  (3 kva)', 'CVT (Specify Walt)  (3 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAM.LAB', 'CVT (Specify Walt)  (3 kva)', 'CVT (Specify Walt)  (3 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'CVT (Specify Walt)  (3 kva)', 'CVT (Specify Walt)  (3 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Pen Drive', 'Pen Drive', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'DEAN R&D', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'R&D LAB', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'AUTO. LAB', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAM.LAB', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'PASSAGE', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Cameras (CCTV)', 'Night vision Camera', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Machine tool lab', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'MSM lab', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'RAC Lab', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'Cameras (CCTV)', 'Night vision Camera', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CLASS ROOM 111', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 112', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 111A', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 112A', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'DOM LAB', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CONTROL LAB', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'PASSAGE', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 211', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 212', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 211A', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'SURFACE LAB', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'PASSAGE', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 312', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311A', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'ME 1', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'ME 2', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'DEPT. LIBRARY', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'ME CAD', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'PROJECT ROOM', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'PASSAGE', 'Cameras (CCTV)', 'Night vision Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Cameras (CCTV)', 'Web Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Television', 'LED', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CLASS ROOM 111', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 112', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 111A', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'CLASS ROOM 112A', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 211', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'CLASS ROOM 212', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 311', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'CLASS ROOM 312', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Blower', 'Blower', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'DVR ( Camera)', 'DVR ( Camera)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'DVR ( Camera)', 'DVR ( Camera)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Switch', '8 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Switch', '8 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'PASSAGE', 'Switch', '8 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAM.LAB', 'Switch', '16 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'R&D LAB', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Switch', '4 Port VGA Switch (Camera DVR)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Switch', '4 Port VGA Switch (Camera DVR)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'PASSAGE', 'Internet Modem', 'Internet Modem', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Internet Modem', 'Internet Modem', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'First Floor', 'PASSAGE', 'Internet Modem', 'Internet Modem', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Internet Modem', 'Internet Modem', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'PASSAGE', 'Internet Modem', 'Internet Modem', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Third Floor', 'PASSAGE', 'Internet Modem', 'Internet Modem', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'CAD Lab', 'Computer Speaker', 'Computer Speaker', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'Refrigerator', 'Refrigerator', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'SURFACE LAB', 'Refrigerator', 'Refrigerator', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Halogen Light', 'Halogen Light', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'PASSAGE', 'Speaker', 'Speaker', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Speaker', 'Speaker', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Amplifier', 'Amplifier', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'HOD OFFICE', 'Water Glass', 'Water Glass', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Staff Room 2', 'Water Glass', 'Water Glass', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Water Glass', 'Water Glass', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Themal Lab', 'Water Glass', 'Water Glass', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Measure Tap 5 Mtr', 'Measure Tap 5 Mtr', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Measure Tap 3 Mtr', 'Measure Tap 3 Mtr', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Spring Calliper (Out Side) 4''''', 'Spring Calliper (Out Side) 4''''', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Spring Calliper (Out Side) 6''''', 'Spring Calliper (Out Side) 6''''', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Spring Calliper (Out Side) 8''''', 'Spring Calliper (Out Side) 8''''', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Spring Calliper  (In  Side) 4''''', 'Spring Calliper  (In  Side) 4''''', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Spring Calliper  (In  Side) 6''''', 'Spring Calliper  (In  Side) 6''''', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Spring Calliper  (In  Side) 8''''', 'Spring Calliper  (In  Side) 8''''', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Odd Leg Calliper', 'Odd Leg Calliper', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Divider', 'Divider', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Box Spanner Set', 'Box Spanner Set', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Allen  Key Set', 'Allen  Key Set', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Universal Letter', 'Universal Letter', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Bench Vice', 'Bench Vice', 24)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Bench Vice-  (All Steel)', 'Bench Vice-  (All Steel)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Wrench (Big)', 'Die Wrench (Big)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -1/4"', 'Die Piece -1/4"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -3/8"', 'Die Piece -3/8"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -1/2"', 'Die Piece -1/2"', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -5/8"', 'Die Piece -5/8"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -3/4''''', 'Die Piece -3/4''''', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -5 mm', 'Die Piece -5 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -6mm', 'Die Piece -6mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -8 mm', 'Die Piece -8 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -10 mm', 'Die Piece -10 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -12 mm', 'Die Piece -12 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -14 mm', 'Die Piece -14 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -16 mm', 'Die Piece -16 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Die Piece -20 mm', 'Die Piece -20 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Wrench (Medium)', 'Tap Wrench (Medium)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set -1/4"', 'Tap Set -1/4"', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set  5/16"', 'Tap Set  5/16"', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set -3/8"', 'Tap Set -3/8"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set 1/2"', 'Tap Set 1/2"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set 5/8"', 'Tap Set 5/8"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set 3/4"', 'Tap Set 3/4"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set -5mm', 'Tap Set -5mm', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set -6mm', 'Tap Set -6mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set -8mm', 'Tap Set -8mm', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set -10mm', 'Tap Set -10mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set -12mm', 'Tap Set -12mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set -16mm', 'Tap Set -16mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set -20mm', 'Tap Set -20mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set (Pipe thread) -1/4"', 'Tap Set (Pipe thread) -1/4"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tap Set (Pipe thread) -3/8"', 'Tap Set (Pipe thread) -3/8"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Centre Punch', 'Centre Punch', 15)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Flat Chisel', 'Flat Chisel', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Flat File (Rough)-12"', 'Flat File (Rough)-12"', 25)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Flat File(Smooth)-10"', 'Flat File(Smooth)-10"', 25)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Half Round File-6"', 'Half Round File-6"', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Half Round File-10"', 'Half Round File-10"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Trianguler File', 'Trianguler File', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Square File', 'Square File', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Round File', 'Round File', 20)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Niddle File Set', 'Niddle File Set', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Scale-24"', 'Scale-24"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Scale-12"', 'Scale-12"', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Scale-6"', 'Scale-6"', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Try Square', 'Try Square', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Try Square-12"', 'Try Square-12"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Hack Saw Frame-12"', 'Hand Hack Saw Frame-12"', 21)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taparia Screw Spanner-12"', 'Taparia Screw Spanner-12"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taparia Screw Spanner-6"', 'Taparia Screw Spanner-6"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Fix Spanner -12 NOS.', 'Fix Spanner -12 NOS.', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Ring Spanner -12 NOS.', 'Ring Spanner -12 NOS.', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Ball Pain Hammer (200gm)', 'Ball Pain Hammer (200gm)', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Cross Pain Hammer (800gm)', 'Cross Pain Hammer (800gm)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Ball Pain Hammer (800gm)', 'Ball Pain Hammer (800gm)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Clow Hammer', 'Clow Hammer', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Sledge Hammer (Big)', 'Sledge Hammer (Big)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Sledge Hammer (Medium)', 'Sledge Hammer (Medium)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Sledge Hammer (Small)', 'Sledge Hammer (Small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Combination Plier', 'Combination Plier', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Nose Plier', 'Nose Plier', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Water Pump Plier', 'Water Pump Plier', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Pincer', 'Pincer', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Bearing Pooler', 'Bearing Pooler', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '"C" Clamp-4"', '"C" Clamp-4"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '"C" Clamp-6"', '"C" Clamp-6"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Grease Gun', 'Grease Gun', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Oil Gun', 'Oil Gun', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Magnet', 'Magnet', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Oil Coupi', 'Oil Coupi', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tin Cutter Small', 'Tin Cutter Small', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Disc Grinder 4"', 'Disc Grinder 4"', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Drill Machine', 'Hand Drill Machine', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Spray Gun', 'Spray Gun', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tool Holder Straight', 'Tool Holder Straight', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tool Holder Right', 'Tool Holder Right', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tool Holder Left', 'Tool Holder Left', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Parting Tool Holder', 'Parting Tool Holder', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Knurling Tool Holder', 'Knurling Tool Holder', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Drill Chuck 1/2"', 'Drill Chuck 1/2"', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Drill Chuck for Hand Drill M/C', 'Drill Chuck for Hand Drill M/C', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Revolving Centre MT -3', 'Revolving Centre MT -3', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Revolving Centre MT -2', 'Revolving Centre MT -2', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Drill Sleve Size 1-2', 'Drill Sleve Size 1-2', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Drill Sleve Size 2-3', 'Drill Sleve Size 2-3', 25)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Drill Sleve Size 3-4', 'Drill Sleve Size 3-4', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Carbide Tip Tool', 'Carbide Tip Tool', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Boaring Bar 1/2"', 'Boaring Bar 1/2"', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Boaring Bar 3/8"', 'Boaring Bar 3/8"', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Boaring Bar 5/16"', 'Boaring Bar 5/16"', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Boaring Bar 1/4"', 'Boaring Bar 1/4"', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Boaring Bar 3/16"', 'Boaring Bar 3/16"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Lathe Carier', 'Lathe Carier', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '4 Jaw Chuck', '4 Jaw Chuck', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '3 Jaw Chuck', '3 Jaw Chuck', 13)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Face Plate', 'Face Plate', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Dog Plate', 'Dog Plate', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Wheel Drasser (Diamond))', 'Wheel Drasser (Diamond))', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Coolant Pump', 'Coolant Pump', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Lathe Cutting Tool 3/8"x3"', 'Lathe Cutting Tool 3/8"x3"', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Lathe Cutting Tool 1/4"x3"', 'Lathe Cutting Tool 1/4"x3"', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Centre Drill BS-6', 'Centre Drill BS-6', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Centre Drill BS-5', 'Centre Drill BS-5', 14)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Centre Drill BS-4', 'Centre Drill BS-4', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Centre Drill BS-3', 'Centre Drill BS-3', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taper Shank Drill-25 mm', 'Taper Shank Drill-25 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taper Shank Drill-22 mm', 'Taper Shank Drill-22 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taper Shank Drill-19 mm', 'Taper Shank Drill-19 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taper Shank Drill-17 mm', 'Taper Shank Drill-17 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taper Shank Drill-15 mm', 'Taper Shank Drill-15 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taper Shank Drill-14 mm', 'Taper Shank Drill-14 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taper Shank Drill-13 mm', 'Taper Shank Drill-13 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-12.5 mm', 'Staight Drill-12.5 mm', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-12 mm', 'Staight Drill-12 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-11.5 mm', 'Staight Drill-11.5 mm', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-11 mm', 'Staight Drill-11 mm', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
