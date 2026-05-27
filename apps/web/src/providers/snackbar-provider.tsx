'use client';

import {
  SnackbarProvider,
} from 'notistack';

export function AppSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',

        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  );
}