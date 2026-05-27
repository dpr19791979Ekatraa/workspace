'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createReimbursement } from '@/services/api/reimbursements';

export function useCreateReimbursement() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      createReimbursement,

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            'reimbursements',
          ],
        },
      );
    },
  });
}