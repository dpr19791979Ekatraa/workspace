'use client';

import { useQuery } from '@tanstack/react-query';

import { getDashboardAnalytics } from '@/services/api/dashboard';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],

    queryFn:
      getDashboardAnalytics,
  });
}