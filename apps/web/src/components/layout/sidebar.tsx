'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
  Box,
  Stack,
  Typography,
} from '@mui/material';

import { navItems } from '../navigation/nav-items';
import { useUserRole } from '@/hooks/use-user-role';

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useUserRole();

  return (
    <Box
      sx={{
        width: {
          md: 274,
          xl: 292,
        },
        minHeight: '100vh',
        borderRight: theme =>
          `1px solid ${theme.palette.divider}`,
        background: theme =>
          theme.palette.mode === 'dark'
            ? 'rgba(12,12,12,0.95)'
            : '#FFFFFF',
        backdropFilter: 'blur(22px)',
        p: 3,
        display: {
          xs: 'none',
          md: 'block',
        },
        position: 'sticky',
        top: 0,
        boxShadow: theme =>
          theme.palette.mode === 'dark'
            ? '16px 0 80px rgba(0,0,0,0.10)'
            : '16px 0 80px rgba(0,0,0,0.06)',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 0.75,
        }}
      >
        Ekatraa
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Global workspace for distributed teams.
      </Typography>

      <Stack spacing={0.75}>
        {navItems
  .filter(item =>
    item.roles.includes(role),
  )
  .map(item => {
          const Icon = item.icon;

          const active =
            pathname === item.path;

          return (
            <Link
              key={item.label}
              href={item.path}
              style={{
                textDecoration:
                  'none',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 1.75,
                  py: 1,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: '0.2s',
                  background: theme =>
                    active
                      ? theme.palette.action.selected
                      : theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.02)'
                      : 'rgba(255,255,255,0.6)',
                  color: theme =>
                    active
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  '&:hover': {
                    background: theme =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(255,149,0,0.08)',
                  },
                }}
              >
                <Icon />

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: active
                      ? 700
                      : 500,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}