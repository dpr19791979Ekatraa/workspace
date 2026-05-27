import { apiClient } from './client';

export async function getTasks() {
  const response =
    await apiClient.get('/tasks');

  return response.data;
}

export async function createTask(
  data: any,
) {
  const response =
    await apiClient.post(
      '/tasks',
      data,
    );

  return response.data;
}

export async function updateTask(
  id: string,

  data: any,
) {
  const response =
    await apiClient.patch(
      `/tasks/${id}`,
      data,
    );

  return response.data;
}