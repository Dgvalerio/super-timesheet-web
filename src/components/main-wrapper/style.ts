import { Box } from '@mui/material';

import styled from 'styled-components';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;

  > .MuiGrid-root.main {
    flex: 1;
  }
`;

const MainWrapperStyle = { Container };

export default MainWrapperStyle;
