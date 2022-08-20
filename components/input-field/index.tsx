import { FC } from 'react';

import { TextField, useTheme } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import styled from 'styled-components';

const Input = styled(TextField)`
  & > div > input::-webkit-calendar-picker-indicator {
    filter: ${({ theme }): string =>
      theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)'};
  }
`;

const InputField: FC<TextFieldProps & { colored?: boolean }> = ({
  colored,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Input
      type="text"
      variant="outlined"
      required
      fullWidth
      sx={
        colored
          ? {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }
          : undefined
      }
      {...props}
    />
  );
};

export default InputField;
