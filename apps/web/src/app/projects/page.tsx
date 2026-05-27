'use client';

import {
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { useState } from 'react';

import { AppShell } from '@/components/layout/app-shell';

import { ProjectCard } from '@/components/projects/project-card';

import { useProjects } from '@/hooks/use-projects';

import { CreateProjectModal } from '@/components/projects/create-project-modal';
import { ProjectDrawer } from '@/components/projects/project-drawer';
import { PageHeader } from '@/components/shared/page-header';

export default function ProjectsPage() {
  const { data } =
    useProjects();

  const [open, setOpen] =
    useState(false);
    const [
  selectedProject,

  setSelectedProject,
] = useState(null);

const [
  drawerOpen,

  setDrawerOpen,
] = useState(false);

  return (
    <>
    <AppShell>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="Delivery"
          title="Projects"
          subtitle="Track project lifecycle and milestones with better scanning and more balanced card density."
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
              Create Project
            </Button>
          }
        />

        <Grid
          container
          spacing={2.25}
        >
          {(data || []).map(
            (project: any) => (
              <Grid
                key={project.id}
                size={{
                  xs: 12,
                  md: 6,
                  lg: 4,
                }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => {
  setSelectedProject(
    project,
  );

  setDrawerOpen(true);
}}
                />
              </Grid>
            ),
          )}
        </Grid>

        <CreateProjectModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />
      </Stack>
    </AppShell>
    <ProjectDrawer
  open={drawerOpen}
  project={selectedProject}
  onClose={() =>
    setDrawerOpen(false)
  }
/>
</>
  );
}