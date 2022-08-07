import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import CreateAppointmentForm from '@/views/appointment/create/components/form';
import AppointmentsList from '@/views/appointment/create/components/list';
import { Box, Divider, Grid, Typography } from '@mui/material';

const CreateAppointmentView: NextPage = () => (
  <Box p={2}>
    <Head>
      <title>Incluir apontamento</title>
    </Head>
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
  </Box>
);

export default CreateAppointmentView;
