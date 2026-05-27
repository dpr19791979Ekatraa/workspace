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

import { useCreateTask } from '@/hooks/use-create-task';

import { useUsers } from '@/hooks/use-users';
import { enqueueSnackbar } from 'notistack';

export function CreateTaskModal({
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

  const createTaskMutation =
    useCreateTask();

  const { data: users } =
    useUsers();

  async function onSubmit(
    data: any,
  ) {
    try {
      await createTaskMutation.mutateAsync(
        data,
      );

      reset();

enqueueSnackbar(
  'Task created successfully',
  {
    variant: 'success',
  },
);

onClose();
    } catch (error) {
      enqueueSnackbar(
  'Failed to create task',
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
        Create Task
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
              label="Title"
              {...register('title')}
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
            </TextField>

            <TextField
              select
              label="Status"
              defaultValue="TODO"
              {...register(
                'status',
              )}
              fullWidth
            >
              <MenuItem value="TODO">
                Todo
              </MenuItem>

              <MenuItem value="IN_PROGRESS">
                In Progress
              </MenuItem>

              <MenuItem value="REVIEW">
                Review
              </MenuItem>

              <MenuItem value="COMPLETED">
                Completed
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

            <TextField
              select
              label="Assign Employee"
              {...register(
                'assignedToId',
              )}
              fullWidth
            >
              {users?.map(
                (user: any) => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </MenuItem>
                ),
              )}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Create Task
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}