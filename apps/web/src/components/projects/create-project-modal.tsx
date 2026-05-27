'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import {
  useForm,
} from 'react-hook-form';

import { enqueueSnackbar } from 'notistack';

import { useCreateProject } from '@/hooks/use-create-project';

export function CreateProjectModal({
  open,

  onClose,
}: {
  open: boolean;

  onClose: () => void;
}) {
  const {
    register,

    handleSubmit,

    reset,
  } = useForm();

  const createMutation =
    useCreateProject();

  async function onSubmit(
    data: any,
  ) {
    if (
      data.status ===
      'COMPLETED'
    ) {
      enqueueSnackbar(
        'Projects cannot be created as completed',
        {
          variant: 'error',
        },
      );

      return;
    }

    try {
      await createMutation.mutateAsync(
        data,
      );

      enqueueSnackbar(
        'Project created successfully',
        {
          variant: 'success',
        },
      );

      reset();

      onClose();
    } catch (error) {
      enqueueSnackbar(
        'Failed to create project',
        {
          variant: 'error',
        },
      );

      console.error(error);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Create Project
      </DialogTitle>

      <DialogContent>
        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
        >
          <Stack
            spacing={3}
            mt={2}
          >
            <TextField
              label="Project Name"
              {...register('name')}
              fullWidth
            />

            <TextField
              label="Description"
              multiline
              rows={4}
              {...register(
                'description',
              )}
              fullWidth
            />

            <TextField
              select
              label="Status"
              defaultValue="PLANNING"
              {...register(
                'status',
              )}
              fullWidth
            >
              <MenuItem value="PLANNING">
                Planning
              </MenuItem>

              <MenuItem value="ACTIVE">
                Active
              </MenuItem>

              <MenuItem value="ON_HOLD">
                On Hold
              </MenuItem>

              <MenuItem value="COMPLETED">
                Completed
              </MenuItem>
            </TextField>

            <TextField
              select
              label="Priority"
              defaultValue="MEDIUM"
              {...register(
                'priority',
              )}
              fullWidth
            >
              <MenuItem value="LOW">
                Low
              </MenuItem>

              <MenuItem value="MEDIUM">
                Medium
              </MenuItem>

              <MenuItem value="HIGH">
                High
              </MenuItem>

              <MenuItem value="CRITICAL">
                Critical
              </MenuItem>
            </TextField>

            <TextField
              type="date"
              label="Due Date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register(
                'dueDate',
              )}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Create Project
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}