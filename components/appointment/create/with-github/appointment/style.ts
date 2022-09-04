import { green } from '@mui/material/colors';

import { Theme } from '@/components/style-wrapper/theme';
import theme from '@/styles/theme';

import { transparentize } from 'polished';

export const appointmentTheme: Theme = {
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      ...theme.palette.primary,
      main: transparentize(0.3, green['900']),
    },
  },
};

const AppointmentStyles = {};

export default AppointmentStyles;
