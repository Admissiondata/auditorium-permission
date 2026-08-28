-- Seed data for 350 inventory records (Computer ... Aero).
-- Run this file in the Supabase SQL editor. Safe to re-run.
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Tube Lights', 'Tube Lights (pl)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-1', 'Tube Lights', 'Tube Lights (pl)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Tube Lights', 'Tube Lights (pl)', 186)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Corridor G.F.', 'Tube Lights', 'Bulbs', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Corridor F.F.', 'Tube Lights', 'Bulbs', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Corridor', 'Tube Lights', 'Bulbs', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Corridor T.F.', 'Tube Lights', 'Bulbs', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Tube Lights', 'Bulbs', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Air Conditioner', 'Air Conditioner', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Air Conditioner', 'Air Conditioner', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'Air Conditioner', 'Air Conditioner', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Air Conditioner', 'Air Conditioner', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Air Conditioner', 'Air Conditioner', 43)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Air Conditioner', 'Window', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Air Conditioner', 'Window', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Air Conditioner', 'Split', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Air Conditioner', 'Split', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Telephone', 'Telephone', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Staff Room-3', 'Telephone', 'Telephone', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Telephone', 'Telephone', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Computer (Set)', 'Computer (Set)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Computer (Set)', 'Computer (Set)', 15)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Computer (Set)', 'Computer (Set)', 15)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Computer (Set)', 'Computer (Set)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Computer (Set)', 'Computer (Set)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Computer (Set)', 'Computer (Set)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Computer (Set)', 'Computer (Set)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Computer (Set)', 'Computer (Set)', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Computer (Set)', 'Computer (Set)', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Computer (Set)', 'Computer (Set)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Computer (Set)', 'Computer (Set)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Computer (Set)', 'Computer (Set)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Computer (Set)', 'Computer (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Computer (Set)', 'Computer (Set)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Computer (Set)', 'Computer (Set)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Computer (Set)', 'Computer (Set)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Computer (Set)', 'Computer (Set)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Computer (Set)', 'Computer (Set)', 224)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Printer (Specify Make)', 'Laser', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Printer (Specify Make)', 'Laser', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Printer (Specify Make)', 'Laser', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Printer (Specify Make)', 'Laser', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Scanner (Specify Make :       )', 'Scanner (Specify Make :       )', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Scanner (Specify Make :       )', 'Scanner (Specify Make :       )', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'CVT (Specify Walt)  (3 kva)', 'CVT (Specify Walt)  (3 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'CVT (Specify Walt)  (3 kva)', 'CVT (Specify Walt)  (3 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Servo stabilizer  (7 kva)', 'Servo stabilizer  (7 kva)', 15)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Corridor G.F.', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Corridor F.F.', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Corridor', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Corridor T.F.', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Cameras (CCTV)', 'Night vision Camera', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Cameras (CCTV)', 'Web Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Cameras (CCTV)', 'Web Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'E-1 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Cameras (CCTV)', 'Web Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Cameras (CCTV)', 'Web Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'Cameras (CCTV)', 'Web Camera', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Cameras (CCTV)', 'Web Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Cameras (CCTV)', 'Web Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Cameras (CCTV)', 'Web Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Cameras (CCTV)', 'Web Camera', 32)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Television', 'LED', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Television', 'LED', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Television', 'LED', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 105', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Class Room 106', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 205', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Class Room 206', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Television', 'LCD', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'DVR ( Camera)', 'DVR ( Camera)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'DVR ( Camera)', 'DVR ( Camera)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'DVR ( Camera)', 'DVR ( Camera)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'Switch', '8 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Switch', '8 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G1 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G2 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G3 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G4 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'G5 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F1 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F2 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F3 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F4 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F5 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'F6 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S4 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S3 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S2 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'S1 Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'IOT Lab.', 'Switch', '24 Ports', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Switch', '24 Ports', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Multi Meter', 'Multi Meter', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Multi Meter', 'Multi Meter', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Multi Meter', 'Multi Meter', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Corridor F.F.', 'Speaker', 'Speaker', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Corridor', 'Speaker', 'Speaker', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'Speaker', 'Speaker', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Speaker', 'Speaker', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Seminar Hall', 'Amplifier', 'Amplifier', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Amplifier', 'Amplifier', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Taparia Screw Driver Set', 'Taparia Screw Driver Set', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Taparia Screw Driver Set', 'Taparia Screw Driver Set', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Taparia Screw Driver Set', 'Taparia Screw Driver Set', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Taparia Screw Driver Set', 'Taparia Screw Driver Set', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Nose Plier', 'Nose Plier', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Nose Plier', 'Nose Plier', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Nose Plier', 'Nose Plier', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Nose Plier', 'Nose Plier', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Ele. Blower "RAM VIJAY"', 'Ele. Blower "RAM VIJAY"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Ele. Blower "RAM VIJAY"', 'Ele. Blower "RAM VIJAY"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Wire stripper & cutter', 'Wire stripper & cutter', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'Wire stripper & cutter', 'Wire stripper & cutter', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Wire stripper & cutter', 'Wire stripper & cutter', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Wire stripper & cutter', 'Wire stripper & cutter', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Soldering Iron', 'Soldering Iron', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'Soldering Iron', 'Soldering Iron', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Soldering Iron', 'Soldering Iron', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'NETWORK TESTING TOOLS', 'NETWORK TESTING TOOLS', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'NETWORK TESTING TOOLS', 'NETWORK TESTING TOOLS', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'hammer small', 'Hammer small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'First Floor', 'Maintanance Room -1', 'hammer small', 'Hammer small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Second Floor', 'Maintanance Room-2', 'hammer small', 'Hammer small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'hammer small', 'Hammer small', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Server Room', 'Dust bin small', 'Dust bin small', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'Staff Room -1', 'Dust bin small', 'Dust bin small', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Ground Floor', 'H.O.D.C.E. & cleark', 'Dust bin small', 'Dust bin small', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 305', 'Dust bin small', 'Dust bin small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306', 'Dust bin small', 'Dust bin small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'Class Room 306-A', 'Dust bin small', 'Dust bin small', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Computer', 'Third Floor', 'M.E.Class-2', 'Dust bin small', 'Dust bin small', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Staff Room', 'Tables', '(a) Reading Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Exibition Room', 'Tables', '(a) Reading Tables', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'AM / Aeroclub', 'Tables', '(a) Reading Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'OM / Composite Lab', 'Tables', '(a) Reading Tables', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Tables', '(a) Reading Tables', 21)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Exibition Room', 'Tables', '(b) Lab. Tables', 32)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'AM / Aeroclub', 'Tables', '(b) Lab. Tables', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Avionics/ C & N Lab', 'Tables', '(b) Lab. Tables', 15)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Phicics Lab', 'Tables', '(b) Lab. Tables', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'OM / Composite Lab', 'Tables', '(b) Lab. Tables', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Tables', '(b) Lab. Tables', 84)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Tables', '(c) Comp. Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Staff Room', 'Tables', '(c) Comp. Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CFD Lab', 'Tables', '(c) Comp. Tables', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'UAV Lab', 'Tables', '(c) Comp. Tables', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'AM / Aeroclub', 'Tables', '(c) Comp. Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Avionics/ C & N Lab', 'Tables', '(c) Comp. Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Tables', '(c) Comp. Tables', 24)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Tables', '(d) HODs Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Tables', '(d) HODs Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Tables', '(e) Drawer Table', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Staff Room', 'Tables', '(e) Drawer Table', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Aeordynamic Lab', 'Tables', '(e) Drawer Table', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Jet Propulsion Lab', 'Tables', '(e) Drawer Table', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CFD Lab', 'Tables', '(e) Drawer Table', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'UAV Lab', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'C.R.113', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'C.R. 114', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'AM / Aeroclub', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Seminar Room', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CR 213', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CR 214', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 313', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 314', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Phicics Lab', 'Tables', '(e) Drawer Table', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'OM / Composite Lab', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Tables', '(e) Drawer Table', 30)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Seminar Room', 'Tables', '(f) Projector Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Tables', '(f) Projector Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'OM / Composite Lab', 'Tables', '(g) Drawing Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Tables', '(g) Drawing Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Jet Propulsion Lab', 'Tables', '(j) Workshop Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Exibition Room', 'Tables', '(j) Workshop Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Tables', '(j) Workshop Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Tables', '(l) Office Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Tables', '(l) Office Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Aeordynamic Lab', 'Benches', 'Benches', 13)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Jet Propulsion Lab', 'Benches', 'Benches', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'C.R.113', 'Benches', 'Benches', 38)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'C.R. 114', 'Benches', 'Benches', 35)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Seminar Room', 'Benches', 'Benches', 35)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CR 213', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CR 214', 'Benches', 'Benches', 39)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Avionics/ C & N Lab', 'Benches', 'Benches', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 313', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 314', 'Benches', 'Benches', 37)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Phicics Lab', 'Benches', 'Benches', 27)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'OM / Composite Lab', 'Benches', 'Benches', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Benches', 'Benches', 335)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Chairs', '(b) Plastic', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Chairs', '(b) Plastic', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Staff Room', 'Chairs', '(c) Net', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Chairs', '(c) Net', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Chairs', '(d) Visitor''s', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Chairs', '(d) Visitor''s', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Chairs', '(e) Chair (Revolving)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Staff Room', 'Chairs', '(e) Chair (Revolving)', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Chairs', '(e) Chair (Revolving)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CFD Lab', 'Chairs', '(f) Chair for Computer', 23)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'UAV Lab', 'Chairs', '(f) Chair for Computer', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Avionics/ C & N Lab', 'Chairs', '(f) Chair for Computer', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Chairs', '(f) Chair for Computer', 44)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Dept Library', 'Cupboard', '(a) Both side Glass Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Cupboard', '(a) Both side Glass Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Dept Library', 'Cupboard', '(b) One Side Glass Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Cupboard', '(b) One Side Glass Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Cupboard', '(c) Big Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CFD Lab', 'Cupboard', '(c) Big Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Exibition Room', 'Cupboard', '(c) Big Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'AM / Aeroclub', 'Cupboard', '(c) Big Steel', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Phicics Lab', 'Cupboard', '(c) Big Steel', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Cupboard', '(c) Big Steel', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Cupboard', '(d) Small Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Aeordynamic Lab', 'Cupboard', '(d) Small Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Avionics/ C & N Lab', 'Cupboard', '(d) Small Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'OM / Composite Lab', 'Cupboard', '(d) Small Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Cupboard', '(d) Small Steel', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Cupboard', '(g) Wooden Cupboard (Small)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Staff Room', 'Cupboard', '(g) Wooden Cupboard (Small)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Cupboard', '(g) Wooden Cupboard (Small)', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CFD Lab', 'Wooden Racks/ Iron Racks', '(c) Iron Racks', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Passage', 'Wooden Racks/ Iron Racks', '(c) Iron Racks', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Store Room', 'Wooden Racks/ Iron Racks', '(c) Iron Racks', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Wooden Racks/ Iron Racks', '(c) Iron Racks', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'C.R.113', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'C.R. 114', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Seminar Room', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CR 213', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CR 214', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 313', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 314', 'Class Room Platforms', 'Class Room Platforms', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Class Room Platforms', 'Class Room Platforms', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'Notice Boards', 'Notice Boards', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Staff Room', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Aeordynamic Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Jet Propulsion Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CFD Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'UAV Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Passage', 'Notice Boards', 'Notice Boards', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Exibition Room', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'AM / Aeroclub', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Avionics/ C & N Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Phicics Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'OM / Composite Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'Notice Boards', 'Notice Boards', 23)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CFD Lab', 'White Board', '(a) Sliding', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'C.R. 114', 'White Board', '(a) Sliding', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Seminar Room', 'White Board', '(a) Sliding', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'White Board', '(a) Sliding', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'HOD office', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Jet Propulsion Lab', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'UAV Lab', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Avionics/ C & N Lab', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 313', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 314', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Phicics Lab', 'White Board', '(c) White Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'OM / Composite Lab', 'White Board', '(c) White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'White Board', '(c) White Board', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'C.R.113', 'White Board', 'Smart Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'C.R. 114', 'White Board', 'Smart Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Passage', 'White Board', 'Smart Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'CR 213', 'White Board', 'Smart Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 313', 'White Board', 'Smart Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'CR 314', 'White Board', 'Smart Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'White Board', 'Smart Board', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Ground Floor', 'Staff Room', 'College Water Jung (Liter Specify)', 'Big', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Aero', 'Third Floor', 'Passage', 'College Water Jung (Liter Specify)', 'Big', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
