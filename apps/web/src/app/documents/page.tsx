'use client';

import {
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import {
  useState,
} from 'react';

import { AppShell } from '@/components/layout/app-shell';

import { DocumentCard } from '@/components/documents/document-card';

import { CreateDocumentModal } from '@/components/documents/create-document-modal';

import { useDocuments } from '@/hooks/use-documents';
import { PageHeader } from '@/components/shared/page-header';

export default function DocumentsPage() {
  const { data } =
    useDocuments();

  const [open, setOpen] =
    useState(false);

  return (
    <AppShell>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="Knowledge Base"
          title="Documents"
          subtitle="Keep shared files organized with cleaner card rhythm and clearer call-to-action placement."
          action={
            <Button
              variant="contained"
              startIcon={
                <AddRoundedIcon />
              }
              onClick={() =>
                setOpen(true)
              }
            >
              Upload Document
            </Button>
          }
        />

        <Grid
          container
          spacing={2.25}
        >
          {(data || []).map(
            (document: any) => (
              <Grid
                key={document.id}
                size={{
                  xs: 12,
                  md: 6,
                  lg: 4,
                }}
              >
                <DocumentCard
                  document={
                    document
                  }
                />
              </Grid>
            ),
          )}
        </Grid>

        <CreateDocumentModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />
      </Stack>
    </AppShell>
  );
}