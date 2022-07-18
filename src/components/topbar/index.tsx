import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useTopBarController from '@/components/topbar/controller';
import Styles from '@/components/topbar/style';
import { AppointmentStatusEnum } from '@/models/appointment';
import { useGetAllAppointmentsQuery } from '@/models/appointment/get';
import { useSendAppointmentsMutation } from '@/models/appointment/send';
import { UIStore } from '@/store/ui/slice';
import { ApolloError } from '@apollo/client';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Notifications as NotificationsIcon,
  UploadFile as UploadIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Badge,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
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

  const [toSend, setToSend] = useState(0);

  const {
    data: dataGetAllAppointments,
    loading: loadingGetAllAppointments,
    error: errorGetAllAppointments,
  } = useGetAllAppointmentsQuery({
    status: AppointmentStatusEnum.Draft,
  });

  const [sendAppointments, { loading: loadingSendAppointments }] =
    useSendAppointmentsMutation();

  const sendAndReloadAppointments = async () => {
    try {
      await sendAppointments();
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    }
  };

  useEffect(() => {
    if (loadingGetAllAppointments || errorGetAllAppointments) return;

    if (dataGetAllAppointments)
      setToSend(dataGetAllAppointments.getAllAppointments.length);
  }, [
    dataGetAllAppointments,
    errorGetAllAppointments,
    loadingGetAllAppointments,
  ]);

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
        {toSend > 0 && (
          <Tooltip
            title={`${
              loadingSendAppointments ? 'Enviando' : 'Enviar'
            } apontamentos`}
          >
            <IconButton
              size="large"
              aria-label={`show ${toSend} new notifications`}
              color="inherit"
              onClick={
                loadingSendAppointments ? undefined : sendAndReloadAppointments
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
