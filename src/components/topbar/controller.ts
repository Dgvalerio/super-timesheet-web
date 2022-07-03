import { useState, MouseEvent, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { switchThemeMode } from '@/store/ui/actions';
import { UIStore } from '@/store/ui/slice';
// import { signOut } from '@/store/user/actions';

interface ControllerReturn {
  anchorElUser?: null | HTMLElement;
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  handleSwitchThemeMode: () => void;
  nextThemeMode: UIStore.ThemeMode;
  handleSignOut: () => void;
}

const useTopBarController = (): ControllerReturn => {
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

  const handleSignOut = () => {
    // todo: implementar logout
    // dispatch(signOut(() => void router.push(routes.home())));
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
