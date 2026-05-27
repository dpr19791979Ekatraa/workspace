'use client';

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

export function AnalyticsCard({
  title,
  value,
  subtitle,
}: {
  title: string;

  value: string;

  subtitle: string;
}) {
  return (
    <Card>
      <Box
        sx={{
          height: 6,
          background: 'linear-gradient(90deg, #FF6A00, #FF9500)',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
        }}
      />

      <CardContent>
        <Stack spacing={1.5}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h3"
            fontWeight={700}
          >
            {value}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#FF6A00',
            }}
          >
            {subtitle}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}