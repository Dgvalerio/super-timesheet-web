import React, { FormEvent, useCallback, useEffect, useState } from 'react';
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
import Styles from '@/components/layout/style';
import WatchUpdateDataModal from '@/components/topbar/components/watch-update-data-modal';
import {
  CreateAzureInfosForm,
  useCreateAzureInfosMutation,
} from '@/models/azure-infos/create';
import { useUpdateDataSubscription } from '@/models/scrapper/update';
import { useGetUserAzureInfosQuery } from '@/models/user/get';
import { useAppSelector } from '@/store/hooks';
import { errorMessages, successMessages } from '@/utils/errorMessages';
import graphQLErrorsHandler from '@/utils/graphQLErrorsHandler';
import { routes } from '@/utils/pages';
import { ApolloError } from '@apollo/client';

const AzureInfosCreatePage: NextPage = () => {
  const router = useRouter();
  const { id, email } = useAppSelector(({ user }) => user);
  const { data, error } = useGetUserAzureInfosQuery(email);
  const [createAzureInfos, { loading: createAzureInfosLoading }] =
    useCreateAzureInfosMutation();
  const { data: watchUpdateData } = useUpdateDataSubscription();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<CreateAzureInfosForm>
  ): Promise<void> => {
    event.preventDefault();

    const {
      loginInput: { value: login },
      passwordInput: { value: password },
    } = event.currentTarget;

    if (!login || !password || !id) {
      toast.error(errorMessages.emptyFields);

      return;
    }

    setLoading(true);

    try {
      const { data } = await createAzureInfos({
        variables: { input: { login, password, userId: id } },
      });

      if (data && data.createAzureInfos.id) {
        toast.success(successMessages.azureInfosCreated);

        await router.push(routes.system.operation());
      }
    } catch (e) {
      const { message } = (e as ApolloError).graphQLErrors[0];

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const goHome = useCallback(
    () => void router.push(routes.dashboard()),
    [router]
  );

  useEffect(() => {
    if (!data) return;

    if (data.getUser.azureInfos) {
      goHome();
      toast.error('Você já tem uma conta da azure configurada!');
    }
  }, [data, goHome]);

  useEffect(() => graphQLErrorsHandler(error), [error]);

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
            <InputField name="passwordInput" label="Senha" type="password" />
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
        <WatchUpdateDataModal open={createAzureInfosLoading} />
      )}
    </Styles.Unauthenticated>
  );
};

export default AzureInfosCreatePage;
