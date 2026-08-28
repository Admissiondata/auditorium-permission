-- Seed data for 350 inventory records (Mechanical ... Electrical).
-- Run this file in the Supabase SQL editor. Safe to re-run.
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-10.5 mm', 'Staight Drill-10.5 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-10 mm', 'Staight Drill-10 mm', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-9.5 mm', 'Staight Drill-9.5 mm', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-9 mm', 'Staight Drill-9 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-8.5 mm', 'Staight Drill-8.5 mm', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-8 mm', 'Staight Drill-8 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-7.5 mm', 'Staight Drill-7.5 mm', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-7 mm', 'Staight Drill-7 mm', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-6.5 mm', 'Staight Drill-6.5 mm', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-6 mm', 'Staight Drill-6 mm', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-5.5 mm', 'Staight Drill-5.5 mm', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-5 mm', 'Staight Drill-5 mm', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-4.5 mm', 'Staight Drill-4.5 mm', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-4 mm', 'Staight Drill-4 mm', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-3.5 mm', 'Staight Drill-3.5 mm', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-3 mm', 'Staight Drill-3 mm', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-2.5 mm', 'Staight Drill-2.5 mm', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-2 mm', 'Staight Drill-2 mm', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-1.5 mm', 'Staight Drill-1.5 mm', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Staight Drill-1 mm', 'Staight Drill-1 mm', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Collet for Milling M/C-25 mm', 'Collet for Milling M/C-25 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Collet for Milling M/C-20 mm', 'Collet for Milling M/C-20 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Collet for Milling M/C-16 mm', 'Collet for Milling M/C-16 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Collet for Milling M/C-10 mm', 'Collet for Milling M/C-10 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Collet for Milling M/C-6 mm', 'Collet for Milling M/C-6 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'End Mill Cutter-25 mm', 'End Mill Cutter-25 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'End Mill Cutter-20 mm', 'End Mill Cutter-20 mm', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'End Mill Cutter-18 mm', 'End Mill Cutter-18 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'End Mill Cutter-16 mm', 'End Mill Cutter-16 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'End Mill Cutter-14 mm', 'End Mill Cutter-14 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'End Mill Cutter-12 mm', 'End Mill Cutter-12 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'End Mill Cutter-10 mm', 'End Mill Cutter-10 mm', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'End Mill Cutter-8 mm', 'End Mill Cutter-8 mm', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'End Mill Cutter-6 mm', 'End Mill Cutter-6 mm', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'DP Cutter-20 DP', 'DP Cutter-20 DP', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'DP Cutter-14 DP', 'DP Cutter-14 DP', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'DP Cutter-10 DP', 'DP Cutter-10 DP', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Side & Face Cutter-80 x 12', 'Side & Face Cutter-80 x 12', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Slitting Cutter-100 x 6', 'Slitting Cutter-100 x 6', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Shall End Mill Cutter-100 x 36', 'Shall End Mill Cutter-100 x 36', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Shall End Mill Cutter-63 x 60', 'Shall End Mill Cutter-63 x 60', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Shall End Mill Cutter-63 x 50', 'Shall End Mill Cutter-63 x 50', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Remmer-12 mm', 'Hand Remmer-12 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Remmer-11 mm', 'Hand Remmer-11 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Remmer-10 mm', 'Hand Remmer-10 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Remmer-9 mm', 'Hand Remmer-9 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Remmer-8 mm', 'Hand Remmer-8 mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Grinding Wheel (White)', 'Grinding Wheel (White)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Emery Wheel', 'Emery Wheel', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Cut Of Wheel-14"', 'Cut Of Wheel-14"', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Emery Stone', 'Emery Stone', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Welding Glass Dark', 'Welding Glass Dark', 22)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Welding Holder', 'Welding Holder', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Welding Hand Screan', 'Welding Hand Screan', 22)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Filter for EDM', 'Filter for EDM', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Letter Punch-3/8"', 'Letter Punch-3/8"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Letter Punch-3/16"', 'Letter Punch-3/16"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Alphabate Punch-3/16"', 'Alphabate Punch-3/16"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Pipe Wrench-12"', 'Pipe Wrench-12"', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Scriber', 'Scriber', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Fitting Table', 'Fitting Table', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Stand for Surfaceplate', 'Stand for Surfaceplate', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Stand for Bench Grinder', 'Stand for Bench Grinder', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taparia Screw Driver-930', 'Taparia Screw Driver-930', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Anvil', 'Anvil', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tong Round Mouth', 'Tong Round Mouth', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Wooden Jack Plain', 'Wooden Jack Plain', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Metal Jack Plain (Big)', 'Metal Jack Plain (Big)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Wood Saw-Big', 'Hand Wood Saw-Big', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Wood Saw-Small', 'Hand Wood Saw-Small', 13)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Marking Gauge (Wooden)', 'Marking Gauge (Wooden)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Marking Gauge (Alluminium)', 'Marking Gauge (Alluminium)', 23)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Try Square-8"', 'Try Square-8"', 22)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Wooden Mallet', 'Wooden Mallet', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Firmer Chisel-1/4"', 'Firmer Chisel-1/4"', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Firmer Chisel-1/2"', 'Firmer Chisel-1/2"', 24)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Firmer Chisel-3/4"', 'Firmer Chisel-3/4"', 13)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Firmer Chisel-1"', 'Firmer Chisel-1"', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Mortise Chisel-!/4"', 'Mortise Chisel-!/4"', 23)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Screw Driver', 'Screw Driver', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Wood Rasp File', 'Wood Rasp File', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Netco Hand Drill  M/C.-6mm', 'Netco Hand Drill  M/C.-6mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Netco Hand Drill M/C.-10mm', 'Netco Hand Drill M/C.-10mm', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Carpentry  Vice', 'Carpentry  Vice', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Angle Cutting Tool (Die)', 'Angle Cutting Tool (Die)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Corner Cutting Tool (Die)', 'Corner Cutting Tool (Die)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '"ESSAB" Make Gas Welding  Cuting  Set,Oxygen Regulator,Acetylene Regulator', '"ESSAB" Make Gas Welding  Cuting  Set,Oxygen Regulator,Acetylene Regulator', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Soldering Iron for Blow Stove', 'Soldering Iron for Blow Stove', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '"ESSAB" Make Two Stage Oxy.Regulator With Standard Gauge', '"ESSAB" Make Two Stage Oxy.Regulator With Standard Gauge', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Pipe die set-1/2"', 'Pipe die set-1/2"', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Pipe die set- 3/4"', 'Pipe die set- 3/4"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Pipe die set- 1"', 'Pipe die set- 1"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Pipe Cutter', 'Pipe Cutter', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Pipe Wrench 12"', 'Pipe Wrench 12"', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Lathe Machine "SHIVA"', 'Lathe Machine "SHIVA"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Lathe Machine "KENA" with attachment -4''', 'Lathe Machine "KENA" with attachment -4''', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Lathe Machine "PARAS" with  Turret attachment', 'Lathe Machine "PARAS" with  Turret attachment', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Lathe Machine "KIRLOSHKER" with attachment', 'Lathe Machine "KIRLOSHKER" with attachment', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hacksaw  Machine', 'Hacksaw  Machine', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Flexible Shaft Grinder "Rajlaxmi"', 'Flexible Shaft Grinder "Rajlaxmi"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Drilling Machine "KRP"', 'Drilling Machine "KRP"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Bench Grinder "PANCHAL"', 'Bench Grinder "PANCHAL"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hydraulic Cylindrical Grinder "SHARDA"', 'Hydraulic Cylindrical Grinder "SHARDA"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Shapping Machine "Run Up "', 'Shapping Machine "Run Up "', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Milling Machine "MANFORD"', 'Milling Machine "MANFORD"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Radial Drill Machine "KMT"', 'Radial Drill Machine "KMT"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Ele.Angle Grinder "WOLF"', 'Ele.Angle Grinder "WOLF"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Portable Ele. Blower "ELECTREX"', 'Portable Ele. Blower "ELECTREX"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Tool Cutter Grinder "SCRIPTOGRAPH"', 'Tool Cutter Grinder "SCRIPTOGRAPH"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Surface Grinder  "AMC"', 'Surface Grinder  "AMC"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Slotting Machine "SVP"', 'Slotting Machine "SVP"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Power Press "SHAILESH"', 'Power Press "SHAILESH"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Bench Grinder "SWAN" 1-Phase1', 'Bench Grinder "SWAN" 1-Phase1', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Ele. Blower "RAM VIJAY"', 'Ele. Blower "RAM VIJAY"', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Smithy Forges', 'Smithy Forges', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Mechanical Foging Hammer', 'Mechanical Foging Hammer', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Sieve shaker with sieve', 'Sieve shaker with sieve', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Sand Muller 75 kg cap.', 'Sand Muller 75 kg cap.', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Green Hardness Tester for Mold', 'Green Hardness Tester for Mold', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Sand Rammerwith Accessories', 'Sand Rammerwith Accessories', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Impect Penetration Tester', 'Impect Penetration Tester', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Co2 Gassing Accessories', 'Co2 Gassing Accessories', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Sliding Weight Scale', 'Sliding Weight Scale', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Rapid Moisture Tester', 'Rapid Moisture Tester', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Moisture Teller', 'Moisture Teller', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Rapid Sand Washer', 'Rapid Sand Washer', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Mold Strength Tester', 'Mold Strength Tester', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Wood Working Lathe (JAY MAKE)', 'Wood Working Lathe (JAY MAKE)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Disc Sander M/c (JAY MAKE)', 'Disc Sander M/c (JAY MAKE)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Chisel Mortiser (JAY MAKE)', 'Chisel Mortiser (JAY MAKE)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Shearing M/c (PERFECT MAKE)', 'Hand Shearing M/c (PERFECT MAKE)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Welding M/c 2 Ph.(ACCURATE MAKE)', 'Welding M/c 2 Ph.(ACCURATE MAKE)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Welding M/c 1 Ph (ACCURATE MAKE)', 'Welding M/c 1 Ph (ACCURATE MAKE)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Mig & Tig Welding M/c (MEMCO MAKE)', 'Mig & Tig Welding M/c (MEMCO MAKE)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Spot Welding M/c (arc)', 'Spot Welding M/c (arc)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Submerged Arc Welding Machine(Dynarc Make)', 'Submerged Arc Welding Machine(Dynarc Make)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '"Dewalt" Chopsaw 355mm (D 28700)', '"Dewalt" Chopsaw 355mm (D 28700)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Ele. Discharge Machine (ELECTRONICA MAKE)', 'Ele. Discharge Machine (ELECTRONICA MAKE)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'KVA Servo Voltage (DEVINE MAKE) Stabilizer', 'KVA Servo Voltage (DEVINE MAKE) Stabilizer', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '"Mitutoyo" Make Out Side Micrometer (0-25mm)', '"Mitutoyo" Make Out Side Micrometer (0-25mm)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'In Side Micrometer (25-50mm)', 'In Side Micrometer (25-50mm)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Depth Micrometer (0-25mm)', 'Depth Micrometer (0-25mm)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Bore Gauge with dial (10to 18)', 'Bore Gauge with dial (10to 18)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Vernier Calliper (8")', 'Vernier Calliper (8")', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Vernier Calliper (China make)', 'Vernier Calliper (China make)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '"China" Make Out Side Micrometer (0-25 mm)', '"China" Make Out Side Micrometer (0-25 mm)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Magnetic "V" Block', 'Magnetic "V" Block', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Magnetic Stand', 'Magnetic Stand', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Sprit Level (8"x2")', 'Sprit Level (8"x2")', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', '"Mitutoyo" Make Dial Indicator (0-10mm)', '"Mitutoyo" Make Dial Indicator (0-10mm)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Vernier Height Gauge (12")', 'Vernier Height Gauge (12")', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Combination Set-12"', 'Combination Set-12"', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'In Side Micrometer (5-30mm)', 'In Side Micrometer (5-30mm)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Thickness Gauge (20 Leaves)', 'Thickness Gauge (20 Leaves)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Slip Gauge (84 Pcs)', 'Slip Gauge (84 Pcs)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Surface Plate', 'Surface Plate', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Limit Plug Gauge', 'Limit Plug Gauge', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'V-Block with clamp', 'V-Block with clamp', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Centre Gauge', 'Centre Gauge', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Sheet Gauge', 'Sheet Gauge', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Screw Pitch Gauge', 'Screw Pitch Gauge', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Radius Gauge', 'Radius Gauge', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Depth Gauge', 'Depth Gauge', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Digree Protector', 'Digree Protector', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Measure Tap 15Mtr', 'Measure Tap 15Mtr', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Taparia Tester', 'Taparia Tester', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Hand Grinding Machine', 'Hand Grinding Machine', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Welding Machine', 'Welding Machine', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Ground Floor', 'Workshop', 'Belt & Disc Sander Machine', 'Belt & Disc Sander Machine', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Mechanical', 'Second Floor', 'IIPC HALL', 'Podium (Microphone Stand)', 'Podium (Microphone Stand)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 3', 'Tables', '(a) Reading Tables', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 4', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'H.V Lab', 'Tables', '(a) Reading Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Store Room 1', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'C.R No. 109', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'C.R No. 110', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.S Lab', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'C.R No 209', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'C.R No 210', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'EEE Lab', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'W/s LAB', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'MEAS Lab', 'Tables', '(a) Reading Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Micro Lab', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Store Room & Passage', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 309', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 310', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Project Lab', 'Tables', '(a) Reading Tables', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Reserch Lab', 'Tables', '(a) Reading Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Dept.Library', 'Tables', '(a) Reading Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Tables', '(a) Reading Tables', 24)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Tables', '(b) Lab. Tables', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'H.V Lab', 'Tables', '(b) Lab. Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Store Room 1', 'Tables', '(b) Lab. Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.E Lab', 'Tables', '(b) Lab. Tables', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.S Lab', 'Tables', '(b) Lab. Tables', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'EEE Lab', 'Tables', '(b) Lab. Tables', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'W/s LAB', 'Tables', '(b) Lab. Tables', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'MEAS Lab', 'Tables', '(b) Lab. Tables', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Micro Lab', 'Tables', '(b) Lab. Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Project Lab', 'Tables', '(b) Lab. Tables', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Tables', '(b) Lab. Tables', 48)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'Simulation Lab I', 'Tables', '(c) Comp. Tables', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Micro Lab', 'Tables', '(c) Comp. Tables', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Simulation LAB II', 'Tables', '(c) Comp. Tables', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Tables', '(c) Comp. Tables', 27)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'HOD Room', 'Tables', '(d) HODs Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Tables', '(d) HODs Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'HOD Room', 'Tables', '(e) Drawer Table', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 1', 'Tables', '(e) Drawer Table', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 2', 'Tables', '(e) Drawer Table', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 3', 'Tables', '(e) Drawer Table', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 4', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Tables', '(e) Drawer Table', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'H.V Lab', 'Tables', '(e) Drawer Table', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Store Room 1', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.S Lab', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Tables', '(e) Drawer Table', 21)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.E Lab', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'Simulation Lab I', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Reserch Lab', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Simulation LAB II', 'Tables', '(h) Lab Faculty Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Seminar Hall', 'Tables', '(h) Lab Faculty Table', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Tables', '(h) Lab Faculty Table', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Benches', 'Benches', 14)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'H.V Lab', 'Benches', 'Benches', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'C.R No. 109', 'Benches', 'Benches', 34)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'C.R No. 110', 'Benches', 'Benches', 31)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.E Lab', 'Benches', 'Benches', 19)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.S Lab', 'Benches', 'Benches', 20)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'C.R No 209', 'Benches', 'Benches', 35)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'C.R No 210', 'Benches', 'Benches', 31)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'EEE Lab', 'Benches', 'Benches', 14)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'W/s LAB', 'Benches', 'Benches', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'MEAS Lab', 'Benches', 'Benches', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Micro Lab', 'Benches', 'Benches', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 309', 'Benches', 'Benches', 33)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 310', 'Benches', 'Benches', 37)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'M.E -I class', 'Benches', 'Benches', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Benches', 'Benches', 393)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Reserch Lab', 'Chairs', '(a) Special For Lib', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Chairs', '(a) Special For Lib', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'HOD Room', 'Chairs', '(b) Plastic', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 1', 'Chairs', '(b) Plastic', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 2', 'Chairs', '(b) Plastic', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 3', 'Chairs', '(b) Plastic', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 4', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Chairs', '(b) Plastic', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'H.V Lab', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.E Lab', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'Simulation Lab I', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'Store Room 2', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 309', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 310', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Dept.Library', 'Chairs', '(b) Plastic', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Seminar Hall', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Chairs', '(b) Plastic', 28)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 1', 'Chairs', '(c) Net', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 3', 'Chairs', '(c) Net', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Chairs', '(c) Net', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Micro Lab', 'Chairs', '(c) Net', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Chairs', '(c) Net', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'HOD Room', 'Chairs', '(d) Visitor''s', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Chairs', '(d) Visitor''s', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'HOD Room', 'Chairs', '(e) Chair (Revolving)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 1', 'Chairs', '(e) Chair (Revolving)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 2', 'Chairs', '(e) Chair (Revolving)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 3', 'Chairs', '(e) Chair (Revolving)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 4', 'Chairs', '(e) Chair (Revolving)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'H.V Lab', 'Chairs', '(e) Chair (Revolving)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Store Room 1', 'Chairs', '(e) Chair (Revolving)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.S Lab', 'Chairs', '(e) Chair (Revolving)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'Simulation Lab I', 'Chairs', '(e) Chair (Revolving)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'Store Room 2', 'Chairs', '(e) Chair (Revolving)', 15)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Simulation LAB II', 'Chairs', '(e) Chair (Revolving)', 27)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Chairs', '(e) Chair (Revolving)', 32)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Micro Lab', 'Chairs', '(f) Chair for Computer', 13)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Dept.Library', 'Chairs', '(f) Chair for Computer', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Simulation LAB II', 'Chairs', '(f) Chair for Computer', 22)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Seminar Hall', 'Chairs', '(f) Chair for Computer', 22)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Chairs', '(f) Chair for Computer', 68)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Seminar Hall', 'Chairs', '(g) Chairs for seminar hall (3X1)', 30)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Chairs', '(g) Chairs for seminar hall (3X1)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Project Lab', 'Chairs', '(j) Cusian chair', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Reserch Lab', 'Cupboard', '(b) One Side Glass Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Dept.Library', 'Cupboard', '(b) One Side Glass Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Cupboard', '(b) One Side Glass Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'HOD Room', 'Cupboard', '(c) Big Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Cupboard', '(c) Big Steel', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'H.V Lab', 'Cupboard', '(c) Big Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.E Lab', 'Cupboard', '(c) Big Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'W/s LAB', 'Cupboard', '(c) Big Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'MEAS Lab', 'Cupboard', '(c) Big Steel', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Micro Lab', 'Cupboard', '(c) Big Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Project Lab', 'Cupboard', '(c) Big Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Reserch Lab', 'Cupboard', '(c) Big Steel', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Cupboard', '(c) Big Steel', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Reserch Lab', 'Cupboard', '(d) Small Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Dept.Library', 'Cupboard', '(d) Small Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Cupboard', '(d) Small Steel', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'HOD Room', 'Cupboard', '(g) Wooden Cupboard (Small)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 1', 'Cupboard', '(g) Wooden Cupboard (Small)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 2', 'Cupboard', '(g) Wooden Cupboard (Small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 3', 'Cupboard', '(g) Wooden Cupboard (Small)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Cupboard', '(g) Wooden Cupboard (Small)', 15)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'HOD Room', 'Wooden Racks/ Iron Racks', '(a) Wooden Racks (Big)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Store Room 1', 'Wooden Racks/ Iron Racks', '(a) Wooden Racks (Big)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Wooden Racks/ Iron Racks', '(a) Wooden Racks (Big)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Wooden Racks/ Iron Racks', '(c) Iron Racks (Two Door)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Store Room & Passage', 'Wooden Racks/ Iron Racks', '(c) Iron Racks (Two Door)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Wooden Racks/ Iron Racks', '(c) Iron Racks (Two Door)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Wooden Racks/ Iron Racks', '(d) Iron Racks(One Door)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'MEAS Lab', 'Wooden Racks/ Iron Racks', '(d) Iron Racks(One Door)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Micro Lab', 'Wooden Racks/ Iron Racks', '(d) Iron Racks(One Door)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Dept.Library', 'Wooden Racks/ Iron Racks', '(d) Iron Racks(One Door)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Wooden Racks/ Iron Racks', '(d) Iron Racks(One Door)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'C.R No. 109', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'C.R No. 110', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'C.R No 209', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'C.R No 210', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 309', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 310', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'M.E -I class', 'Class Room Platforms', 'Class Room Platforms', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Class Room Platforms', 'Class Room Platforms', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'HOD Room', 'Notice Boards', 'Notice Boards', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Staff room 3', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'E-m/c Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'H.V Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Ground Floor', 'Passage', 'Notice Boards', 'Notice Boards', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.E Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.S Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'Simulation Lab I', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'EEE Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'W/s LAB', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'MEAS Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Micro Lab', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Simulation LAB II', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'Notice Boards', 'Notice Boards', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'C.R No 209', 'White Board', 'White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'C.R No 210', 'White Board', 'White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'Store Room & Passage', 'White Board', 'White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 309', 'White Board', 'White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'C.R No 310', 'White Board', 'White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Simulation LAB II', 'White Board', 'White Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'White Board', 'White Board', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'C.R No. 109', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'C.R No. 110', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'First Floor', 'P.E Lab', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Second Floor', 'C.R No 209', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'Electrical', 'Third Floor', 'Store Room', 'White Board', '(b) Fix', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
