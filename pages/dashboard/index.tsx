import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Box, Grid } from '@mui/material';

import WorkedHoursCard from '@/components/dashboard/worked-hours-card';
import { useGetUserAzureInfosQuery } from '@/models/user/get';
import { useAppSelector } from '@/store/hooks';
import graphQLErrorsHandler from '@/utils/graphQLErrorsHandler';
import { routes } from '@/utils/pages';

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const { email } = useAppSelector(({ user }) => user);
  const { data, error } = useGetUserAzureInfosQuery(email);

  const goCreateAzureInfos = useCallback(
    () => void router.push(routes.azureInfos.create()),
    [router]
  );

  useEffect(() => {
    if (!data) return;

    if (!data.getUser.azureInfos) {
      goCreateAzureInfos();
      toast.error('Você não tem uma conta da azure configurada!');
    }
  }, [data, goCreateAzureInfos]);

  useEffect(() => graphQLErrorsHandler(error), [error]);

  return (
    <Box p={2}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Grid container>
        <Grid item xs={4}>
          <WorkedHoursCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
