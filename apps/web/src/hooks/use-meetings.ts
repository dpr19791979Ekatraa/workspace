'use client';

import { useQuery } from '@tanstack/react-query';

import { getMeetings } from '@/services/api/meetings';

export function useMeetings() {
  return useQuery({
    queryKey: ['meetings'],

    queryFn: getMeetings,
  });
}