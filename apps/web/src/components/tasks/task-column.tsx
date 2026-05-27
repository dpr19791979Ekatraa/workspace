'use client';

import {
  Stack,
  Typography,
} from '@mui/material';

import { TaskCard } from './task-card';

export function TaskColumn({
  title,

  tasks,
}: {
  title: string;

  tasks: any[];
}) {
  return (
    <Stack
      spacing={2}
      sx={{
        minWidth: 320,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
      >
        {title}
      </Typography>

      <Stack spacing={2}>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </Stack>
    </Stack>
  );
}