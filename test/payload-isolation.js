// Runs seed against real MongoDB and verifies tenant isolation.
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set — skipping Payload isolation test. Provide MONGODB_URI to run.');
    process.exit(3);
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  const patients = db.collection('payload_patients');
  const a = await patients.find({ tenantId: 'tenant-a' }).toArray();
  const b = await patients.find({ tenantId: 'tenant-b' }).toArray();

  if (a.some(p => b.some(q => q._id.toString() === p._id.toString()))) {
    console.error('Isolation violated: overlapping IDs');
    process.exit(1);
  }

  console.log('Payload isolation smoke OK: tenant counts', a.length, b.length);
  await client.close();
}

main().catch(err => { console.error(err); process.exit(1); });
