import { CollectionConfig } from 'payload/types';

const Patients: CollectionConfig = {
  slug: 'patients',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'tenantId', type: 'text', required: true, admin: { readOnly: true } },
    { name: 'dob', type: 'date' },
  ],
  hooks: {
    beforeChange: [require('../../src/lib/hooks').setTenantFromReq],
  },
};

export default Patients;
