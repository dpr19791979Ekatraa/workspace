'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateLeave } from '@/services/api/leaves';

export function useUpdateLeave() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,

      data,
    }: any) =>
      updateLeave(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['leaves'],
        },
      );
    },
  });
}