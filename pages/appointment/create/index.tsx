import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { Box, Divider, Grid, Typography } from '@mui/material';

import CreateAppointmentForm from '@/components/appointment/create/form';
import AppointmentsList from '@/components/appointment/create/list';

const CreateAppointmentPage: NextPage = () => (
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

export default CreateAppointmentPage;
