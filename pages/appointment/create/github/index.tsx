import React, { useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import SelectBranch from '@/components/appointment/create/with-github/branch/select';
import SelectRepository from '@/components/appointment/create/with-github/repository/select';
import { Box, Grid, Typography } from '@mui/material';

const CreateAppointmentWithGithubPage: NextPage = () => {
  const [repository, setRepository] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);

  const handleChangeRepository = (name: string | null): void =>
    setRepository(name);

  const handleChangeBranch = (name: string | null): void => setBranch(name);

  return (
    <Box p={2}>
      <Head>
        <title>Incluir com Github</title>
      </Head>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12}>
          <Typography variant="h5">
            Novo apontamento com base no Github
          </Typography>
        </Grid>
        <SelectRepository
          selected={repository}
          handleSelect={handleChangeRepository}
        />
        <SelectBranch
          repository={repository}
          selected={branch}
          handleSelect={handleChangeBranch}
        />
      </Grid>
    </Box>
  );
};

export default CreateAppointmentWithGithubPage;
