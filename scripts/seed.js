// scripts/seed.js — write seed JSON files for two tenants
const fs = require('fs');
const path = require('path');
const seeds = {
  tenants: [
    { id: 'tenant-A', name: 'Tenant A' },
    { id: 'tenant-B', name: 'Tenant B' }
  ],
  patients: [
    { id: 'p1', tenantId: 'tenant-A', name: 'Alice' },
    { id: 'p2', tenantId: 'tenant-A', name: 'Bob' },
    { id: 'p3', tenantId: 'tenant-B', name: 'Carol' }
  ]
};

const outDir = path.join(process.cwd(), 'seeds');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
fs.writeFileSync(path.join(outDir, 'seeds.json'), JSON.stringify(seeds, null, 2));
console.log('seeds written to', path.join(outDir, 'seeds.json'));
