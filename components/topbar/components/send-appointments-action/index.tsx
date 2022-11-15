import React, { FC, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { UploadFile as UploadIcon } from '@mui/icons-material';
import {
  Badge,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import WatchSendAppointmentsModal from '@/components/topbar/components/watch-send-appointments-modal';
import { AppointmentStatusEnum } from '@/models/appointment';
import { useGetAllAppointmentsQuery } from '@/models/appointment/get';
import { useSendAppointmentsMutation } from '@/models/appointment/send';
import useGithubStore from '@/store/github';
import { useAppDispatch } from '@/store/hooks';
import { wipeUser } from '@/store/user/actions';
import { routes } from '@/utils/pages';
import { ApolloError } from '@apollo/client';

const SendAppointmentsAction: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { removeGithubToken } = useGithubStore();

  const { data: dataGetAllAppointments, error: errorGetAllAppointments } =
    useGetAllAppointmentsQuery({
      status: AppointmentStatusEnum.Draft,
    });
  const [sendAppointments, { loading: loadingSendAppointments }] =
    useSendAppointmentsMutation();

  const toSend = dataGetAllAppointments
    ? dataGetAllAppointments.getAllAppointments.length
    : 0;

  const sendAndReloadAppointments = async (): Promise<void> => {
    try {
      await sendAppointments();
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    }
  };

  const handleSignOut = useCallback(async () => {
    dispatch(wipeUser());
    removeGithubToken();

    await router.push(routes.auth.login());
  }, [dispatch, removeGithubToken, router]);

  useEffect(() => {
    if (!errorGetAllAppointments) return;

    errorGetAllAppointments.graphQLErrors.forEach(
      ({ message, extensions: { code } }) => {
        if (code === 'UNAUTHENTICATED') void handleSignOut();
        else toast.error(message);
      }
    );
  }, [errorGetAllAppointments, handleSignOut]);

  if (toSend <= 0) return <></>;

  return (
    <>
      <Tooltip
        title={
          <Typography variant="caption">
            Você tem {toSend} apontamentos não lançados.
            <br />
            Clique aqui para envia-los!
          </Typography>
        }
        placement="left"
        arrow
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
      <WatchSendAppointmentsModal open={loadingSendAppointments} />
    </>
  );
};

export default SendAppointmentsAction;
