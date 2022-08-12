import React, { FC } from 'react';

import { Divider, Typography } from '@mui/material';

const SectionTitle: FC<{ title: string; color: string }> = ({
  title,
  color,
}) => (
  <Divider
    sx={{
      marginBottom: 2,
      ':before': { borderColor: color },
      ':after': { borderColor: color },
    }}
  >
    <Typography variant="h6">{title}</Typography>
  </Divider>
);

export default SectionTitle;
