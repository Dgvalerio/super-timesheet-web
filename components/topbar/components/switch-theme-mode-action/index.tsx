import React, { FC } from 'react';

import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { switchThemeMode } from '@/store/ui/actions';
import { UIStore } from '@/store/ui/slice';

const SwitchThemeModeAction: FC = () => {
  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector((state) => state.ui);

  const nextMode =
    themeMode === UIStore.ThemeMode.Light
      ? UIStore.ThemeMode.Dark
      : UIStore.ThemeMode.Light;

  const handleSwitchThemeMode = (): void => void dispatch(switchThemeMode());

  const title = `Trocar para ${nextMode} mode`;

  return (
    <Tooltip title={title} arrow>
      <IconButton
        size="large"
        aria-label={title}
        color="inherit"
        onClick={handleSwitchThemeMode}
      >
        {nextMode === UIStore.ThemeMode.Dark ? (
          <LightModeIcon color="disabled" />
        ) : (
          <DarkModeIcon color="disabled" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default SwitchThemeModeAction;
