import { buildConfig } from 'payload/config';
import tenants from './collections/tenants';
import users from './collections/users';
import patients from './collections/patients';

export default buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  admin: { user: 'users' },
  collections: [tenants, users, patients],
});
