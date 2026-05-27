'use client';
import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { AppShell } from '@/components/layout/app-shell';

import { AnalyticsCard } from '@/components/dashboard/analytics';

import { ActivityFeed } from '@/components/dashboard/activity-feed';

import { UpcomingMeetings } from '@/components/dashboard/upcoming-meetings';

import { CalendarView } from '@/components/calendar/calendar-view';

import { useDashboard } from '@/hooks/use-dashboard';
import { useCalendar } from '@/hooks/use-calendar';

export default function Home() {
  const { data } = useDashboard();
  const { data: calendarData } = useCalendar();

  const formattedEvents =
    (calendarData || []).map(
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
          <Typography
            variant="h4"
          >
            Welcome back 👋
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ maxWidth: 680 }}
          >
            Run your global team from a single polished workspace, with a refreshed international design and the same trusted backend workflows.
          </Typography>

          <Typography
            color="text.secondary"
          >
            Here’s what’s happening across your workspace today.
          </Typography>
        </Stack>

        <Grid
          container
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <AnalyticsCard
              title="Employees"
              value={
  data?.metrics?.totalUsers
    ?.toString() || '0'
}
              subtitle="+12% this month"
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <AnalyticsCard
              title="Projects"
              value={
  data?.metrics?.activeProjects
    ?.toString() || '0'
}
              subtitle="+4 active"
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <AnalyticsCard
              title="Tasks"
              value={
  data?.metrics?.totalTasks
    ?.toString() || '0'
}
              subtitle="34 pending"
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <AnalyticsCard
              title="Meetings"
              value="9"
              subtitle="Today"
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{ alignItems: 'stretch' }}
        >
          <Grid
            size={{
              xs: 12,
              lg: 7.5,
            }}
          >
            <Stack spacing={3}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
              >
                Team Calendar
              </Typography>

              <CalendarView
                events={formattedEvents}
              />
            </Stack>
          </Grid>

          <Grid
            size={{
              xs: 12,
              lg: 4.5,
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{ height: '100%' }}
            >
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 12,
                }}
                sx={{ display: 'flex' }}
              >
                <UpcomingMeetings />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 12,
                }}
                sx={{ display: 'flex' }}
              >
                <ActivityFeed />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </AppShell>
  );
}