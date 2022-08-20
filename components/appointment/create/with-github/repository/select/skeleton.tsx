import React, { FC } from 'react';

import { Card, Grid, Skeleton, useTheme } from '@mui/material';

const SelectRepositorySkeleton: FC = () => {
  const theme = useTheme();

  const style = {
    display: 'flex',
    padding: 2,
    borderColor: theme.palette.primary.main,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined" sx={{ ...style, justifyContent: 'end' }}>
          <Skeleton
            width={24}
            height={24}
            sx={{ transform: 'none' }}
            variant="circular"
          />
        </Card>
      </Grid>
      {[...new Array(4)].map((_, i) => (
        <Grid key={i} item xs={12} sm={6}>
          <Card
            variant="outlined"
            sx={{ ...style, justifyContent: 'space-between' }}
          >
            <Skeleton width={256} height={24} sx={{ transform: 'none' }} />
            <Skeleton
              width={24}
              height={24}
              sx={{ transform: 'none' }}
              variant="circular"
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SelectRepositorySkeleton;
