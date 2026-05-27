'use client';

import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

const activities = [
  {
    user: 'Dimple',
    action:
      'completed onboarding task',
  },

  {
    user: 'Rahul',
    action:
      'submitted leave request',
  },

  {
    user: 'Ananya',
    action:
      'created new project',
  },
];

export function ActivityFeed() {
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
          p: 2.5,
          '&:last-child': {
            pb: 2.5,
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent:
              'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            Activity Feed
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Real-time updates
          </Typography>
        </Stack>

        <Stack divider={<Divider />}>
          {activities.map(
            (activity, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                sx={{
                  py: 1.75,
                  alignItems: 'center',
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    borderRadius: 2,
                    bgcolor: 'rgba(255,106,0,0.16)',
                    color: '#FF6A00',
                    fontWeight: 700,
                  }}
                >
                  {activity.user[0]}
                </Avatar>

                <Stack>
                  <Typography
                    sx={{ fontWeight: 600 }}
                  >
                    {activity.user}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {activity.action}
                  </Typography>
                </Stack>
              </Stack>
            ),
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}