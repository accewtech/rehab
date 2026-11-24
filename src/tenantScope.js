// tenantScope.js — simple helper to enforce tenant scoping for tests
function filterByTenant(records, tenantId) {
  return records.filter(r => String(r.tenantId) === String(tenantId));
}

module.exports = { filterByTenant };
