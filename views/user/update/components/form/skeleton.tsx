import React, { FC } from 'react';

import { Button, Grid, Skeleton } from '@mui/material';

const FormSkeleton: FC = () => (
  <Grid item xs={12} container spacing={2} justifyContent="space-between">
    <Grid item xs={12}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton width="100%" height={56} sx={{ transform: 'none' }} />
    </Grid>
    <Grid item />
    <Grid item>
      <Skeleton height={36} sx={{ transform: 'none' }}>
        <Button variant="outlined" disabled>
          Atualizar
        </Button>
      </Skeleton>
    </Grid>
  </Grid>
);

export default FormSkeleton;
