'use client';

import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

import { RoleBadge } from '@/components/shared/role-badge';
import { useState } from 'react';

import { UserProfileDrawer } from './user-profile-drawer';

const columns: GridColDef[] = [
  {
    field: 'name',

    headerName: 'Employee',

    flex: 1,

    renderCell: params => (
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        height="100%"
      >
        <Avatar>
          {params.row.name?.[0]}
        </Avatar>

        <Stack>
          <Typography fontWeight={600}>
            {params.row.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {params.row.email}
          </Typography>
        </Stack>
      </Stack>
    ),
  },

  {
    field: 'department',

    headerName: 'Department',

    flex: 1,
  },

  {
    field: 'designation',

    headerName: 'Designation',

    flex: 1,
  },

  {
    field: 'role',

    headerName: 'Role',

    flex: 1,

    renderCell: params => (
      <RoleBadge
        role={params.value}
      />
    ),
  },
];

export function UsersTable({
  users,
}: {
  users: any[];
}) {
    const [
  selectedUser,

  setSelectedUser,
] = useState<any>(null);
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Employees
        </Typography>

        <div
          style={{
            width: '100%',
          }}
        >
            <UserProfileDrawer
  open={!!selectedUser}
  user={selectedUser}
  onClose={() =>
    setSelectedUser(null)
  }
/>
          <DataGrid
            rows={users}
            columns={columns}
            autoHeight

            disableRowSelectionOnClick
            onRowClick={params =>
  setSelectedUser(
    params.row,
  )
}
            pageSizeOptions={[
              5,
              10,
              20,
            ]}

            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}

            sx={{
              border: 'none',

              '& .MuiDataGrid-cell': {
                borderBottom:
                  '1px solid rgba(255,255,255,0.06)',
              },

              '& .MuiDataGrid-columnHeaders':
                {
                  borderBottom:
                    '1px solid rgba(255,255,255,0.08)',
                },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}