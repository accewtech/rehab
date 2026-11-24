import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
let client: MongoClient | null = null;

export async function getClient() {
  if (!uri) throw new Error('MONGODB_URI not set');
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export async function closeClient() {
  if (client) await client.close();
}
