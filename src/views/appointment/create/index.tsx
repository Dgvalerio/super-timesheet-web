import React from 'react';

import { NextPage } from 'next';

import MainWrapper from '@/components/main-wrapper';
import Styles from '@/styles/dashboard';
import CreateAppointmentForm from '@/views/appointment/create/components/form';
import AppointmentsList from '@/views/appointment/create/components/list';
import { Divider, Grid, Typography } from '@mui/material';

const CreateAppointmentView: NextPage = () => (
  <MainWrapper title="Dashboard">
    <Styles.Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Novo apontamento</Typography>
        </Grid>
        <CreateAppointmentForm />
        <Grid item xs={12} mb={2}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Apontamentos anteriores</Typography>
        </Grid>
        <AppointmentsList />
      </Grid>
    </Styles.Container>
  </MainWrapper>
);

export default CreateAppointmentView;
