import { red } from '@mui/material/colors';

import { Theme } from '@/components/style-wrapper/theme';
import theme from '@/styles/theme';

import { transparentize } from 'polished';

export const commitTheme = ((): Theme => {
  const aux = theme;

  aux.palette.primary.main = transparentize(0.3, red['900']);

  return aux;
})();

const CommitStyles = {};

export default CommitStyles;
