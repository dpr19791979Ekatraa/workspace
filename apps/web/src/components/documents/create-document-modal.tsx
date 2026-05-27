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

import { useCreateDocument } from '@/hooks/use-create-document';

export function CreateDocumentModal({
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
    useCreateDocument();

  async function onSubmit(
    data: any,
  ) {
    if (
      !data.fileUrl &&
      !data.externalUrl
    ) {
      enqueueSnackbar(
        'File URL or external URL is required',
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
        'Document uploaded successfully',
        {
          variant: 'success',
        },
      );

      reset();

      onClose();
    } catch (error) {
      enqueueSnackbar(
        'Failed to upload document',
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
        Upload Document
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
              label="File Name"
              {...register(
                'fileName',
              )}
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
              label="File URL"
              {...register(
                'fileUrl',
              )}
              fullWidth
            />

            <TextField
              label="External URL"
              {...register(
                'externalUrl',
              )}
              fullWidth
            />

            <TextField
              select
              label="Visibility"
              defaultValue="ALL_EMPLOYEES"
              {...register(
                'visibility',
              )}
              fullWidth
            >
              <MenuItem value="ALL_EMPLOYEES">
                All Employees
              </MenuItem>

              <MenuItem value="HR">
                HR
              </MenuItem>

              <MenuItem value="ADMIN">
                Admin
              </MenuItem>

              <MenuItem value="SUPER_ADMIN">
                Super Admin
              </MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Upload Document
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}