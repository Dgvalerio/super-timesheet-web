import { Theme } from '@/components/style-wrapper/theme';
import theme from '@/styles/theme';
import { red } from '@mui/material/colors';

import { transparentize } from 'polished';

export const commitColor = transparentize(0.3, red['900']);

export const commitTheme = ((): Theme => {
  const aux = theme;

  aux.palette.primary.main = commitColor;

  return aux;
})();

const CommitStyles = {};

export default CommitStyles;
