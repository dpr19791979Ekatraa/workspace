import { apiClient } from './client';

export async function getProfile() {
  const response =
    await apiClient.get(
      '/auth/me',
    );

  return response.data;
}

export async function updateProfile(
  data: any,
) {
  const response =
    await apiClient.patch(
      `/users/${data.id}`,
      data,
    );

  return response.data;
}