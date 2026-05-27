'use client';

import { useQuery } from '@tanstack/react-query';

import { getReimbursements } from '@/services/api/reimbursements';

export function useReimbursements() {
  return useQuery({
    queryKey: [
      'reimbursements',
    ],

    queryFn:
      getReimbursements,
  });
}