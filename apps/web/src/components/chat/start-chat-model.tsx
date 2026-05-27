'use client';

import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import { enqueueSnackbar } from 'notistack';

import { useUsers } from '@/hooks/use-users';

import { useCreateChat } from '@/hooks/use-create-chat';

export function StartChatModal({
  open,

  onClose,

  onCreated,
}: {
  open: boolean;

  onClose: () => void;

  onCreated: (
    chat: any,
  ) => void;
}) {
  const { data } =
    useUsers();

  const createMutation =
    useCreateChat();

  async function handleCreate(
    userId: string,
  ) {
    try {
      const chat =
        await createMutation.mutateAsync(
          userId,
        );

      enqueueSnackbar(
        'Conversation started',
        {
          variant: 'success',
        },
      );

      onCreated(chat);

      onClose();
    } catch (error) {
      enqueueSnackbar(
        'Failed to start chat',
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
        Start Conversation
      </DialogTitle>

      <DialogContent>
        <Stack spacing={1}>
  {!data?.length && (
    <Typography
      color="text.secondary"
      textAlign="center"
      py={4}
    >
      No employees found
    </Typography>
  )}
          {(data || []).map(
            (user: any) => (
              <Box
                key={user.id}
                onClick={() =>
                  handleCreate(
                    user.id,
                  )
                }
                sx={{
                  p: 2,

                  borderRadius: 3,

                  cursor: 'pointer',

                  '&:hover': {
                    background:
                      'rgba(255,255,255,0.04)',
                  },
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Avatar>
                    {
                      user.name?.[0]
                    }
                  </Avatar>

                  <Stack>
                    <Typography fontWeight={600}>
                      {
                        user.name
                      }
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {
                        user.email
                      }
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            ),
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}