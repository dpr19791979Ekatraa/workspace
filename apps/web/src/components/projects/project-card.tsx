'use client';

import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

export function ProjectCard({
  project,
  onClick,
}: {
  project: any;

  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={
                project.status
              }
              size="small"
              color={
                project.status ===
                'COMPLETED'
                  ? 'success'
                  : project.status ===
                    'ON_HOLD'
                  ? 'warning'
                  : 'primary'
              }
            />

            <Chip
              label={
                project.priority
              }
              size="small"
              color={
                project.priority ===
                'CRITICAL'
                  ? 'error'
                  : project.priority ===
                    'HIGH'
                  ? 'warning'
                  : 'default'
              }
            />
          </Stack>

          <Stack spacing={1}>
            <Typography
              fontWeight={700}
            >
              {project.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {
                project.description
              }
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Due:{' '}
            {project.dueDate
              ? new Date(
                  project.dueDate,
                ).toLocaleDateString()
              : 'N/A'}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}