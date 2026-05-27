'use client';

import {
  Box,
  Stack,
} from '@mui/material';

import { AppShell } from '@/components/layout/app-shell';

import { KpiCards } from '@/components/analytics/kpi-cards';

import { ProductivityChart } from '@/components/analytics/productivity-chart';

import { useAnalytics } from '@/hooks/use-analytics';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { PageHeader } from '@/components/shared/page-header';

export default function AnalyticsPage() {
  const { data } =
    useAnalytics();

  return (
    <ProtectedRoute
  allowedRoles={[
    'SUPER_ADMIN',
    'ADMIN',
  ]}
>
  <AppShell>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="Intelligence"
          title="Analytics"
          subtitle="Review executive KPIs and productivity signals in a tighter, board-ready visual layout."
        />

        <KpiCards
          analytics={data}
        />

        <Box
          sx={{
            p: {
              xs: 1.2,
              md: 1.8,
            },
            borderRadius: 3,
            border: theme =>
              `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
          }}
        >
          <ProductivityChart
            data={
              data?.productivity ||
              []
            }
          />
        </Box>
      </Stack>
    </AppShell>
</ProtectedRoute>
  );
}