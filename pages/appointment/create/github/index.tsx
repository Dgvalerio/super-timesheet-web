import React, { useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import SelectBranch from '@/components/appointment/create/with-github/branch/select';
import SelectCommits from '@/components/appointment/create/with-github/commit/select';
import Commit from '@/components/appointment/create/with-github/commit/types';
import SelectRepository from '@/components/appointment/create/with-github/repository/select';
import { Box, Grid, Typography } from '@mui/material';

const CreateAppointmentWithGithubPage: NextPage = () => {
  const [repository, setRepository] = useState<string | null>(null);
  const [branch, setBranch] = useState<{ name: string; sha: string } | null>(
    null
  );
  const [commits, setCommits] = useState<Commit.List>([]);

  const handleChangeRepository = (name: string | null): void =>
    setRepository(name);

  const handleChangeBranch = (
    data: { name: string; sha: string } | null
  ): void => setBranch(data);

  const handleChangeCommits = (data: Commit.List): void => setCommits(data);

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
        <SelectCommits
          repository={repository}
          branchSha={branch?.sha || null}
          selected={commits}
          handleSelect={handleChangeCommits}
        />
      </Grid>
    </Box>
  );
};

export default CreateAppointmentWithGithubPage;
