import { useState, MouseEvent, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { AppointmentStatusEnum } from '@/models/appointment';
import { useGetAllAppointmentsQuery } from '@/models/appointment/get';
import { useSendAppointmentsMutation } from '@/models/appointment/send';
import { useUpdateDataMutation } from '@/models/scrapper/update';
import { getUserClientsQuery } from '@/models/user/get';
import { switchThemeMode } from '@/store/ui/actions';
import { UIStore } from '@/store/ui/slice';
import { wipeUser } from '@/store/user/actions';
import { successMessages } from '@/utils/errorMessages';
import { routes } from '@/utils/pages';
import { ApolloError } from '@apollo/client';

interface ControllerReturn {
  anchorElUser?: null | HTMLElement;
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  handleSwitchThemeMode: () => void;
  nextThemeMode: UIStore.ThemeMode;
  handleSignOut: () => void;
  toSend: number;
  loadingSendAppointments: boolean;
  sendAndReloadAppointments: () => Promise<void>;
  loadingUpdateData: boolean;
  handleUpdateData: () => Promise<void>;
}

const useTopBarController = (): ControllerReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    ui: { themeMode },
    user: { email },
  } = useAppSelector((state) => state);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>();
  const [nextThemeMode, setNextThemeMode] = useState<UIStore.ThemeMode>(
    themeMode === UIStore.ThemeMode.Light
      ? UIStore.ThemeMode.Dark
      : UIStore.ThemeMode.Light
  );
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

  const [updateData, { loading: loadingUpdateData }] = useUpdateDataMutation({
    refetchQueries: [getUserClientsQuery(email)],
  });

  const handleSwitchThemeMode = () => {
    dispatch(switchThemeMode());
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = useCallback(async () => {
    dispatch(wipeUser());

    await router.push(routes.auth.login());

    toast.success(successMessages.userSigned);
  }, [dispatch, router]);

  const sendAndReloadAppointments = async () => {
    try {
      await sendAppointments();
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    }
  };

  const handleUpdateData = async () => {
    try {
      await updateData();
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    }
  };

  useEffect(() => {
    if (loadingGetAllAppointments) return;

    if (dataGetAllAppointments)
      setToSend(dataGetAllAppointments.getAllAppointments.length);
  }, [dataGetAllAppointments, loadingGetAllAppointments]);

  useEffect(() => {
    if (!errorGetAllAppointments) return;

    errorGetAllAppointments.graphQLErrors.forEach(
      ({ message, extensions: { code } }) => {
        if (code === 'UNAUTHENTICATED') void handleSignOut();
        else toast.error(message);
      }
    );
  }, [errorGetAllAppointments, handleSignOut]);

  useEffect(() => {
    setNextThemeMode(
      themeMode === UIStore.ThemeMode.Light
        ? UIStore.ThemeMode.Dark
        : UIStore.ThemeMode.Light
    );
  }, [themeMode]);

  return {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    nextThemeMode,
    handleSwitchThemeMode,
    handleSignOut,
    toSend,
    loadingSendAppointments,
    sendAndReloadAppointments,
    loadingUpdateData,
    handleUpdateData,
  };
};

export default useTopBarController;
