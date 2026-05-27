import { apiClient } from './client';

export async function getChats() {
  const response =
    await apiClient.get(
      '/chat',
    );

  return response.data;
}
export async function createDirectChat(
  userId: string,
) {
  const response =
    await apiClient.post(
      '/chat/direct',
      {
        userId,
      },
    );

  return response.data;
}
export async function sendMessage(
  data: {
    chatId: string;

    content: string;
  },
) {
  const response =
    await apiClient.post(
      '/chat/message',
      data,
    );

  return response.data;
}