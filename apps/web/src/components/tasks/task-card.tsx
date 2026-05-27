'use client';

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { TaskDetailsDrawer } from './task-details-drawer';

export function TaskCard({
  task,
}: {
  task: any;
}) {
  const [
  open,

  setOpen,
] = useState(false);
  return (
    <>
    <Card
    onClick={() =>
  setOpen(true)
}
      sx={{
        cursor: 'pointer',

        transition: '0.2s',

        '&:hover': {
          transform:
            'translateY(-2px)',
        },
      }}
    >
      <CardContent
  sx={{
    p: 2,
    '&:last-child': {
      pb: 2,
    },
  }}
>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={task.priority}
              size="small"
              sx={{
                background:
                  'rgba(255,106,0,0.12)',

                color: '#FF6A00',
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {task.dueDate
                ? new Date(
                    task.dueDate,
                  ).toLocaleDateString()
                : 'No date'}
            </Typography>
          </Stack>

          <Typography
            fontWeight={700}
          >
            {task.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {task.description}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 32,

                height: 32,
              }}
            >
              {task.assignedTo
                ?.name?.[0] || 'U'}
            </Avatar>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {task.assignedTo
                ?.name || 'Unassigned'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>

    <TaskDetailsDrawer
  open={open}
  task={task}
  onClose={() =>
    setOpen(false)
  }
/>
</>
    
  );
}