'use client';

import { ReactNode } from 'react';

import {
  Box,
  Typography,
} from '@mui/material';

import { useUserRole } from '@/hooks/use-user-role';

import { UserRole } from '@/types/auth';

export function ProtectedRoute({
  allowedRoles,

  children,
}: {
  allowedRoles: UserRole[];

  children: ReactNode;
}) {
  const { role } =
    useUserRole();

  if (
    !allowedRoles.includes(
      role as UserRole,
    )
  ) {
    return (
      <Box
        sx={{
          minHeight: '60vh',

          display: 'flex',

          alignItems: 'center',

          justifyContent:
            'center',
        }}
      >
        <Typography
          variant="h5"
        >
          Access Denied
        </Typography>
      </Box>
    );
  }

  return children;
}