import React, { useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { Box, Button, Grid, Typography } from '@mui/material';

import { githubManager } from '@/api/github';
import CreateAppointmentForm from '@/components/appointment/create/with-github/appointment';
import SelectBranch from '@/components/appointment/create/with-github/branch/select';
import Branch from '@/components/appointment/create/with-github/branch/types';
import SelectCommits from '@/components/appointment/create/with-github/commit/select';
import Commit from '@/components/appointment/create/with-github/commit/types';
import SelectRepository from '@/components/appointment/create/with-github/repository/select';
import Repository from '@/components/appointment/create/with-github/repository/types';

const CreateAppointmentWithGithubPage: NextPage = () => {
  const [repository, setRepository] = useState<string | null>(null);
  const [branch, setBranch] = useState<Branch.Simple | null>(null);
  const [commits, setCommits] = useState<Commit.Simple[]>([]);
  const [commitsSelected, setCommitsSelected] =
    useState<Commit.ISelect['completed']>(false);

  const handleChangeRepository: Repository.ISelect['handleSelect'] = (name) =>
    setRepository(name);

  const handleChangeBranch: Branch.ISelect['handleSelect'] = (data) =>
    setBranch(data);

  const handleChangeCommits: Commit.ISelect['handleSelect'] = (commit) =>
    setCommits((prev) => {
      if (Array.isArray(commit)) return commit;

      const newData = prev.filter((item) => item.id !== commit.id);

      if (newData.length !== prev.length) return newData;
      else return prev.concat(commit);
    });

  if (!githubManager().logged) {
    return (
      <Box p={2}>
        <Head>
          <title>Incluir com Github</title>
        </Head>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Typography variant="h4">
              Para esse ação você precisa conectar ao Github.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              type="button"
              component="a"
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`}
            >
              Conectar com o GitHub
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Head>
        <title>Incluir com Github</title>
      </Head>
      <Grid container spacing={2} alignItems="stretch">
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
          completed={commitsSelected}
        />
        {commits.length > 0 && !commitsSelected && (
          <Grid item ml="auto">
            <Button
              variant="outlined"
              color="success"
              onClick={setCommitsSelected.bind(null, true)}
            >
              Gerar apontamento
            </Button>
          </Grid>
        )}
        {commitsSelected && <CreateAppointmentForm commits={commits} />}
      </Grid>
    </Box>
  );
};

export default CreateAppointmentWithGithubPage;
