'use client';

import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from '@mui/material';

import { RoleBadge } from '../shared/role-badge';

export function UserProfileDrawer({
  open,

  onClose,

  user,
}: {
  open: boolean;

  onClose: () => void;

  user: any;
}) {
  if (!user) return null;

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
        <Stack
          spacing={3}
        >
          <Stack
            spacing={2}
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 90,

                height: 90,

                fontSize: 36,

                background:
                  '#FF6A00',
              }}
            >
              {user.name?.[0]}
            </Avatar>

            <Stack
              spacing={1}
              alignItems="center"
            >
              <Typography
                variant="h5"
                fontWeight={700}
              >
                {user.name}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {user.email}
              </Typography>

              <RoleBadge
                role={user.role}
              />
            </Stack>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <ProfileItem
              label="Department"
              value={
                user.department ||
                '—'
              }
            />

            <ProfileItem
              label="Designation"
              value={
                user.designation ||
                '—'
              }
            />

            <ProfileItem
              label="Phone"
              value={
                user.phone || '—'
              }
            />

            <ProfileItem
              label="WhatsApp"
              value={
                user.whatsappNumber ||
                '—'
              }
            />

            <ProfileItem
              label="Relationship Status"
              value={
                user.relationshipStatus ||
                '—'
              }
            />

            <ProfileItem
              label="Joining Date"
              value={
                user.joiningDate
                  ? new Date(
                      user.joiningDate,
                    ).toLocaleDateString()
                  : '—'
              }
            />

            <Stack spacing={1}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Account Status
              </Typography>

              <Chip
                label={
                  user.isActive
                    ? 'Active'
                    : 'Inactive'
                }
                sx={{
                  width: 'fit-content',

                  background:
                    user.isActive
                      ? 'rgba(16,185,129,0.15)'
                      : 'rgba(239,68,68,0.15)',

                  color:
                    user.isActive
                      ? '#10B981'
                      : '#EF4444',
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}

function ProfileItem({
  label,

  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {label}
      </Typography>

      <Typography
        fontWeight={600}
      >
        {value}
      </Typography>
    </Stack>
  );
}