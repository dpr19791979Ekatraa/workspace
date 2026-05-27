'use client';

import {
  Box,
  Button,
  Stack,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { useState } from 'react';

import { AppShell } from '@/components/layout/app-shell';

import { ReimbursementsGrid } from '@/components/reimbursements/reimbursements-grid';

import { CreateReimbursementModal } from '@/components/reimbursements/create-reimbursement-modal';

import { useReimbursements } from '@/hooks/use-reimbursements';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { PageHeader } from '@/components/shared/page-header';

export default function ReimbursementsPage() {
  const { data } =
    useReimbursements();

  const [open, setOpen] =
    useState(false);

  return (
    <ProtectedRoute
  allowedRoles={[
    'SUPER_ADMIN',
    'ADMIN',
    'HR',
    'EMPLOYEE',
  ]}
>
  <AppShell>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="Finance"
          title="Reimbursements"
          subtitle="Manage expense claims and approvals with clearer visual grouping and action focus."
          action={
            <Button
              variant="contained"
              startIcon={
                <AddRoundedIcon />
              }
              onClick={() =>
                setOpen(true)
              }
            >
              Submit Expense
            </Button>
          }
        />

        <Box
          sx={{
            p: {
              xs: 1,
              md: 1.5,
            },
            borderRadius: 3,
            border: theme =>
              `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
          }}
        >
          <ReimbursementsGrid
            reimbursements={
              data || []
            }
          />
        </Box>

        <CreateReimbursementModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />
      </Stack>
    </AppShell>
</ProtectedRoute>
  );
}