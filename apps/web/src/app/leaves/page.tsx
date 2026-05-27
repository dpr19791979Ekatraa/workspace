'use client';

import {
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { useState } from 'react';

import { AppShell } from '@/components/layout/app-shell';

import { LeaveCard } from '@/components/leaves/leave-card';

import { CreateLeaveModal } from '@/components/leaves/create-leave-modal';

import { useLeaves } from '@/hooks/use-leaves';

export default function LeavesPage() {
  const { data } =
    useLeaves();

  const [open, setOpen] =
    useState(false);

  return (
    <AppShell>
      <Stack spacing={4}>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          justifyContent="space-between"
          alignItems={{
            xs: 'flex-start',
            md: 'center',
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h5">
              Leave Management
            </Typography>

            <Typography color="text.secondary">
              Manage employee leave workflows and approvals.
            </Typography>
          </Stack>

          <Button
            variant="contained"
            startIcon={
              <AddRoundedIcon />
            }
            onClick={() =>
              setOpen(true)
            }
          >
            Apply Leave
          </Button>
        </Stack>

        <Grid
          container
          spacing={2}
        >
          {(data || []).map(
            (leave: any) => (
              <Grid
                key={leave.id}
                size={{
                  xs: 12,
                  md: 6,
                  lg: 4,
                }}
              >
                <LeaveCard
                  leave={leave}
                />
              </Grid>
            ),
          )}
        </Grid>

        <CreateLeaveModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />
      </Stack>
    </AppShell>
  );
}