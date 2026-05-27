'use client';

import {
  Avatar,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

export function ProfileHeader({
  profile,
}: {
  profile: any;
}) {
  return (
    <Stack
      direction={{
        xs: 'column',
        md: 'row',
      }}
      spacing={3}
      alignItems={{
        xs: 'flex-start',
        md: 'center',
      }}
    >
      <Avatar
        sx={{
          width: 88,
          height: 88,
          fontSize: 32,
        }}
      >
        {
          profile?.name?.[0]
        }
      </Avatar>

      <Stack spacing={1}>
        <Typography
          variant="h4"
          fontWeight={700}
        >
          {profile?.name}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
        >
          <Chip
            label={
              profile?.role
            }
            size="small"
          />

          <Chip
            label={
              profile?.department ||
              'Department'
            }
            size="small"
          />

          <Chip
            label={
              profile?.designation ||
              'Designation'
            }
            size="small"
          />
        </Stack>

        <Typography
          color="text.secondary"
        >
          {profile?.email}
        </Typography>
      </Stack>
    </Stack>
  );
}