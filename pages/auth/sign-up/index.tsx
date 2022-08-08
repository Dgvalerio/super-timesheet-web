import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { InputField } from '@/components/input-field';
import { CreateUserForm, useCreateUserMutation } from '@/models/user/create';
import { errorMessages, successMessages } from '@/utils/errorMessages';
import { routes } from '@/utils/pages';
import { ApolloError } from '@apollo/client';
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';

const UserCreatePage: NextPage = () => {
  const router = useRouter();

  const [createUser] = useCreateUserMutation();

  const [loading, setLoading] = useState(false);

  const goLogin = (): void => {
    setLoading(true);
    void router.push(routes.auth.login());
  };

  const handleSubmit = async (
    event: FormEvent<CreateUserForm>
  ): Promise<void> => {
    event.preventDefault();

    const {
      nameInput: { value: name },
      emailInput: { value: email },
      passwordInput: { value: password },
      dailyHoursInput: { value: dailyHours },
      passwordConfirmationInput: { value: passwordConfirmation },
    } = event.currentTarget;

    if (!name || !email || !dailyHours || !password || !passwordConfirmation) {
      toast.error(errorMessages.emptyFields);

      return;
    }

    setLoading(true);

    try {
      const { data } = await createUser({
        variables: {
          input: {
            name,
            email,
            dailyHours: +dailyHours,
            password,
            passwordConfirmation,
          },
        },
      });

      if (data && data.createUser.id) {
        toast.success(successMessages.userCreated);

        goLogin();
      }
    } catch (e) {
      const { message } = (e as ApolloError).graphQLErrors[0];

      toast.error(message);
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
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
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default UserCreatePage;
