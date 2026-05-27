'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
  Box,
  Drawer,
  Stack,
  Typography,
} from '@mui/material';

import { navItems } from '../navigation/nav-items';
import { useUserRole } from '@/hooks/use-user-role';
export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;

  onClose: () => void;
}) {
  const pathname = usePathname();
  const { role } = useUserRole();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="left"
    >
      <Box
        sx={{
          width: 278,
          height: '100%',
          background: theme =>
            theme.palette.mode === 'dark'
              ? 'rgba(12,12,12,0.98)'
              : '#FBFBFB',
          backdropFilter: 'blur(20px)',
          p: 2.75,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2.5,
          }}
        >
          Ekatraa
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
                onClick={onClose}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 1.6,
                    py: 1,
                    borderRadius: 2,
                    background: theme =>
                      active
                        ? theme.palette.action.selected
                        : 'transparent',
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
                  <Icon sx={{ fontSize: 20 }} />

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
    </Drawer>
  );
}