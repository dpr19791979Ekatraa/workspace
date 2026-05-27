import { apiClient } from './client';

export async function getProjects() {
  const response =
    await apiClient.get(
      '/projects',
    );

  return response.data;
}

export async function createProject(
  data: any,
) {
  const response =
    await apiClient.post(
      '/projects',
      data,
    );

  return response.data;
}

export async function updateProject(
  id: string,
  data: any,
) {
  const response =
    await apiClient.patch(
      `/projects/${id}`,
      data,
    );

  return response.data;
}