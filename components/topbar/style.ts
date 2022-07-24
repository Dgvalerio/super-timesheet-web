import { UIStore } from '@/store/ui/slice';
import { Grid } from '@mui/material';

import { transparentize } from 'polished';
import styled from 'styled-components';

const Container = styled(Grid)`
  z-index: 1299;
  box-shadow: 0 0 2px
    ${({ theme }) =>
      theme.palette.mode === UIStore.ThemeMode.Light
        ? '#c8cbd9'
        : transparentize(0.8, '#c8cbd9')};

  > .logo {
    background-color: ${({ theme }) =>
      theme.palette.mode === UIStore.ThemeMode.Light
        ? '#f1f2f7'
        : transparentize(0.98, '#f1f2f7')};
    padding: 0.4rem 1.5rem;

    h6 {
      color: ${({ theme }) => theme.palette.text.secondary};
      text-transform: none;
    }
  }
`;

const SideBarStyles = { Container };

export default SideBarStyles;
