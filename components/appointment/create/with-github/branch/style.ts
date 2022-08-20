import { orange } from '@mui/material/colors';

import { Theme } from '@/components/style-wrapper/theme';
import theme from '@/styles/theme';

import { transparentize } from 'polished';

export const branchTheme = ((): Theme => {
  const aux = theme;

  aux.palette.primary.main = transparentize(0.3, orange['900']);

  return aux;
})();

const BranchStyles = {};

export default BranchStyles;
