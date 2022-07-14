import { NextPage } from 'next';

import MainWrapper from '@/components/main-wrapper';
import Styles from '@/styles/dashboard';
import { Grid, Typography } from '@mui/material';

const ListAppointmentsView: NextPage = () => {
  return (
    <MainWrapper title="Dashboard">
      <Styles.Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Seus apontamentos</Typography>
          </Grid>
        </Grid>
      </Styles.Container>
    </MainWrapper>
  );
};

export default ListAppointmentsView;
