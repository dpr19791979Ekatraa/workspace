'use client';

import {
  Stack,
  Typography,
} from '@mui/material';

import { AppShell } from '@/components/layout/app-shell';

import { CalendarView } from '@/components/calendar/calendar-view';

import { useCalendar } from '@/hooks/use-calendar';

export default function CalendarPage() {
  const { data } =
    useCalendar();

  const formattedEvents =
    (data || []).map(
      (event: any) => ({
        title: event.title,

        start: new Date(
          event.startDate ||
            event.eventDate,
        ),

        end: new Date(
          event.endDate ||
            event.eventDate ||
            event.startDate,
        ),
        eventType:
          event.eventType,
        isSpecialDay: Boolean(
          event.isSpecialDay ||
            event.isSpecial ||
            event.eventType,
        ),
        allDay: true,
      }),
    );

  return (
    <AppShell>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h5">
            Organization Calendar
          </Typography>

          <Typography color="text.secondary">
            Meetings, birthdays, anniversaries, and operational schedules.
          </Typography>
        </Stack>

        <CalendarView
          events={
            formattedEvents
          }
        />
      </Stack>
    </AppShell>
  );
}