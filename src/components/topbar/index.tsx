import React, { FC } from 'react';

import useTopBarController from '@/components/topbar/controller';
import Styles from '@/components/topbar/style';
import { UIStore } from '@/store/ui/slice';
import {
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';

const TopBar: FC<{ name: string; image?: string }> = ({ name, image }) => {
  const {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleSwitchThemeMode,
    nextThemeMode,
    handleSignOut,
  } = useTopBarController();

  return (
    <Styles.Container
      container
      className="top-bar"
      justifyContent="space-between"
    >
      <Grid item xs={3} className="logo">
        <Typography variant="h6">Timesheet</Typography>
      </Grid>
      <Grid item>
        <Tooltip title={`Trocar para ${nextThemeMode} mode`}>
          <IconButton
            size="large"
            aria-label={`Trocar para ${nextThemeMode} mode`}
            color="inherit"
            onClick={handleSwitchThemeMode}
          >
            {nextThemeMode === UIStore.ThemeMode.Dark ? (
              <LightModeIcon color="disabled" />
            ) : (
              <DarkModeIcon color="disabled" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Ver notificações">
          <IconButton
            size="large"
            aria-label="show 0 new notifications"
            color="inherit"
          >
            <Badge badgeContent={0} color="success">
              <NotificationsIcon color="disabled" />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Abrir opções">
          <IconButton onClick={handleOpenUserMenu} className="user-button">
            <Avatar alt={name} src={image} />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Perfil</Typography>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <Typography textAlign="center">Sair</Typography>
          </MenuItem>
        </Menu>
      </Grid>
    </Styles.Container>
  );
};

export default TopBar;
