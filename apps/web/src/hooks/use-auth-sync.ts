'use client';

import { useEffect } from 'react';

import { useUser } from '@clerk/nextjs';

import { apiClient } from '@/services/api/client';

export function useAuthSync() {
  const { user } =
    useUser();

  useEffect(() => {
    if (!user) return;

    apiClient.post(
      '/auth/sync',
      {
        clerkUserId:
          user.id,

        email:
          user.primaryEmailAddress
            ?.emailAddress,

        name:
          user.fullName,
      },
    );
  }, [user]);
}