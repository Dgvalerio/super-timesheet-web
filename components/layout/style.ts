import { Box } from '@mui/material';

import styled from 'styled-components';

const Authenticated = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;

  > .MuiGrid-root.main {
    flex: 1;
  }
`;

const Unauthenticated = styled.main`
  margin: auto;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const LayoutStyle = { Authenticated, Unauthenticated };

export default LayoutStyle;
