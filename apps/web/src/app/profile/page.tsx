'use client';

import {
  Box,
  Stack,
} from '@mui/material';

import { AppShell } from '@/components/layout/app-shell';

import { ProfileHeader } from '@/components/profile/profile-header';

import { ProfileForm } from '@/components/profile/profile-form';

import { useProfile } from '@/hooks/use-profile';
import { PageHeader } from '@/components/shared/page-header';

export default function ProfilePage() {
  const { data } =
    useProfile();

  return (
    <AppShell>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="Personal Workspace"
          title="Profile"
          subtitle="Control personal details, contact information, and account metadata in a clean, focused panel."
        />

        <ProfileHeader
          profile={data}
        />

        <Box
          sx={{
            p: {
              xs: 1.5,
              md: 2,
            },
            borderRadius: 3,
            border: theme =>
              `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
          }}
        >
          <ProfileForm
            profile={data}
          />
        </Box>
      </Stack>
    </AppShell>
  );
}