import React, { FC } from 'react';

import { repositoryColor } from '@/components/appointment/create/with-github/repository/style';
import { Card, Grid, Skeleton } from '@mui/material';

const style = { display: 'flex', padding: 2, borderColor: repositoryColor };

const SelectRepositorySkeleton: FC = () => (
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

export default SelectRepositorySkeleton;
