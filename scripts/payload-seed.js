// Seeds Payload collections directly via MongoDB. Requires MONGODB_URI env var.
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not provided. Skipping seed.');
    process.exit(3);
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  // tenants
  const tenants = db.collection('payload_tenants');
  await tenants.deleteMany({});
  await tenants.insertMany([
    { name: 'Tenant A', slug: 'tenant-a' },
    { name: 'Tenant B', slug: 'tenant-b' },
  ]);

  // users
  const users = db.collection('payload_users');
  await users.deleteMany({});
  await users.insertMany([
    { firstName: 'Admin', lastName: 'A', roles: [{ role: 'superadmin' }], tenantId: 'tenant-a' },
    { firstName: 'Pro', lastName: 'B', roles: [{ role: 'professional' }], tenantId: 'tenant-b' },
  ]);

  // patients
  const patients = db.collection('payload_patients');
  await patients.deleteMany({});
  await patients.insertMany([
    { name: 'Alice', tenantId: 'tenant-a' },
    { name: 'Bob', tenantId: 'tenant-a' },
    { name: 'Carol', tenantId: 'tenant-b' },
  ]);

  console.log('Payload seed completed');
  await client.close();
}

main().catch(err => { console.error(err); process.exit(1); });
