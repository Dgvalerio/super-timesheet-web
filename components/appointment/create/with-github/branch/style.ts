import { Theme } from '@/components/style-wrapper/theme';
import theme from '@/styles/theme';
import { orange } from '@mui/material/colors';

import { transparentize } from 'polished';

export const branchColor = transparentize(0.3, orange['900']);

export const branchTheme = ((): Theme => {
  const aux = theme;

  aux.palette.primary.main = branchColor;

  return aux;
})();

const BranchStyles = {};

export default BranchStyles;
