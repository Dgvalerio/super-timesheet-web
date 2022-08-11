import { UIStore } from '@/store/ui/slice';
import { Grid } from '@mui/material';
import { Box, CardContent } from '@mui/material';

import { transparentize } from 'polished';
import styled from 'styled-components';

const Container = styled(Grid)`
  z-index: 1299;
  box-shadow: 0 0 2px
    ${({ theme }): string =>
      theme.palette.mode === UIStore.ThemeMode.Light
        ? '#c8cbd9'
        : transparentize(0.8, '#c8cbd9')};

  > .logo {
    background-color: ${({ theme }): string =>
      theme.palette.mode === UIStore.ThemeMode.Light
        ? '#f1f2f7'
        : transparentize(0.98, '#f1f2f7')};
    padding: 0.4rem 1.5rem;

    h6 {
      color: ${({ theme }): string => theme.palette.text.secondary};
      text-transform: none;
    }
  }
`;

const Content = styled(CardContent)`
  padding-bottom: 0 !important;
  display: flex;
  flex-direction: row;
`;

const ArrowIconBox = styled(Box)<{ collapsed?: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-right: -1rem;
  ${({ collapsed }): string => (!collapsed ? `padding-bottom: 1rem;` : '')}
`;

const StatusIconBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  gap: 1rem;
`;

const TopBarStyled = {
  Container,
  Content,
  ArrowIconBox,
  StatusIconBox,
};

export default TopBarStyled;
