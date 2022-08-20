import React, { FC } from 'react';

import {
  Cached as UpdateIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  UploadFile as UploadIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import WatchUpdateDataModal from '@/components/topbar/components/watch-update-data-modal';
import useTopBarController from '@/components/topbar/controller';
import Styles from '@/components/topbar/style';
import { UIStore } from '@/store/ui/slice';

const TopBar: FC<{ name: string; image?: string }> = ({ name, image }) => {
  const {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleSwitchThemeMode,
    nextThemeMode,
    handleSignOut,
    toSend,
    loadingSendAppointments,
    sendAndReloadAppointments,
    handleUpdateData,
    loadingUpdateData,
    watchUpdateData,
    goHome,
    goUserUpdate,
  } = useTopBarController();

  return (
    <>
      <Styles.Container
        container
        className="top-bar"
        justifyContent="space-between"
      >
        <Grid item xs={3} className="logo">
          <Button variant="text" onClick={goHome}>
            <Typography variant="h6">Timesheet</Typography>
          </Button>
        </Grid>
        <Grid item>
          {toSend > 0 && (
            <Tooltip
              title={
                <>
                  <Typography variant="caption">
                    Você tem {toSend} apontamentos não lançados.
                    <br />
                    Clique aqui para envia-los!
                  </Typography>
                </>
              }
              placement="left"
              arrow
            >
              <IconButton
                size="large"
                aria-label={`show ${toSend} new notifications`}
                color="inherit"
                onClick={
                  loadingSendAppointments
                    ? undefined
                    : sendAndReloadAppointments
                }
              >
                {loadingSendAppointments ? (
                  <CircularProgress size={24} />
                ) : (
                  <Badge badgeContent={toSend} color="primary">
                    <UploadIcon color="inherit" />
                  </Badge>
                )}
              </IconButton>
            </Tooltip>
          )}
          <Tooltip
            title={`${loadingUpdateData ? 'Atualizando' : 'Atualizar'} dados`}
            arrow
          >
            <IconButton
              size="large"
              aria-label="Atualizar clientes, projetos, categorias..."
              color="inherit"
              onClick={loadingUpdateData ? undefined : handleUpdateData}
            >
              {loadingUpdateData ? (
                <CircularProgress size={24} />
              ) : (
                <UpdateIcon color="disabled" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title={`Trocar para ${nextThemeMode} mode`} arrow>
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
          <Tooltip title="Abrir opções" arrow>
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
            <MenuItem onClick={goUserUpdate}>
              <Typography textAlign="center">Perfil</Typography>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
              <Typography textAlign="center">Sair</Typography>
            </MenuItem>
          </Menu>
        </Grid>
      </Styles.Container>
      {watchUpdateData?.watchImportData && (
        <WatchUpdateDataModal
          open={loadingUpdateData}
          watchUpdateData={watchUpdateData}
        />
      )}
    </>
  );
};

export default TopBar;
