'use client';

import {
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { useUser } from '@clerk/nextjs';

import { useCurrentUser } from '@/hooks/use-current-user';

export function ProtectedRoute({
  children,

  allowedRoles,
}: {
  children: React.ReactNode;

  allowedRoles?: string[];
}) {
  const router =
    useRouter();

  const { isLoaded, user } =
    useUser();

  const {
    data: currentUser,

    isLoading,
  } = useCurrentUser();

  useEffect(() => {
    if (
      isLoaded &&
      !user
    ) {
      router.push('/sign-in');
    }
  }, [
    isLoaded,
    user,
    router,
  ]);

  useEffect(() => {
    if (
      allowedRoles &&
      currentUser &&
      !allowedRoles.includes(
        currentUser.role,
      )
    ) {
      router.push('/');
    }
  }, [
    currentUser,
    allowedRoles,
    router,
  ]);

  if (
    !isLoaded ||
    isLoading
  ) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        spacing={2}
      >
        <CircularProgress />

        <Typography
          color="text.secondary"
        >
          Loading workspace...
        </Typography>
      </Stack>
    );
  }

  return <>{children}</>;
}