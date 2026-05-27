'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateTask } from '@/services/api/tasks';

export function useUpdateTask() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,

      data,
    }: any) =>
      updateTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['tasks'],
        },
      );
    },
  });
}