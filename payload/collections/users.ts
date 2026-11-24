import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'roles', type: 'array', fields: [{ name: 'role', type: 'text' }] },
    { name: 'tenantId', type: 'text' },
  ],
};

export default Users;
