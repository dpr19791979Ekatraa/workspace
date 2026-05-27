'use client';

import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { ReimbursementDrawer } from './reimbursement-drawer';
export function ReimbursementCard({
  reimbursement,
}: {
  reimbursement: any;
}) {
    const [open, setOpen] =
  useState(false);
  return (
    <>
    <Card
  sx={{
    cursor: 'pointer',
  }}
  onClick={() =>
    setOpen(true)
  }
>
      <CardContent
        sx={{
          p: 2,
          '&:last-child': {
            pb: 2,
          },
        }}
      >
        <Stack spacing={2}>
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

          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
            >
              {
                reimbursement.title
              }
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {
                reimbursement.description
              }
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Submitted by{' '}
            {
              reimbursement.user
                ?.name
            }
          </Typography>
        </Stack>
      </CardContent>
    </Card>
    <ReimbursementDrawer
  open={open}
  reimbursement={
    reimbursement
  }
  onClose={() =>
    setOpen(false)
  }
/>
</>
  );
}