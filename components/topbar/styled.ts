import styled from '@emotion/styled';
import { Box, CardContent } from '@mui/material';

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
  ${({ collapsed }) => !collapsed && `padding-bottom: 1rem;`}
`;

const StatusIconBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  gap: 1rem;
`;

const TopBarStyled = {
  Content,
  ArrowIconBox,
  StatusIconBox,
};

export default TopBarStyled;
