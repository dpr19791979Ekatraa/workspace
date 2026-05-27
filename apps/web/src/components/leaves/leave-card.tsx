'use client';

import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

export function LeaveCard({
  leave,
}: {
  leave: any;
}) {
  return (
    <Card>
      <CardContent
        sx={{
          p: 2,
          '&:last-child': {
            pb: 2,
          },
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Chip
              label={leave.status}
              size="small"
            />

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {leave.leaveType}
            </Typography>
          </Stack>

          <Typography
            sx={{ fontWeight: 700 }}
          >
            {leave.reason}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {new Date(
              leave.startDate,
            ).toLocaleDateString()}
            {' - '}
            {new Date(
              leave.endDate,
            ).toLocaleDateString()}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {leave.employee?.name}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}