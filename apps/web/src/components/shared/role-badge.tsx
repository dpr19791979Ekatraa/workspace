'use client';

import { Chip } from '@mui/material';

export function RoleBadge({
  role,
}: {
  role: string;
}) {
  const colors: Record<
    string,
    string
  > = {
    SUPER_ADMIN: '#FF6A00',

    ADMIN: '#F59E0B',

    HR: '#06B6D4',

    EMPLOYEE: '#10B981',
  };

  return (
    <Chip
      label={role}
      size="small"
      sx={{
        background:
          `${colors[role]}20`,

        color:
          colors[role],

        fontWeight: 600,
      }}
    />
  );
}