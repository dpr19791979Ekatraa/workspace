'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateReimbursement } from '@/services/api/reimbursements';

export function useUpdateReimbursement() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,

      data,
    }: any) =>
      updateReimbursement(
        id,
        data,
      ),

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