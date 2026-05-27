'use client';

import {
  Box,
  Stack,
} from '@mui/material';

import { AppShell } from '@/components/layout/app-shell';

import { MeetingsGrid } from '@/components/meetings/meetings-grid';

import { useMeetings } from '@/hooks/use-meetings';
import { Button } from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { useState } from 'react';

import { CreateMeetingModal } from '@/components/meetings/create-meeting-modal';
import { PageHeader } from '@/components/shared/page-header';

export default function MeetingsPage() {
  const { data } =
    useMeetings();
    const [open, setOpen] =
  useState(false);

  return (
    <AppShell>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="Collaboration"
          title="Meetings"
          subtitle="Plan and track meeting schedules in one place with a cleaner, high-focus interface."
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
              Schedule Meeting
            </Button>
          }
        />

        <Box
          sx={{
            p: {
              xs: 1.2,
              md: 1.6,
            },
            borderRadius: 3,
            border: theme =>
              `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
          }}
        >
          <MeetingsGrid
            meetings={data || []}
          />
        </Box>

        <CreateMeetingModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />
      </Stack>
    </AppShell>
  );
}