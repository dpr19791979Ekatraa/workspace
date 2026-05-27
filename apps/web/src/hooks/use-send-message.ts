'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { sendMessage } from '@/services/api/chat';

export function useSendMessage() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      sendMessage,

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['chats'],
        },
      );
    },
  });
}