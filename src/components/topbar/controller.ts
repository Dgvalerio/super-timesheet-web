import { useState, MouseEvent, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { switchThemeMode } from '@/store/ui/actions';
import { UIStore } from '@/store/ui/slice';
import { wipeUser } from '@/store/user/actions';
import { successMessages } from '@/utils/errorMessages';
import { routes } from '@/utils/pages';

interface ControllerReturn {
  anchorElUser?: null | HTMLElement;
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  handleSwitchThemeMode: () => void;
  nextThemeMode: UIStore.ThemeMode;
  handleSignOut: () => void;
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

  useEffect(() => {
    setNextThemeMode(
      themeMode === UIStore.ThemeMode.Light
        ? UIStore.ThemeMode.Dark
        : UIStore.ThemeMode.Light
    );
  }, [themeMode]);

  const handleSwitchThemeMode = () => {
    dispatch(switchThemeMode());
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    dispatch(wipeUser());

    await router.push(routes.auth.login());

    toast.success(successMessages.userSigned);
  };

  return {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    nextThemeMode,
    handleSwitchThemeMode,
    handleSignOut,
  };
};

export default useTopBarController;
