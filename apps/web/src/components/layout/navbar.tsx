'use client';

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useState, type MouseEvent } from 'react';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { NotificationsDrawer } from '@/components/notifications/notifications-drawer';
import { useNotifications } from '@/hooks/use-notifications';
import { useColorMode } from '@/providers/theme-provider';

export function Navbar({
  onOpenMobileMenu,
}: {
  onOpenMobileMenu: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data } = useNotifications();
  const { mode, toggleColorMode } = useColorMode();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const userMenuOpen = Boolean(anchorEl);

  const handleAvatarClick = (
    event: MouseEvent<HTMLElement>,
  ) => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    router.push('/profile');
  };

  const handleLogout = async () => {
    handleMenuClose();
    await signOut();
    router.push('/sign-in');
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          height: 84,
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            minHeight: 84,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <IconButton
              onClick={onOpenMobileMenu}
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
                color: 'inherit',
              }}
            >
              <MenuRoundedIcon />
            </IconButton>

            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
              >
                Dashboard
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Global operations, made simple.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <IconButton
              onClick={toggleColorMode}
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>

            <IconButton
              onClick={() => setOpen(true)}
            >
              <Badge
                badgeContent={
                  data?.filter(
                    (notification: any) =>
                      !notification.read,
                  )?.length || 0
                }
                color="error"
              >
                <NotificationsRoundedIcon />
              </Badge>
            </IconButton>

            <IconButton
              onClick={handleAvatarClick}
              aria-label="Open user menu"
              aria-controls={
                userMenuOpen ? 'user-menu' : undefined
              }
              aria-haspopup="true"
            >
              <Avatar>
                {user?.firstName?.[0] || user?.fullName?.[0] || 'U'}
              </Avatar>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={userMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <PersonRoundedIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutRoundedIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <NotificationsDrawer
        open={open}
        onClose={() => setOpen(false)}
        notifications={data || []}
      />
    </>
  );
}
