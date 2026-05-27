import { apiClient } from './client';

export async function getDashboardAnalytics() {
  const response =
    await apiClient.get(
      '/dashboard/employee',
    );

  return response.data;
}