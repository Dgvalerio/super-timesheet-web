import { Theme } from '@/components/style-wrapper/theme';
import theme from '@/styles/theme';
import { blue } from '@mui/material/colors';

import { transparentize } from 'polished';

export const repositoryColor = transparentize(0.3, blue['900']);

export const repositoryTheme = ((): Theme => {
  const aux = theme;

  aux.palette.primary.main = repositoryColor;

  return aux;
})();

const RepositoryStyles = {};

export default RepositoryStyles;
