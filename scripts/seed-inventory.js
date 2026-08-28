const fs = require('node:fs');
const path = require('node:path');
const XLSX = require('xlsx');

const sourcePath = process.argv[2] || path.join(__dirname, '..', 'Inventory.xlsx');
const outputPath = process.argv[3] || path.join(__dirname, '..', 'supabase', 'seed-inventory.sql');

const workbook = XLSX.readFile(sourcePath);

function parseQuantity(cell) {
  const text = String(cell).trim();
  if (!text) return 0;
  const tokens = text.match(/\d+/g);
  if (!tokens) return 0;
  const quantity = tokens.reduce((sum, token) => sum + Number(token), 0);
  return quantity > 0 ? quantity : 0;
}

function floorForSheet(rows) {
  let floorRow = -1;
  let best = 0;
  for (let i = 0; i < Math.min(9, rows.length); i++) {
    const count = (rows[i] || []).filter((cell) => /floor|basement/i.test(String(cell))).length;
    if (count > best) {
      best = count;
      floorRow = i;
    }
  }
  return floorRow;
}

function parseSheet(name) {
  const sheet = workbook.Sheets[name];
  if (!sheet || !sheet['!ref']) return [];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  const floorRow = floorForSheet(rows);
  if (floorRow < 0) return [];

  const floorByColumn = [];
  let currentFloor = '';
  for (let column = 0; column < 100; column++) {
    const value = String((rows[floorRow] || [])[column] || '').trim();
    if (value) currentFloor = value;
    floorByColumn[column] = currentFloor;
  }

  const floorColumns = [];
  for (let column = 0; column < 100; column++) {
    if (/floor|basement/i.test(floorByColumn[column])) floorColumns.push(column);
  }

  const roomRow = floorRow + 1;
  const roomByColumn = {};
  let lastRoom = 'General';
  for (const column of floorColumns) {
    const room = String((rows[roomRow] || [])[column] || '').trim();
    if (room) lastRoom = room;
    roomByColumn[column] = room || lastRoom;
  }

  const records = [];
  let category = '';
  for (let rowIndex = roomRow + 1; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex] || [];
    const serial = String(row[0] || '').trim();
    const label = String(row[1] || '').trim();
    if (!serial && !label) continue;
    if (/^\d+$/.test(serial) && label && !/^\(/.test(label)) category = label;
    if (!label) continue;
    const itemName = label.charAt(0).toUpperCase() + label.slice(1);
    for (const column of floorColumns) {
      const quantity = parseQuantity(row[column]);
      if (!quantity) continue;
      records.push({
        college: 'SVIT Vasad',
        department: name,
        floor: floorByColumn[column],
        office: roomByColumn[column],
        item_category: category,
        item_name: itemName,
        quantity
      });
    }
  }
  return records;
}

const recordsByKey = new Map();
const stats = {};
for (const name of workbook.SheetNames) {
  const sheetRecords = parseSheet(name);
  stats[name] = sheetRecords.length;
  for (const record of sheetRecords) {
    const key = [record.college, record.department, record.floor, record.office, record.item_category, record.item_name].join('|');
    const existing = recordsByKey.get(key);
    if (existing) existing.quantity += record.quantity;
    else recordsByKey.set(key, record);
  }
}

const totalRaw = Object.values(stats).reduce((sum, count) => sum + count, 0);
const totalUnique = recordsByKey.size;
console.log('Sheets parsed:');
for (const [name, count] of Object.entries(stats)) console.log(`  ${name.padEnd(22)} ${String(count).padStart(4)}`);
console.log(`Raw records:   ${totalRaw}`);
console.log(`Unique records (aggregated): ${totalUnique}`);

const escape = (value) => String(value).replace(/'/g, "''");
const recordLines = (header) => ({
  header,
  lines: []
});

const buildInsertLines = (records) => {
  const lines = [];
  for (const record of records) {
    lines.push(`insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
values ('${escape(record.college)}', '${escape(record.department)}', '${escape(record.floor)}', '${escape(record.office)}', '${escape(record.item_category)}', '${escape(record.item_name)}', ${record.quantity})
on conflict (college, department, floor, office, item_category, item_name) do update set quantity = public.inventory.quantity;`);
  }
  return lines;
};

const fullHeader = '-- Seed data generated from Inventory.xlsx by scripts/seed-inventory.js\n-- For the Supabase SQL editor use the smaller files in supabase/seed-inventory/ (the full file may exceed the editor limit).';

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fullHeader + '\n' + buildInsertLines([...recordsByKey.values()]).join('\n') + '\n');
console.log(`Wrote ${outputPath} (${recordsByKey.size} rows)`);

const chunkDir = path.join(path.dirname(outputPath), 'seed-inventory');
fs.mkdirSync(chunkDir, { recursive: true });
fs.readdirSync(chunkDir).forEach((file) => fs.unlinkSync(path.join(chunkDir, file)));
const allRecords = [...recordsByKey.values()];
const maxPerFile = 350;
let chunkIndex = 1;
for (let start = 0; start < allRecords.length; start += maxPerFile) {
  const chunk = allRecords.slice(start, start + maxPerFile);
  const firstDept = chunk[0].department.replace(/[^a-zA-Z0-9]+/g, '-').slice(0, 24);
  const lastDept = chunk[chunk.length - 1].department.replace(/[^a-zA-Z0-9]+/g, '-').slice(0, 24);
  const chunkName = `seed-inventory-${String(chunkIndex).padStart(2, '0')}${firstDept === lastDept ? '' : '-' + lastDept}`;
  const header = `-- Seed data for ${chunk.length} inventory records (${chunk[0].department} ... ${lastDept}).\n-- Run this file in the Supabase SQL editor. Safe to re-run.`;
  fs.writeFileSync(path.join(chunkDir, `${chunkName}.sql`), header + '\n' + buildInsertLines(chunk).join('\n') + '\n');
  chunkIndex += 1;
}
console.log(`Wrote ${chunkIndex - 1} chunked SQL files to ${chunkDir}`);

const tsvPath = path.join(path.dirname(outputPath), 'inventory.tsv');
const tsvEscape = (value) => String(value).replace(/\t/g, ' ').replace(/\r?\n/g, ' ').replace(/\r/g, ' ');
const tsvRows = ['college\tdepartment\tfloor\toffice\titem_category\titem_name\tquantity'];
for (const record of recordsByKey.values()) {
  tsvRows.push([record.college, record.department, record.floor, record.office, record.item_category, record.item_name, record.quantity].map(tsvEscape).join('\t'));
}
fs.writeFileSync(tsvPath, tsvRows.join('\n') + '\n');
console.log(`Wrote ${tsvPath} (${recordsByKey.size} data rows)`);

const psqlPath = path.join(path.dirname(outputPath), 'import-inventory.psql');
fs.writeFileSync(psqlPath, String.raw`\echo Importing inventory seed from inventory.tsv...
create temp table inventory_stage (
  college text not null default 'SVIT Vasad',
  department text not null,
  floor text not null default '',
  office text not null default '',
  item_category text not null default '',
  item_name text not null,
  quantity integer not null default 0
) on commit drop;

\copy inventory_stage (college, department, floor, office, item_category, item_name, quantity) from 'inventory.tsv' with (format csv, header true, delimiter E'\t');

insert into public.inventory (college, department, floor, office, item_category, item_name, quantity)
select college, department, floor, office, item_category, item_name, quantity
from inventory_stage
on conflict (college, department, floor, office, item_category, item_name) do nothing;

\echo Done importing inventory.
` + '\n');
console.log(`Wrote ${psqlPath} (run from the supabase/ folder with psql).`);