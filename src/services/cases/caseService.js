import { buildUrl, useApiMutation, useApiSWR } from '../_shared/apiClient';

const BASE = '/cases';

export const useCases = (params) => useApiSWR(buildUrl(BASE, params));

export const useCase = (caseId) =>
  useApiSWR(caseId ? `${BASE}/${caseId}` : null);

export const useCreateCase = () => useApiMutation(BASE, 'post');

export const useUpdateCase = (caseId) =>
  useApiMutation(`${BASE}/${caseId}`, 'put');

export const useDeleteCase = (caseId) =>
  useApiMutation(`${BASE}/${caseId}`, 'delete');

/**
 * Usage example:
 *
 * const { data: cases } = useCases({ search, status, page, limit });
 * const { data: oneCase } = useCase(caseId);
 * const { trigger: createCase } = useCreateCase();
 * const { trigger: updateCase } = useUpdateCase(caseId);
 * const { trigger: deleteCase } = useDeleteCase(caseId);
 */
