'use client';

import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

const meetings = [
  {
    title: 'Product Strategy',

    time: '10:00 AM',
  },

  {
    title: 'Design Review',

    time: '2:30 PM',
  },
];

export function UpcomingMeetings() {
  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 3,
        border: theme =>
          `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          p: 2.5,
          '&:last-child': {
            pb: 2.5,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2.5,
            fontWeight: 700,
          }}
        >
          Upcoming Meetings
        </Typography>

        <Stack spacing={2}>
          {meetings.map(
            (meeting, index) => (
              <Stack
                key={index}
                direction="row"
                sx={{
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  px: 1.25,
                  py: 1,
                  borderRadius: 2,
                  border: theme =>
                    `1px solid ${theme.palette.divider}`,
                  backgroundColor:
                    'rgba(148, 163, 184, 0.05)',
                }}
              >
                <Stack>
                  <Typography
                    sx={{ fontWeight: 600 }}
                  >
                    {meeting.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Today
                  </Typography>
                </Stack>

                <Chip
                  label={meeting.time}
                  size="small"
                  sx={{
                    background:
                      'rgba(255,106,0,0.15)',

                    color: '#FF6A00',
                    fontWeight: 700,
                  }}
                />
              </Stack>
            ),
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}