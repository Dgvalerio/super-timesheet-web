import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

import InputField from '@/components/input-field';
import { Login, useLoginMutation } from '@/models/auth/login';
import useGithubStore from '@/store/github';
import { useAppDispatch } from '@/store/hooks';
import { saveUser } from '@/store/user/actions';
import { errorMessages, successMessages } from '@/utils/errorMessages';
import { routes } from '@/utils/pages';
import { ApolloError } from '@apollo/client';

const AuthLoginPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { saveGithubToken } = useGithubStore();

  const [login] = useLoginMutation();

  const [loading, setLoading] = useState(false);

  const goUserCreate = (): void => {
    setLoading(true);
    void router.push(routes.user.create());
  };

  const handleSubmit = async (event: FormEvent<Login.Form>): Promise<void> => {
    event.preventDefault();

    const {
      emailInput: { value: email },
      passwordInput: { value: password },
    } = event.currentTarget;

    if (!email || !password) {
      toast.error(errorMessages.emptyFields);

      return;
    }

    setLoading(true);

    try {
      const { data } = await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      if (data && data.login.token) {
        dispatch(saveUser(data.login));

        if (data.login.user.githubInfos?.access_token) {
          saveGithubToken(data.login.user.githubInfos.access_token);
        }

        toast.success(successMessages.userSigned);

        await router.push(routes.dashboard());
      }
    } catch (e) {
      const { message } = (e as ApolloError).graphQLErrors[0];

      toast.error(message);

      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
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
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AuthLoginPage;
