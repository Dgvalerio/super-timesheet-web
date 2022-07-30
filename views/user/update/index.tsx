import React from 'react';

import { NextPage } from 'next';

import MainWrapper from '@/components/main-wrapper';
import Styles from '@/styles/user/create';
import UpdateUserForm from '@/views/user/update/components/form';
import { Grid, Typography } from '@mui/material';

const UserUpdateView: NextPage = () => (
  <MainWrapper title="Editar perfil">
    <Styles.Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Editar perfil</Typography>
        </Grid>
        <UpdateUserForm />
      </Grid>
    </Styles.Container>
  </MainWrapper>
);

export default UserUpdateView;
