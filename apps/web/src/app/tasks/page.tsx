'use client';

import {
  Box,
  Stack,
  Typography,
} from '@mui/material';

import { AppShell } from '@/components/layout/app-shell';

import { TaskColumn } from '@/components/tasks/task-column';

import { useTasks } from '@/hooks/use-tasks';
import { Button } from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { useState } from 'react';

import { CreateTaskModal } from '@/components/tasks/create-task-modal';
import { PageHeader } from '@/components/shared/page-header';

export default function TasksPage() {
  const { data } =
    useTasks();

  const tasks =
    data || [];

  const todoTasks =
    tasks.filter(
      (task: any) =>
        task.status === 'TODO',
    );

  const progressTasks =
    tasks.filter(
      (task: any) =>
        task.status ===
        'IN_PROGRESS',
    );

  const reviewTasks =
    tasks.filter(
      (task: any) =>
        task.status ===
        'REVIEW',
    );

  const completedTasks =
    tasks.filter(
      (task: any) =>
        task.status ===
        'COMPLETED',
    );
    const [open, setOpen] =
  useState(false);

  return (
    <AppShell>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="Execution"
          title="Tasks Workspace"
          subtitle="Manage operational workflows with clearer columns, tighter rhythm, and quick creation actions."
          action={
            <Button
              variant="contained"
              startIcon={
                <AddRoundedIcon />
              }
              onClick={() =>
                setOpen(true)
              }
            >
              Create Task
            </Button>
          }
        />

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2.5,
            p: {
              xs: 1.25,
              md: 1.75,
            },
            borderRadius: 3,
            border: theme =>
              `1px solid ${theme.palette.divider}`,
            background: theme =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.02)'
                : 'rgba(255,255,255,0.82)',
          }}
        >
          <TaskColumn
            title="Todo"
            tasks={todoTasks}
          />

          <TaskColumn
            title="In Progress"
            tasks={
              progressTasks
            }
          />

          <TaskColumn
            title="Review"
            tasks={reviewTasks}
          />

          <TaskColumn
            title="Completed"
            tasks={
              completedTasks
            }
          />
        </Box>
        <CreateTaskModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />
      </Stack>
    </AppShell>
  );
}