'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createLeave } from '@/services/api/leaves';

export function useCreateLeave() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createLeave,

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['leaves'],
        },
      );
    },
  });
}