import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { InputField } from '@/components/input-field';
import Styles from '@/components/layout/style';
import WatchUpdateDataModal from '@/components/topbar/components/watch-update-data-modal';
import useController from '@/views/azure-infos/create/controller';
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

const AzureInfosCreateView: NextPage = () => {
  const { loading, handleSubmit, createAzureInfosLoading, watchUpdateData } =
    useController();

  return (
    <Styles.Unauthenticated>
      <Head>
        <title>Configurar dados do Timesheet</title>
      </Head>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7}>
          <Typography variant="h3">Configurar Timesheet</Typography>
          <Typography variant="body1">
            Ao que parece, é a primeira vez que você acessa o sistema, sendo
            assim, faz-se necessário realizar o login do Timesheet Oficial.
          </Typography>
          <Typography variant="body1" paragraph>
            O login é essencial para importar seus clientes, projetos,
            categorias, e é claro, seus apontamentos anteriores.
          </Typography>
        </Grid>
        <Grid
          item
          xs={7}
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
          aria-autocomplete="none"
        >
          <Grid item xs={12}>
            <InputField name="loginInput" label="Login" type="email" />
          </Grid>
          <Grid item xs={12}>
            <InputField
              name="passwordInput"
              label="Senha"
              type="password"
              inputProps={{ minLength: '8' }}
            />
          </Grid>
          <Grid item style={{ marginLeft: 'auto' }}>
            <Button variant="outlined" type="submit">
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {watchUpdateData?.watchImportData && (
        <WatchUpdateDataModal
          open={createAzureInfosLoading}
          watchUpdateData={watchUpdateData}
        />
      )}
    </Styles.Unauthenticated>
  );
};

export default AzureInfosCreateView;
