'use client';

import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from '@mui/material';

import { enqueueSnackbar } from 'notistack';

import { useUpdateReimbursement } from '@/hooks/use-update-reimbursement';

export function ReimbursementDrawer({
  open,

  onClose,

  reimbursement,
}: {
  open: boolean;

  onClose: () => void;

  reimbursement: any;
}) {
  const updateMutation =
    useUpdateReimbursement();

  if (!reimbursement)
    return null;

  async function handleUpdate(
    status: string,
  ) {
    try {
      await updateMutation.mutateAsync(
        {
          id:
            reimbursement.id,

          data: {
            status,
          },
        },
      );

      enqueueSnackbar(
        `Reimbursement ${status.toLowerCase()}`,
        {
          variant:
            'success',
        },
      );

      onClose();
    } catch (error) {
      enqueueSnackbar(
        'Action failed',
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
            sm: 420,
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
                label={
                  reimbursement.status
                }
                size="small"
              />

              <Typography
                fontWeight={700}
              >
                ₹
                {
                  reimbursement.amount
                }
              </Typography>
            </Stack>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {
                reimbursement.title
              }
            </Typography>

            <Typography
              color="text.secondary"
            >
              {
                reimbursement.description
              }
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Submitted By
            </Typography>

            <Typography
              fontWeight={600}
            >
              {
                reimbursement.user
                  ?.name
              }
            </Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() =>
                handleUpdate(
                  'APPROVED',
                )
              }
            >
              Approve
            </Button>

            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() =>
                handleUpdate(
                  'REJECTED',
                )
              }
            >
              Reject
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}