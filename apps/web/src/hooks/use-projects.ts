'use client';

import { useQuery } from '@tanstack/react-query';

import { getProjects } from '@/services/api/projects';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],

    queryFn: getProjects,
  });
}