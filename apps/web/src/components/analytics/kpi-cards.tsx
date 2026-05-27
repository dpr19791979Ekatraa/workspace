'use client';

import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

export function KpiCards({
  analytics,
}: {
  analytics: any;
}) {
  const items = [
    {
      label: 'Total Tasks',
      value:
        analytics?.totalTasks ||
        0,
    },

    {
      label:
        'Completed Tasks',
      value:
        analytics?.completedTasks ||
        0,
    },

    {
      label:
        'Total Meetings',
      value:
        analytics?.totalMeetings ||
        0,
    },

    {
      label:
        'Pending Reimbursements',
      value:
        analytics?.pendingReimbursements ||
        0,
    },
  ];

  return (
    <Grid
      container
      spacing={2}
    >
      {items.map(item => (
        <Grid
          key={item.label}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Card>
            <CardContent>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.label}
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  {item.value}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}