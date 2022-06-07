import { FC } from 'react';

import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

export const InputField: FC<TextFieldProps> = ({ ...props }) => (
  <TextField type="text" variant="outlined" required fullWidth {...props} />
);
