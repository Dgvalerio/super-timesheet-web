import styled from '@emotion/styled';
import { Pagination as PaginationMUI } from '@mui/material';
import { blue } from '@mui/material/colors';

import { transparentize } from 'polished';

export const repositoryColor = transparentize(0.3, blue['900']);

const Pagination = styled(PaginationMUI)`
  .Mui-selected.MuiPaginationItem-page {
    background-color: ${repositoryColor};
  }
`;

const RepositoryStyles = { Pagination };

export default RepositoryStyles;
