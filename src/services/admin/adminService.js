import { buildUrl, useApiMutation, useApiSWR } from '../_shared/apiClient';

const BASE = '/admin/users';

export const useAdminUsers = (params) => useApiSWR(buildUrl(BASE, params));

export const useAdminUser = (id) => useApiSWR(id ? `${BASE}/${id}` : null);

export const useUpdateUserRole = (id) =>
  useApiMutation(`${BASE}/${id}/role`, 'patch');

export const useUpdateUserStatus = (id) =>
  useApiMutation(`${BASE}/${id}/status`, 'patch');

export const useDeleteAdminUser = (id) =>
  useApiMutation(`${BASE}/${id}`, 'delete');

/**
 * Usage example:
 *
 * const { data: adminUsers } = useAdminUsers({ page, limit, role, status });
 * const { data: adminUser } = useAdminUser(userId);
 * const { trigger: updateRole } = useUpdateUserRole(userId);
 * const { trigger: updateStatus } = useUpdateUserStatus(userId);
 * const { trigger: deleteUser } = useDeleteAdminUser(userId);
 */
