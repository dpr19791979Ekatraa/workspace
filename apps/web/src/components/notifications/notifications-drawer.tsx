'use client';

import {
  Box,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from '@mui/material';

import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

export function NotificationsDrawer({
  open,

  onClose,

  notifications,
}: {
  open: boolean;

  onClose: () => void;

  notifications: any[];
}) {
  return (
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

          p: 3,
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <NotificationsRoundedIcon />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Notifications
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            {notifications?.map(
              (
                notification: any,
              ) => (
                <Box
                  key={
                    notification.id
                  }
                  sx={{
                    p: 2,

                    borderRadius: 3,

                    background:
                      'rgba(255,255,255,0.03)',
                  }}
                >
                  <Stack
                    spacing={1}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Chip
                        label={
                          notification.type
                        }
                        size="small"
                      />

                      {!notification.read && (
                        <Box
                          sx={{
                            width: 8,

                            height: 8,

                            borderRadius:
                              '50%',

                            background:
                              '#FF6A00',
                          }}
                        />
                      )}
                    </Stack>

                    <Typography
                      fontWeight={600}
                    >
                      {
                        notification.title
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {
                        notification.message
                      }
                    </Typography>
                  </Stack>
                </Box>
              ),
            )}
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}