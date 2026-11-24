import { CollectionConfig } from 'payload/types';

const Patients: CollectionConfig = {
  slug: 'patients',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'tenantId', type: 'text', required: true },
    { name: 'dob', type: 'date' },
  ],
};

export default Patients;
