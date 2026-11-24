import { CollectionConfig } from 'payload/types';

const Tenants: CollectionConfig = {
  slug: 'tenants',
  labels: { singular: 'Tenant', plural: 'Tenants' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
  ],
};

export default Tenants;
