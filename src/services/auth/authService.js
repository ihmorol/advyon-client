import { useApiMutation, useApiSWR } from '../_shared/apiClient';

const BASE = '/auth';

// GET current user/profile
export const useCurrentUser = () => useApiSWR(`${BASE}/me`);

// POST /auth/sync - ensure user exists after Clerk login/webhook
export const useSyncUser = () => useApiMutation(`${BASE}/sync`, 'post');

// POST /auth/onboard - complete onboarding with role/profile
export const useOnboardUser = () => useApiMutation(`${BASE}/onboard`, 'post');

// PATCH /auth/me - update profile
export const useUpdateProfile = () => useApiMutation(`${BASE}/me`, 'patch');

/**
 * Usage example:
 *
 * const { data, error, isLoading, mutate } = useCurrentUser();
 * const { trigger: syncUser } = useSyncUser();
 * const { trigger: onboard } = useOnboardUser();
 * const { trigger: updateProfile } = useUpdateProfile();
 */

