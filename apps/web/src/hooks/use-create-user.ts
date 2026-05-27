'use client';

import { useMutation } from '@tanstack/react-query';

import { createUser } from '@/services/api/users';

export function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
  });
}