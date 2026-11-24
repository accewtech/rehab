import { CollectionConfig } from 'payload/types';

const Tenants: CollectionConfig = {
  slug: 'tenants',
  labels: { singular: 'Tenant', plural: 'Tenants' },
  access: {
    // only superadmin can create/list tenants in this minimal setup
    create: ({ req }) => !!(req && req.user && Array.isArray(req.user.roles) && req.user.roles.includes('superadmin')),
    read: ({ req }) => !!(req && req.user && Array.isArray(req.user.roles) && req.user.roles.includes('superadmin')),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
  ],
};

export default Tenants;
