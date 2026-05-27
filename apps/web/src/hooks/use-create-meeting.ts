'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createMeeting } from '@/services/api/meetings';

export function useCreateMeeting() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      createMeeting,

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            'meetings',
          ],
        },
      );
    },
  });
}