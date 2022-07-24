import { NextPage } from 'next';
import Head from 'next/head';

import { InputField } from '@/components/input-field';
import Styles from '@/styles/auth/login';
import useController from '@/views/auth/login/controller';
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

const AuthLoginView: NextPage = () => {
  const { loading, goUserCreate, handleSubmit } = useController();

  return (
    <Styles.Container>
      <Head>
        <title>Login</title>
      </Head>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7}>
          <Typography variant="h1">Login</Typography>
        </Grid>
        <Grid
          item
          xs={7}
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item xs={12}>
            <InputField name="emailInput" label="E-mail" type="email" />
          </Grid>
          <Grid item xs={12}>
            <InputField
              name="passwordInput"
              label="Senha"
              type="password"
              inputProps={{ minLength: '8' }}
            />
          </Grid>
          <Grid item style={{ marginRight: 'auto' }}>
            <Button variant="outlined" type="button" onClick={goUserCreate}>
              Cadastrar
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" type="submit">
              Entrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Styles.Container>
  );
};

export default AuthLoginView;
