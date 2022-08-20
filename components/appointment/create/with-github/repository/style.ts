import { Theme } from '@/components/style-wrapper/theme';
import theme from '@/styles/theme';
import { blue } from '@mui/material/colors';

import { transparentize } from 'polished';

export const repositoryTheme = ((): Theme => {
  const aux = theme;

  aux.palette.primary.main = transparentize(0.3, blue['900']);

  return aux;
})();

const RepositoryStyles = {};

export default RepositoryStyles;
