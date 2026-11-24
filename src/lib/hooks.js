// Hooks used by Payload collections to enforce tenant scoping and protect role/tenant fields
module.exports.setTenantFromReq = async ({ req, data }) => {
  // If request has an authenticated user with tenantId, enforce it
  try {
    if (req && req.user && req.user.tenantId) {
      data.tenantId = req.user.tenantId;
    }
  } catch (e) {
    // noop
  }
  return data;
};

module.exports.protectRolesAndTenant = async ({ req, data, originalDoc }) => {
  // Prevent elevation of roles or tenant change by non-admins
  try {
    const isAdmin = req && req.user && Array.isArray(req.user.roles) && req.user.roles.includes('superadmin');
    if (!isAdmin && originalDoc) {
      // preserve roles and tenantId from originalDoc
      if (originalDoc.roles) data.roles = originalDoc.roles;
      if (originalDoc.tenantId) data.tenantId = originalDoc.tenantId;
    }
  } catch (e) {}
  return data;
};
