'use client';

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { uploadFile } from '@/services/api/uploads';

import { useUpdateTask } from '@/hooks/use-update-task';

import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export function TaskDetailsDrawer({
  open,

  onClose,

  task,
}: {
  open: boolean;

  onClose: () => void;

  task: any;
}) {
  const [
    completionNote,

    setCompletionNote,
  ] = useState('');
  const [
  file,

  setFile,
] = useState<File | null>(
  null,
);

  if (!task) return null;
const updateTaskMutation =
  useUpdateTask();
  async function handleComplete() {
  try {
    let uploadedFile = '';

    if (file) {
      const uploadResponse =
        await uploadFile(file);

      uploadedFile =
        uploadResponse.url;
    }

    await updateTaskMutation.mutateAsync(
      {
        id: task.id,

        data: {
          status:
            'COMPLETED',

          completionNote,

          completionFile:
            uploadedFile,
        },
      },
    );
    enqueueSnackbar(
  'Task completed successfully',
  {
    variant: 'success',
  },
);

    onClose();
  } catch (error) {
    enqueueSnackbar(
  'Failed to complete task',
  {
    variant: 'error',
  },
);

console.error(error);
  }
}
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: {
            xs: '100vw',
            sm: 460,
          },

          height: '100%',

          background:
            '#0A0A0A',

          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
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
                variant="body2"
                color="text.secondary"
              >
                {task.status}
              </Typography>
            </Stack>

            <Typography
              variant="h5"
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
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Assigned Employee
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar>
                {task.assignedTo
                  ?.name?.[0] || 'U'}
              </Avatar>

              <Stack>
                <Typography
                  fontWeight={600}
                >
                  {task.assignedTo
                    ?.name ||
                    'Unassigned'}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {task.assignedTo
                    ?.email}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Typography
              variant="h6"
            >
              Completion Submission
            </Typography>

            <TextField
              label="Completion Note"
              multiline
              rows={5}
              value={
                completionNote
              }
              onChange={e =>
                setCompletionNote(
                  e.target.value,
                )
              }
              fullWidth
            />

            <Button
              variant="outlined"
              component="label"
            >
              Upload Proof

              <input
  hidden
  type="file"
  onChange={e =>
    setFile(
      e.target.files?.[0] ||
        null,
    )
  }
/>
            </Button>

            <Button
  variant="contained"
  size="large"
  onClick={handleComplete}
>
  Mark As Completed
</Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}