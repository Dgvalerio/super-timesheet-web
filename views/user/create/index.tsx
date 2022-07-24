import { NextPage } from 'next';
import Head from 'next/head';

import { InputField } from '@/components/input-field';
import Styles from '@/styles/user/create';
import useController from '@/views/user/create/controller';
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';

const UserCreateView: NextPage = () => {
  const { loading, goLogin, handleSubmit } = useController();

  return (
    <Styles.Container>
      <Head>
        <title>Cadastro</title>
      </Head>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7}>
          <Typography variant="h1">Cadastro</Typography>
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
            <InputField name="nameInput" label="Nome" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="emailInput" label="E-mail" type="email" />
          </Grid>
          <Grid item xs={12}>
            <InputField
              name="dailyHoursInput"
              label="Carga horária diária"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">horas</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              name="passwordInput"
              label="Senha"
              type="password"
              inputProps={{ minLength: '8' }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              name="passwordConfirmationInput"
              label="Confirmação de senha"
              type="password"
              inputProps={{ minLength: '8' }}
            />
          </Grid>
          <Grid item style={{ marginRight: 'auto' }}>
            <Button variant="outlined" type="button" onClick={goLogin}>
              Voltar
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" type="submit">
              Cadastrar
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

export default UserCreateView;
