'use client';

import { useQuery } from '@tanstack/react-query';

import { useUser } from '@clerk/nextjs';

import { apiClient } from '@/services/api/client';

async function getCurrentUser() {
  const response =
    await apiClient.get(
      '/auth/me',
    );

  return response.data;
}

export function useCurrentUser() {
  const { isLoaded, user } = useUser();

  return useQuery({
    queryKey: [
      'current-user',
    ],

    queryFn:
      getCurrentUser,

    enabled:
      isLoaded && Boolean(user),

    retry: false,
  });
}