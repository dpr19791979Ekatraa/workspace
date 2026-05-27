import type { Metadata } from 'next';

import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import { AppSnackbarProvider } from '@/providers/snackbar-provider';
import { AuthSyncProvider } from '@/providers/auth-sync-provider';


export const metadata: Metadata = {
  title: 'Ekatraa',

  description:
    'Modern Startup Workspace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning>
          <AppRouterCacheProvider>
            <QueryProvider>
              <AppSnackbarProvider>
            <ThemeProvider>
              <AuthSyncProvider>
                {children}
              </AuthSyncProvider>
            </ThemeProvider>
              </AppSnackbarProvider>
            </QueryProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}