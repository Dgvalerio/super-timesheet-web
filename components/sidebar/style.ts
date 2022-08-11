import { UIStore } from '@/store/ui/slice';
import { Grid } from '@mui/material';

import { transparentize } from 'polished';
import styled from 'styled-components';

const Container = styled(Grid)`
  background-color: ${({ theme }): string =>
    theme.palette.mode === UIStore.ThemeMode.Light
      ? '#f1f2f7'
      : transparentize(0.98, '#f1f2f7')};

  .MuiList-root {
    padding: 1rem;

    .MuiListSubheader-root {
      background-color: transparent;
      text-transform: uppercase;
      font-size: 11px;
    }

    .MuiListItemButton-root {
      border-radius: 0.4rem;
      color: ${({ theme }): string => theme.palette.text.secondary};

      &.Mui-selected {
        color: ${({ theme }): string => theme.palette.primary.main};

        svg {
          fill: ${({ theme }): string => theme.palette.primary.main};
        }
      }

      .MuiListItemIcon-root {
        min-width: auto;
        margin-right: 0.8rem;
      }
    }
  }
`;

const SideBarStyles = { Container };

export default SideBarStyles;
