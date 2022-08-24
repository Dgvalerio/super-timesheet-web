import { orange } from '@mui/material/colors';

import { Theme } from '@/components/style-wrapper/theme';
import theme from '@/styles/theme';

import { transparentize } from 'polished';

export const branchTheme: Theme = {
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      ...theme.palette.primary,
      main: transparentize(0.3, orange['900']),
    },
  },
};

const BranchStyles = {};

export default BranchStyles;
