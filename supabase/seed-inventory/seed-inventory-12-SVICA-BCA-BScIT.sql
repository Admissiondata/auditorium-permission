-- Seed data for 350 inventory records (E&C ... SVICA-BCA-BScIT).
-- Run this file in the Supabase SQL editor. Safe to re-run.
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Third Floor', 'Store', 'Clip on Meter', 'Clip on Meter', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Ground Floor', 'Internet /Maintenance room', 'crimping tool', 'Crimping tool', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Third Floor', 'Store', 'crimping tool', 'Crimping tool', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Ground Floor', 'Internet /Maintenance room', 'Power cable (APPROX.)', 'Power cable (APPROX.)', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Third Floor', 'Store', 'Power cable (APPROX.)', 'Power cable (APPROX.)', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Ground Floor', 'Internet /Maintenance room', 'sata/ide cable', 'Sata/ide cable', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Third Floor', 'Store', 'sata/ide cable', 'Sata/ide cable', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Ground Floor', 'Internet /Maintenance room', '24 hrs internet facility UPS', '24 hrs internet facility UPS', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Ground Floor', 'Computer Lab-1', '24 hrs internet facility UPS', '24 hrs internet facility UPS', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'E&C', 'Third Floor', 'Store', '24 hrs internet facility UPS', '24 hrs internet facility UPS', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tables', '(a) Reading Tables', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tables', '(a) Reading Tables', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tables', '(c) Comp. Tables', 36)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tables', '(c) Comp. Tables', 36)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tables', '(d) HODs Table', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tables', '(d) HODs Table', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tables', '(e) Drawer Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tables', '(k) Meeting Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tables', '(k) Meeting Tables', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tables', '(l) Office Tables', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tables', '(l) Office Tables', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Benches', 'Benches', 74)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Benches', 'Benches', 74)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Chairs', '(b) Plastic', 14)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Chairs', '(b) Plastic', 14)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Chairs', '(e) Chair (Revolving)', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Chairs', '(e) Chair (Revolving)', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Chairs', '(f) Chair for Computer', 68)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Chairs', '(f) Chair for Computer', 68)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Chairs', '(j) Cusian chair', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Chairs', '(j) Cusian chair', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Cupboard', '(c) Big Steel', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Cupboard', '(c) Big Steel', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Cupboard', '(g) Wooden Cupboard (Small)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Cupboard', '(g) Wooden Cupboard (Small)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Wooden Racks/ Iron Racks', '(c) Iron Racks (Two Door)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Wooden Racks/ Iron Racks', '(c) Iron Racks (Two Door)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Wooden Racks/ Iron Racks', '(d) Iron Racks(One Door)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Wooden Racks/ Iron Racks', '(d) Iron Racks(One Door)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Notice Boards', 'Notice Boards', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Notice Boards', 'Notice Boards', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'White Board', 'White Board', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'White Board', 'White Board', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'College Water Jung (Liter Specify)', 'Big', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'College Water Jung (Liter Specify)', 'Big', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Dustbin (BIG)', 'Small', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Dustbin (BIG)', 'Small', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Extension Board', 'Extension Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Extension Board', 'Extension Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tripod', 'Tripod', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tripod', 'Tripod', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Sofa', 'Sofa', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Sofa', 'Sofa', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Curtains', 'Plastic curtain', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Curtains', 'Plastic curtain', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Mirror in Toilet (big)', 'Mirror in Toilet (Small)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Mirror in Toilet (big)', 'Mirror in Toilet (Small)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Vision Mission Board', 'Vision Mission Board', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Fire Stand With "3" Bucket (Set)', 'Fire Stand With "3" Bucket (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Fire Stand With "3" Bucket (Set)', 'Fire Stand With "3" Bucket (Set)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Fire Extinguisher', 'Fire Extinguisher', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Fire Extinguisher', 'Fire Extinguisher', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Fans', '(a) Ceiling', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Fans', '(a) Ceiling', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Fans', '(c) Wall Mount Fan', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Fans', '(c) Wall Mount Fan', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Fans', '(d) Exhaust Fans', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Fans', '(d) Exhaust Fans', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tube Lights', 'Tube Lights', 36)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tube Lights', 'Tube Lights', 36)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tube Lights', 'Bulbs', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tube Lights', 'Bulbs', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Air Conditioner', 'Window', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Air Conditioner', 'Window', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Air Conditioner', 'Split', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Air Conditioner', 'Split', 10)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Telephone', 'Telephone', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Telephone', 'Telephone', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Computer (Set)', 'Computer (Set)', 72)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Computer (Set)', 'Computer (Set)', 72)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Printer (Specify Make)', 'Laser', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Printer (Specify Make)', 'Laser', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Printer (Specify Make)', 'All in One', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Printer (Specify Make)', 'All in One', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Scanner (Specify Make :       )', 'Scanner (Specify Make :       )', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Scanner (Specify Make :       )', 'Scanner (Specify Make :       )', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'CPP (Specify Walt)', 'CPP (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'CPP (Specify Walt)', 'CPP (Specify Walt)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Cameras (CCTV)', 'Cameras (CCTV)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Cameras (CCTV)', 'Cameras (CCTV)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Cameras (CCTV)', 'Night vision Camera', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Head Phones', 'Head Phones', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Head Phones', 'Head Phones', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Television', 'LED', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Television', 'LED', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Television', 'LCD', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'DVR ( Camera)', 'DVR ( Camera)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'DVR ( Camera)', 'DVR ( Camera)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Switch', '8 Ports', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Switch', '8 Ports', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Switch', '24 Ports', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Switch', '24 Ports', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Internet Modem', 'Internet Modem', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Internet Modem', 'Internet Modem', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Computer Speaker', 'Computer Speaker', 21)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Computer Speaker', 'Computer Speaker', 21)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Halogen Light', 'Halogen Light', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Halogen Light', 'Halogen Light', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Speaker', 'Speaker', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Speaker', 'Speaker', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Water Glass', 'Water Glass', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Water Glass', 'Water Glass', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tea Cup', 'Tea Cup', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tea Cup', 'Tea Cup', 12)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Dinner Plate (Steel)', 'Dinner Plate (Steel)', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Dinner Plate (Steel)', 'Dinner Plate (Steel)', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Napkin', 'Napkin', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Napkin', 'Napkin', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Tray (Big)', 'Tray (Small)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Tray (Big)', 'Tray (Small)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Thermous', 'Thermous', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Thermous', 'Thermous', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Ground Floor', 'General', 'Boimatrix Attendance Machine', 'Boimatrix Attendance Machine', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'MCA', 'Third Floor', 'General', 'Boimatrix Attendance Machine', 'Boimatrix Attendance Machine', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-103', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-302', 'Tables', '(a) Reading Tables', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Staff Room', 'Tables', '(a) Reading Tables', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Tables', '(a) Reading Tables', 11)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Tables', '(c) Comp. Tables', 36)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Tables', '(c) Comp. Tables', 41)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Tables', '(c) Comp. Tables', 77)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Tables', '(d) HODs Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Tables', '(d) HODs Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Staff Room', 'Tables', '(e) Drawer Table', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Tables', '(e) Drawer Table', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Tables', '(e) Drawer Table', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Tables', '(f) Projector Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Tables', '(f) Projector Table', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Tables', '(f) Projector Table', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'Benches', 'Benches', 42)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-103', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'Benches', 'Benches', 40)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-302', 'Benches', 'Benches', 22)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Benches', 'Benches', 304)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-103', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Staff Room', 'Chairs', '(b) Plastic', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Chairs', '(b) Plastic', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Chairs', '(b) Plastic', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Chairs', '(b) Plastic', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'Chairs', '(b) Plastic', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-302', 'Chairs', '(b) Plastic', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Staff Room', 'Chairs', '(b) Plastic', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Chairs', '(b) Plastic', 34)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Chairs', '(d) Visitor''s', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Chairs', '(d) Visitor''s', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Staff Room', 'Chairs', '(e) Chair (Revolving)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Chairs', '(e) Chair (Revolving)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Chairs', '(e) Chair (Revolving)', 13)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Chairs', '(f) Chair for Computer', 92)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Chairs', '(f) Chair for Computer', 45)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Chairs', '(f) Chair for Computer', 137)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Store Room', 'Cupboard', '(g) Wooden Cupboard (Small)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Cupboard', '(g) Wooden Cupboard (Small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Cupboard', '(g) Wooden Cupboard (Small)', 9)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Staff Room', 'Cupboard', '(g) Wooden Cupboard (Small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Cupboard', '(g) Wooden Cupboard (Small)', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Staff Room', 'Wooden Racks/ Iron Racks', '(c) Iron Racks (Two Door)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Store Room', 'Wooden Racks/ Iron Racks', '(c) Iron Racks (Two Door)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Staff Room', 'Wooden Racks/ Iron Racks', '(c) Iron Racks (Two Door)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Wooden Racks/ Iron Racks', '(c) Iron Racks (Two Door)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-103', 'Class Room Platforms', 'Class Room Platforms', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'Class Room Platforms', 'Class Room Platforms', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Class Room Platforms', 'Class Room Platforms', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Lobby', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Notice Boards', 'Notice Boards', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Notice Boards', 'Notice Boards', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Lobby', 'Notice Boards', 'Notice Boards', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Notice Boards', 'Notice Boards', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-302', 'Notice Boards', 'Notice Boards', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Notice Boards', 'Notice Boards', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-103', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'White Board', '(b) Fix', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'White Board', '(b) Fix', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Staff Room', 'College Water Jung (Liter Specify)', 'Big', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'College Water Jung (Liter Specify)', 'Big', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'College Water Jung (Liter Specify)', 'Big', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Stools for Computers', 'Stools for Computers', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Stools for Computers', 'Stools for Computers', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Stools for Computers', 'Stools for Computers', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'Dustbin (BIG)', 'Dustbin (BIG)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'Dustbin (BIG)', 'Dustbin (BIG)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Dustbin (BIG)', 'Dustbin (BIG)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Dustbin (BIG)', 'Dustbin (BIG)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Dustbin (BIG)', 'Dustbin (BIG)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Dustbin (BIG)', 'Dustbin (BIG)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Extension Board', 'Extension Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Extension Board', 'Extension Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Green Board', 'Green Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Green Board', 'Green Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'Green Board', 'Green Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Green Board', 'Green Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'Green Board', 'Green Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-302', 'Green Board', 'Green Board', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Green Board', 'Green Board', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Curtains', 'Plastic curtain', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Curtains', 'Plastic curtain', 29)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Curtains', 'Plastic curtain', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Curtains', 'Plastic curtain', 37)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Staff Room', 'Storage Cabinet', 'Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Storage Cabinet', 'Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Storage Cabinet', 'Steel', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Storage Cabinet', 'Steel', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Toilet', 'Mirror in Toilet (big)', 'Mirror in Toilet (Small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Toilet', 'Mirror in Toilet (big)', 'Mirror in Toilet (Small)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Mirror in Toilet (big)', 'Mirror in Toilet (Small)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Lobby', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Fire Extinguisher', 'Fire Extinguisher', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Lobby', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Lobby', 'Fire Extinguisher', 'Fire Extinguisher', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Fire Extinguisher', 'Fire Extinguisher', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'Fans', '(a) Ceiling', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'Fans', '(a) Ceiling', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-103', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Fans', '(a) Ceiling', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Staff Room', 'Fans', '(a) Ceiling', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Store Room', 'Fans', '(a) Ceiling', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Fans', '(a) Ceiling', 17)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Fans', '(a) Ceiling', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'Fans', '(a) Ceiling', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-302', 'Fans', '(a) Ceiling', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Staff Room', 'Fans', '(a) Ceiling', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Fans', '(a) Ceiling', 98)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Toilet', 'Fans', '(d) Exhaust Fans', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Toilet', 'Fans', '(d) Exhaust Fans', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Fans', '(d) Exhaust Fans', 8)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Staff Room', 'Faculty cubical', 'Faculty cubical', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Faculty cubical', 'Faculty cubical', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Staff Room', 'Faculty cubical', 'Faculty cubical', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Faculty cubical', 'Faculty cubical', 18)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'Tube Lights', 'Tube Lights (pl)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'Tube Lights', 'Tube Lights (pl)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-103', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Tube Lights', 'Tube Lights (pl)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Staff Room', 'Tube Lights', 'Tube Lights (pl)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Store Room', 'Tube Lights', 'Tube Lights (pl)', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Tube Lights', 'Tube Lights (pl)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'Tube Lights', 'Tube Lights (pl)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'Tube Lights', 'Tube Lights (pl)', 6)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Tube Lights', 'Tube Lights (pl)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-302', 'Tube Lights', 'Tube Lights (pl)', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Staff Room', 'Tube Lights', 'Tube Lights (pl)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Tube Lights', 'Tube Lights (pl)', 78)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Lobby', 'Tube Lights', 'Bulbs', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Tube Lights', 'Bulbs', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'Tube Lights', 'Bulbs', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Lobby', 'Tube Lights', 'Bulbs', 4)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Tube Lights', 'Bulbs', 21)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'Tube Lights', 'Bulbs', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Tube Lights', 'Bulbs', 38)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Air Conditioner', 'Split', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'Air Conditioner', 'Split', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Air Conditioner', 'Split', 15)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'LCD Projector', 'LCD Projector', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'LCD Projector', 'LCD Projector', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Computer (Set)', 'Computer (Set)', 92)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Computer (Set)', 'Computer (Set)', 45)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Computer (Set)', 'Computer (Set)', 137)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Printer (Specify Make)', 'All in One', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Printer (Specify Make)', 'All in One', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'UPS (Specify Walt)', 'UPS (Specify Walt)', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Servo stabilizer (7 kva)', 'Servo stabilizer (7 kva)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Servo stabilizer (7 kva)', 'Servo stabilizer (7 kva)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Pen Drive', 'Pen Drive', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Pen Drive', 'Pen Drive', 3)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-101', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-102', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-103', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Class Room S-104', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Store Room', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'First Floor', 'Lobby', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Cameras (CCTV)', 'Cameras (CCTV)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-201', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Class Room S-202', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Lobby', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Cameras (CCTV)', 'Cameras (CCTV)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-301', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Class Room S-302', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Lobby', 'Cameras (CCTV)', 'Cameras (CCTV)', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Cameras (CCTV)', 'Cameras (CCTV)', 16)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Staff Room', 'DVR ( Camera)', 'DVR ( Camera)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'DVR ( Camera)', 'DVR ( Camera)', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Switch', '24 Ports', 5)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Computer Lab-2', 'Switch', '24 Ports', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Switch', '24 Ports', 7)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Computer Speaker', 'Computer Speaker', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Computer Speaker', 'Computer Speaker', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Music System', 'Music System', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Music System', 'Music System', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Microphone', 'Microphone', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Third Floor', 'Toilet', 'Microphone', 'Microphone', 1)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('SVIT Vasad', 'SVICA_BCA_BScIT', 'Second Floor', 'Computer Lab-1', 'Speaker', 'Speaker', 2)
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;
