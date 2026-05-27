'use client';

import {
  Grid,
} from '@mui/material';

import { ReimbursementCard } from './reimbursement-card';

export function ReimbursementsGrid({
  reimbursements,
}: {
  reimbursements: any[];
}) {
  return (
    <Grid
      container
      spacing={2}
    >
      {reimbursements.map(
        reimbursement => (
          <Grid
            key={
              reimbursement.id
            }
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
          >
            <ReimbursementCard
              reimbursement={
                reimbursement
              }
            />
          </Grid>
        ),
      )}
    </Grid>
  );
}