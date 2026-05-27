'use client';

import {
  Grid,
} from '@mui/material';

import { MeetingCard } from './meeting-card';

export function MeetingsGrid({
  meetings,
}: {
  meetings: any[];
}) {
  return (
    <Grid
      container
      spacing={2}
    >
      {meetings.map(
        meeting => (
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
            key={meeting.id}
          >
            <MeetingCard
              meeting={meeting}
            />
          </Grid>
        ),
      )}
    </Grid>
  );
}