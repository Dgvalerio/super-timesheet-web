import React from 'react';

import { Grid, Skeleton } from '@mui/material';

const AppointmentsListSkeleton = () => (
  <Grid item xs={12} container spacing={2} justifyContent="space-between">
    <Grid item xs={10}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={2} container spacing={1}>
      <Grid item xs={12}>
        <Skeleton
          variant="text"
          width="100%"
          height={32}
          sx={{ transform: 'none' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="text"
          width="100%"
          height={14}
          sx={{ transform: 'none' }}
        />
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Skeleton width="100%" height={128} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton width="100%" height={128} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton width="100%" height={128} sx={{ transform: 'none' }} />
    </Grid>
  </Grid>
);

export default AppointmentsListSkeleton;
