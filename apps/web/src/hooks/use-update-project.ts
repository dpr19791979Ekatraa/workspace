'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateProject } from '@/services/api/projects';

export function useUpdateProject() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: any) =>
      updateProject(
        id,
        data,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['projects'],
        },
      );
    },
  });
}