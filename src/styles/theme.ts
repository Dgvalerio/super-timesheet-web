import { UIStore } from '@/store/ui/slice';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: UIStore.ThemeMode.Dark,
  },
});

export default theme;
