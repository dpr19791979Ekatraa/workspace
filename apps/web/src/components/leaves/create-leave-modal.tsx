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

import { useCreateLeave } from '@/hooks/use-create-leave';

export function CreateLeaveModal({
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
    useCreateLeave();

  async function onSubmit(
    data: any,
  ) {
    try {
      await createMutation.mutateAsync(
        data,
      );

      enqueueSnackbar(
        'Leave applied successfully',
        {
          variant: 'success',
        },
      );

      reset();

      onClose();
    } catch (error) {
      enqueueSnackbar(
        'Failed to apply leave',
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
        Apply Leave
      </DialogTitle>

      <DialogContent>
        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
        >
          <Stack
            spacing={3}
            sx={{ mt: 2 }}
          >
            <TextField
              select
              label="Leave Type"
              defaultValue="CASUAL"
              {...register(
                'leaveType',
              )}
              fullWidth
            >
              <MenuItem value="CASUAL">
                Casual
              </MenuItem>

              <MenuItem value="SICK">
                Sick
              </MenuItem>

              <MenuItem value="EARNED">
                Earned
              </MenuItem>

              <MenuItem value="MATERNITY">
                Maternity
              </MenuItem>

              <MenuItem value="PATERNITY">
                Paternity
              </MenuItem>
            </TextField>

            <TextField
              label="Reason"
              multiline
              rows={4}
              {...register(
                'reason',
              )}
              fullWidth
            />

            <TextField
              type="date"
              label="Start Date"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register(
                'startDate',
              )}
              fullWidth
            />

            <TextField
              type="date"
              label="End Date"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register(
                'endDate',
              )}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Apply Leave
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}