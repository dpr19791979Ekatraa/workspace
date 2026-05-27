'use client';

import { useQuery } from '@tanstack/react-query';

import { getLeaves } from '@/services/api/leaves';

export function useLeaves() {
  return useQuery({
    queryKey: ['leaves'],

    queryFn: getLeaves,
  });
}