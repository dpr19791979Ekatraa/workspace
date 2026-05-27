'use client';

import { useQuery } from '@tanstack/react-query';

import { getChats } from '@/services/api/chat';

export function useChats() {
  return useQuery({
    queryKey: ['chats'],

    queryFn: getChats,
  });
}