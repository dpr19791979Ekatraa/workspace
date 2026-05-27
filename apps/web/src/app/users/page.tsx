'use client';

import {
  Box,
  Stack,
} from '@mui/material';

import { AppShell } from '@/components/layout/app-shell';

import { UsersTable } from '@/components/users/users-table';

import { useUsers } from '@/hooks/use-users';
import { Button } from '@mui/material';

import { useState } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { CreateUserModal } from '@/components/users/create-user-modal';
import { PageHeader } from '@/components/shared/page-header';

export default function UsersPage() {
  const { data } =
    useUsers();
const [open, setOpen] =
  useState(false);

  return (
    <AppShell>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="People"
          title="Employees"
          subtitle="Manage organization members and permissions with faster scanability and cleaner hierarchy."
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
              Add Employee
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
          <UsersTable
            users={data || []}
          />
        </Box>

        <CreateUserModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />
      </Stack>
    </AppShell>
  );
}