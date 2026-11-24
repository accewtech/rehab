import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'roles', type: 'array', fields: [{ name: 'role', type: 'text' }], admin: { readOnly: false } },
    { name: 'tenantId', type: 'text', admin: { readOnly: true } },
  ],
  hooks: {
    beforeChange: [
      // enforce tenant from authenticated user and protect roles/tenant for non-admins
      require('../../src/lib/hooks').setTenantFromReq,
      require('../../src/lib/hooks').protectRolesAndTenant,
    ],
  },
};

export default Users;
