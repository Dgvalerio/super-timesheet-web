import { createTheme } from '@mui/material';

import { UIStore } from '@/store/ui/slice';

const theme = createTheme({
  palette: {
    mode: UIStore.ThemeMode.Dark,
  },
});

export default theme;
