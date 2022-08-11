import { useState, MouseEvent, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { AppointmentStatusEnum } from '@/models/appointment';
import { useGetAllAppointmentsQuery } from '@/models/appointment/get';
import { useSendAppointmentsMutation } from '@/models/appointment/send';
import {
  UpdateData,
  useUpdateDataMutation,
  useUpdateDataSubscription,
} from '@/models/scrapper/update';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { switchThemeMode } from '@/store/ui/actions';
import { UIStore } from '@/store/ui/slice';
import { wipeUser } from '@/store/user/actions';
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
  watchUpdateData?: UpdateData.Subscription;
  goHome: () => void;
  goUserUpdate: () => void;
}

const useTopBarController = (): ControllerReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector((state) => state.ui);

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

  const [updateData, { loading: loadingUpdateData }] = useUpdateDataMutation();

  const { data: watchUpdateData } = useUpdateDataSubscription();

  const handleSwitchThemeMode = (): void => {
    dispatch(switchThemeMode());
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void =>
    setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = (): void => setAnchorElUser(null);

  const handleSignOut = useCallback(async () => {
    dispatch(wipeUser());

    await router.push(routes.auth.login());
  }, [dispatch, router]);

  const sendAndReloadAppointments = async (): Promise<void> => {
    try {
      await sendAppointments();
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    }
  };

  const handleUpdateData = async (): Promise<void> => {
    try {
      await updateData();
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    }
  };

  const goHome = (): void => void router.push(routes.dashboard());

  const goUserUpdate = (): void => void router.push(routes.user.update());

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
    watchUpdateData,
    goHome,
    goUserUpdate,
  };
};

export default useTopBarController;
