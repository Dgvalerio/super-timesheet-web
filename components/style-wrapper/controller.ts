import { useEffect, useState } from 'react';

import { createTheme } from '@mui/material';

import { useAppSelector } from '@/store/hooks';
import globalTheme from '@/styles/theme';

interface ControllerReturn {
  theme: typeof globalTheme;
}

const useStyleWrapperController = (): ControllerReturn => {
  const [theme, setTheme] = useState(globalTheme);

  const { themeMode } = useAppSelector((state) => state.ui);

  useEffect(() => {
    setTheme(createTheme({ palette: { mode: themeMode } }));
  }, [themeMode]);

  return { theme };
};

export default useStyleWrapperController;
