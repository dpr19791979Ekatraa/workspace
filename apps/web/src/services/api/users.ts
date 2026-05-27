import { apiClient } from './client';

export async function getUsers() {
  const response =
    await apiClient.get('/users');

  return response.data;
}

export async function createUser(
  data: any,
) {
  const response =
    await apiClient.post(
      '/users',
      data,
    );

  return response.data;
}