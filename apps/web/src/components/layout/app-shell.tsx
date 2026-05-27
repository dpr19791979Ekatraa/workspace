'use client';

import { useState } from 'react';

import { Box } from '@mui/material';

import { Sidebar } from './sidebar';

import { Navbar } from './navbar';

import { MobileSidebar } from './mobile-sidebar';

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        minHeight: '100vh',
        background: theme =>
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 12% 16%, rgba(255, 106, 0, 0.16), transparent 18%), radial-gradient(circle at 88% 12%, rgba(255, 149, 0, 0.10), transparent 14%), linear-gradient(180deg, #060606 0%, #0b0b0b 100%)'
            : 'radial-gradient(circle at 12% 16%, rgba(255, 106, 0, 0.12), transparent 18%), radial-gradient(circle at 88% 12%, rgba(255, 149, 0, 0.08), transparent 14%), linear-gradient(180deg, #f6f7f9 0%, #ffffff 100%)',
        backgroundSize: 'cover',
        overflow: 'hidden',
      }}
    >
      <Box
        component="span"
        sx={{
          position: 'absolute',
          width: 320,
          height: 320,
          top: 48,
          left: 48,
          borderRadius: '50%',
          background: theme =>
            theme.palette.mode === 'dark'
              ? 'rgba(255,106,0,0.18)'
              : 'rgba(255,106,0,0.14)',
          filter: 'blur(90px)',
          opacity: 0.72,
          pointerEvents: 'none',
        }}
      />

      <Box
        component="span"
        sx={{
          position: 'absolute',
          width: 220,
          height: 220,
          bottom: 72,
          right: 56,
          borderRadius: '50%',
          background: theme =>
            theme.palette.mode === 'dark'
              ? 'rgba(255,149,0,0.12)'
              : 'rgba(255,149,0,0.08)',
          filter: 'blur(80px)',
          opacity: 0.68,
          pointerEvents: 'none',
        }}
      />

      <Sidebar />

      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Navbar onOpenMobileMenu={() => setMobileOpen(true)} />

        <Box
          sx={{
            p: {
              xs: 2,
              md: 4,
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
