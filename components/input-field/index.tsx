import { FC } from 'react';

import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import styled from 'styled-components';

const Input = styled(TextField)`
  & > div > input::-webkit-calendar-picker-indicator {
    filter: ${({ theme }) =>
      theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)'};
  }
`;

export const InputField: FC<TextFieldProps> = ({ ...props }) => (
  <Input type="text" variant="outlined" required fullWidth {...props} />
);