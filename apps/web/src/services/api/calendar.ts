import { apiClient } from './client';

export async function getCalendarEvents() {
  const response =
    await apiClient.get(
      '/calendar/upcoming',
    );

  return response.data;
}