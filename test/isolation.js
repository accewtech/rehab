// test/isolation.js — simple isolation test using tenantScope
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { filterByTenant } = require('../src/tenantScope');

const seedsPath = path.join(process.cwd(), 'seeds', 'seeds.json');
if (!fs.existsSync(seedsPath)) {
  console.error('seeds not found, run `node scripts/seed.js` before this test');
  process.exit(2);
}
const seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf8'));

// sanity
assert(Array.isArray(seeds.patients), 'expected patients array');

const aPatients = filterByTenant(seeds.patients, 'tenant-A');
const bPatients = filterByTenant(seeds.patients, 'tenant-B');

// tenant A should not include tenant B patients
assert(aPatients.length === 2, 'tenant A should have 2 patients');
assert(bPatients.length === 1, 'tenant B should have 1 patient');

// verify isolation: no overlap
const aIds = new Set(aPatients.map(p => p.id));
for (const p of bPatients) {
  assert(!aIds.has(p.id), 'tenant B patient found in tenant A set');
}
console.log('isolation test OK');
