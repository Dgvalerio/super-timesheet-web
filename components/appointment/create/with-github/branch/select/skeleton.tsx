import React, { FC } from 'react';

import { Card, Grid, Skeleton } from '@mui/material';

import { branchColor } from '@/components/appointment/create/with-github/branch/style';

const SelectBranchSkeleton: FC = () => (
  <Grid container spacing={2}>
    {[...new Array(4)].map((_, i) => (
      <Grid key={i} item xs={12} sm={6}>
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 2,
            borderColor: branchColor,
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

export default SelectBranchSkeleton;
