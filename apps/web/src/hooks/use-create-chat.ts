'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createDirectChat } from '@/services/api/chat';

export function useCreateChat() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      createDirectChat,

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['chats'],
        },
      );
    },
  });
}