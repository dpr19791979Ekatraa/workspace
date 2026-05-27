'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import {
  useForm,
} from 'react-hook-form';

import { enqueueSnackbar } from 'notistack';

import { useCreateReimbursement } from '@/hooks/use-create-reimbursement';

export function CreateReimbursementModal({
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
    useCreateReimbursement();

  async function onSubmit(
    data: any,
  ) {
    try {
      await createMutation.mutateAsync(
        data,
      );

      enqueueSnackbar(
        'Reimbursement submitted',
        {
          variant: 'success',
        },
      );

      reset();

      onClose();
    } catch (error) {
      enqueueSnackbar(
        'Failed to submit reimbursement',
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
        Submit Reimbursement
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
              label="Amount"
              type="number"
              {...register(
                'amount',
              )}
              fullWidth
            />

            <Button
              variant="outlined"
              component="label"
            >
              Upload Receipt

              <input
                hidden
                type="file"
              />
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Submit Request
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}