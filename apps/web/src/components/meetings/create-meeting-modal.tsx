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

import { useUsers } from '@/hooks/use-users';

import { useCreateMeeting } from '@/hooks/use-create-meeting';

export function CreateMeetingModal({
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

  const { data: users } =
    useUsers();

  const createMeetingMutation =
    useCreateMeeting();

  async function onSubmit(
    data: any,
  ) {
    try {
      await createMeetingMutation.mutateAsync(
        {
          ...data,

          participantIds: [
            data.participantId,
          ],
        },
      );

      enqueueSnackbar(
        'Meeting scheduled successfully',
        {
          variant: 'success',
        },
      );

      reset();

      onClose();
    } catch (error) {
      enqueueSnackbar(
        'Failed to schedule meeting',
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
        Schedule Meeting
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
              label="Meeting Title"
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
              label="Meeting Type"
              defaultValue="TEAM"
              {...register('type')}
              fullWidth
            >
              <MenuItem value="TEAM">
                Team
              </MenuItem>

              <MenuItem value="HR">
                HR
              </MenuItem>

              <MenuItem value="CLIENT">
                Client
              </MenuItem>

              <MenuItem value="REVIEW">
                Review
              </MenuItem>
            </TextField>

            <TextField
              type="datetime-local"
              label="Start Time"
              InputLabelProps={{
                shrink: true,
              }}
              {...register(
                'startTime',
              )}
              fullWidth
            />

            <TextField
              type="datetime-local"
              label="End Time"
              InputLabelProps={{
                shrink: true,
              }}
              {...register(
                'endTime',
              )}
              fullWidth
            />

            <TextField
              select
              label="Participant"
              {...register(
                'participantId',
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
              Schedule Meeting
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}