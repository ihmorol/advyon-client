import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import api from '../../lib/api/api';

const toQueryString = (params) => {
  if (!params) return '';
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    search.append(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : '';
};

export const buildUrl = (path, params) => `${path}${toQueryString(params)}`;

export const fetcher = async (url) => {
  const res = await api.get(url);
  return res.data;
};

export const mutationFetcher =
  (method) =>
  async (url, { arg }) => {
    const res = await api[method](url, arg);
    return res.data;
  };

export const defaultSWRConfig = {
  revalidateOnFocus: true,
  dedupingInterval: 3000,
  shouldRetryOnError: false,
};

export const useApiSWR = (key, config) =>
  useSWR(key, fetcher, { ...defaultSWRConfig, ...config });

export const useApiMutation = (key, method, config) =>
  useSWRMutation(key, mutationFetcher(method), config);
