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

import { useUpdateProject } from '@/hooks/use-update-project';

export function CompleteProjectModal({
  open,

  onClose,

  project,
}: {
  open: boolean;

  onClose: () => void;

  project: any;
}) {
  const {
    register,

    handleSubmit,
  } = useForm();

  const updateMutation =
    useUpdateProject();

  async function onSubmit(
    data: any,
  ) {
    if (
      !data.completionFile
        ?.length
    ) {
      enqueueSnackbar(
        'Proof upload is required',
        {
          variant: 'error',
        },
      );

      return;
    }

    try {
      await updateMutation.mutateAsync(
        {
          id: project.id,

          data: {
            status:
              'COMPLETED',

            completionNote:
              data.completionNote,

            completionFile:
              data
                .completionFile[0]
                .name,
          },
        },
      );

      enqueueSnackbar(
        'Project completed successfully',
        {
          variant: 'success',
        },
      );

      onClose();
    } catch (error) {
      enqueueSnackbar(
        'Failed to complete project',
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
        Complete Project
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
              label="Completion Description"
              multiline
              rows={4}
              {...register(
                'completionNote',
                {
                  required: true,
                },
              )}
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
                {...register(
                  'completionFile',
                  {
                    required: true,
                  },
                )}
              />
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Mark Completed
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}