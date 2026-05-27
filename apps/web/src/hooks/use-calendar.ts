'use client';

import { useQuery } from '@tanstack/react-query';

import { getCalendarEvents } from '@/services/api/calendar';

export function useCalendar() {
  return useQuery({
    queryKey: ['calendar'],

    queryFn:
      getCalendarEvents,
  });
}