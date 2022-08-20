import { FC, ReactNode } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiProvider } from '@mui/material/styles';

import useStyleWrapperController from '@/components/style-wrapper/controller';
import GlobalStyle from '@/styles/global';

import { ThemeProvider as StyledProvider } from 'styled-components';

const StyleWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useStyleWrapperController();

  return (
    <MuiProvider theme={theme}>
      <CssBaseline />
      <StyledProvider theme={theme}>
        {children}
        <GlobalStyle />
      </StyledProvider>
    </MuiProvider>
  );
};

export default StyleWrapper;
