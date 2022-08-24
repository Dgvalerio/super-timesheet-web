import { red } from '@mui/material/colors';

import { Theme } from '@/components/style-wrapper/theme';
import theme from '@/styles/theme';

import { transparentize } from 'polished';

export const commitTheme: Theme = {
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      ...theme.palette.primary,
      main: transparentize(0.3, red['900']),
    },
  },
};

const CommitStyles = {};

export default CommitStyles;
