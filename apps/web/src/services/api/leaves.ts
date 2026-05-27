import { apiClient } from './client';

export async function getLeaves() {
  const response =
    await apiClient.get(
      '/leaves',
    );

  return response.data;
}

export async function createLeave(
  data: any,
) {
  const response =
    await apiClient.post(
      '/leaves',
      data,
    );

  return response.data;
}

export async function updateLeave(
  id: string,

  data: any,
) {
  const response =
    await apiClient.patch(
      `/leaves/${id}`,
      data,
    );

  return response.data;
}