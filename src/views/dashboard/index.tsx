import { NextPage } from 'next';

import MainWrapper from '@/components/main-wrapper';
import useController from '@/controllers/dashboard';
import Styles from '@/styles/dashboard';
import { Grid, Typography } from '@mui/material';

const DashboardView: NextPage = () => {
  const { loading } = useController();

  return (
    <MainWrapper title={'Dashboard'} loading={loading}>
      <Styles.Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={7}>
            <Typography variant="h1">Dashboard</Typography>
          </Grid>
        </Grid>
      </Styles.Container>
    </MainWrapper>
  );
};

export default DashboardView;
