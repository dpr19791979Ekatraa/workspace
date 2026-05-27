'use client';

import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from '@mui/material';

import {
  useState,
} from 'react';

import { CompleteProjectModal } from './complete-project-modal';

export function ProjectDrawer({
  open,

  onClose,

  project,
}: {
  open: boolean;

  onClose: () => void;

  project: any;
}) {
  const [
    completionOpen,

    setCompletionOpen,
  ] = useState(false);

  if (!project)
    return null;

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
      >
        <Box
          sx={{
            width: {
              xs: '100vw',
              sm: 420,
            },

            height: '100%',

            background:
              '#0A0A0A',

            p: 4,
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Chip
                  label={
                    project.status
                  }
                  size="small"
                />

                <Chip
                  label={
                    project.priority
                  }
                  size="small"
                />
              </Stack>

              <Typography
                variant="h5"
                fontWeight={700}
              >
                {project.name}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {
                  project.description
                }
              </Typography>
            </Stack>

            <Divider />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Due:{' '}
              {project.dueDate
                ? new Date(
                    project.dueDate,
                  ).toLocaleDateString()
                : 'N/A'}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Created By:{' '}
              {
                project.createdBy
                  ?.name
              }
            </Typography>

            {project.status !==
              'COMPLETED' && (
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  setCompletionOpen(
                    true,
                  )
                }
              >
                Complete Project
              </Button>
            )}
          </Stack>
        </Box>
      </Drawer>

      <CompleteProjectModal
        open={completionOpen}
        onClose={() =>
          setCompletionOpen(
            false,
          )
        }
        project={project}
      />
    </>
  );
}