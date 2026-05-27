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

import { useCreateUser } from '@/hooks/use-create-user';

export function CreateUserModal({
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

  const createUserMutation =
    useCreateUser();

  async function onSubmit(
    data: any,
  ) {
    try {
      await createUserMutation.mutateAsync(
        data,
      );

      reset();

      onClose();
    } catch (error) {
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
        Create Employee
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
              label="Name"
              {...register('name')}
              fullWidth
            />

            <TextField
              label="Email"
              {...register('email')}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              {...register(
                'password',
              )}
              fullWidth
            />

            <TextField
              label="Department"
              {...register(
                'department',
              )}
              fullWidth
            />

            <TextField
              label="Designation"
              {...register(
                'designation',
              )}
              fullWidth
            />

            <TextField
              select
              label="Role"
              defaultValue="EMPLOYEE"
              {...register('role')}
              fullWidth
            >
              <MenuItem value="EMPLOYEE">
                Employee
              </MenuItem>

              <MenuItem value="HR">
                HR
              </MenuItem>

              <MenuItem value="ADMIN">
                Admin
              </MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Create Employee
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}