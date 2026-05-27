import { apiClient } from './client';

export async function getCalendarEvents() {
  const response =
    await apiClient.get(
      '/calender/upcoming',
    );

  return response.data;
}