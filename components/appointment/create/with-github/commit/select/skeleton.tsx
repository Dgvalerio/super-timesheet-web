import React, { FC } from 'react';

import { commitColor } from '@/components/appointment/create/with-github/commit/style';
import { Card, Grid, Skeleton } from '@mui/material';

const SelectCommitSkeleton: FC = () => (
  <Grid container spacing={2}>
    {[...new Array(4)].map((_, i) => (
      <Grid key={i} item xs={12} sm={6}>
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 2,
            borderColor: commitColor,
          }}
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

export default SelectCommitSkeleton;
