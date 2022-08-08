import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import Styles from '@/components/layout/style';
import UpdateUserForm from '@/components/user/update/form';
import { Grid, Typography } from '@mui/material';

const UserUpdatePage: NextPage = () => (
  <Styles.Unauthenticated>
    <Head>
      <title>Editar perfil</title>
    </Head>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Editar perfil</Typography>
      </Grid>
      <UpdateUserForm />
    </Grid>
  </Styles.Unauthenticated>
);

export default UserUpdatePage;
