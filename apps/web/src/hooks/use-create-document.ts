'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createDocument } from '@/services/api/documents';

export function useCreateDocument() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      createDocument,

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            'documents',
          ],
        },
      );
    },
  });
}