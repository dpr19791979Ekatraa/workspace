import { apiClient } from './client';

export async function getMeetings() {
  const response =
    await apiClient.get(
      '/meetings',
    );

  return response.data;
}

export async function createMeeting(
  data: any,
) {
  const response =
    await apiClient.post(
      '/meetings',
      data,
    );

  return response.data;
}