import React, { FC } from 'react';

import { Divider, Typography, useTheme } from '@mui/material';

const SectionTitle: FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();

  const borderColor = theme.palette.primary.main;

  return (
    <Divider
      sx={{
        marginBottom: 2,
        ':before': { borderColor },
        ':after': { borderColor },
      }}
    >
      <Typography variant="h6">{title}</Typography>
    </Divider>
  );
};

export default SectionTitle;
