'use client';

import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 2.5,
        },
        borderRadius: 3,
        border: theme => `1px solid ${theme.palette.divider}`,
        background: theme =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(255,106,0,0.13), rgba(255,149,0,0.03) 42%, rgba(255,255,255,0.02))'
            : 'linear-gradient(135deg, rgba(255,106,0,0.11), rgba(255,149,0,0.04) 45%, rgba(255,255,255,0.86))',
      }}
    >
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            md: 'center',
          },
          gap: 2,
        }}
      >
        <Stack spacing={0.8}>
          {eyebrow ? (
            <Typography
              variant="caption"
              sx={{
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                fontWeight: 700,
              }}
            >
              {eyebrow}
            </Typography>
          ) : null}

          <Typography
            variant="h5"
            sx={{ fontWeight: 700 }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 720 }}
          >
            {subtitle}
          </Typography>
        </Stack>

        {action ? (
          <Box
            sx={{
              width: {
                xs: '100%',
                md: 'auto',
              },
              display: 'flex',
              justifyContent: {
                xs: 'flex-start',
                md: 'flex-end',
              },
            }}
          >
            {action}
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}
