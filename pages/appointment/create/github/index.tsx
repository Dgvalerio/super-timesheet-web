import React, { FC, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { NextPage } from 'next';
import Head from 'next/head';

import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material';

import { authorizeLink, githubManager } from '@/api/github';
import CreateAppointmentForm from '@/components/appointment/create/with-github/appointment';
import SelectBranch from '@/components/appointment/create/with-github/branch/select';
import Branch from '@/components/appointment/create/with-github/branch/types';
import SelectCommits from '@/components/appointment/create/with-github/commit/select';
import Commit from '@/components/appointment/create/with-github/commit/types';
import SelectRepository from '@/components/appointment/create/with-github/repository/select';
import Repository from '@/components/appointment/create/with-github/repository/types';
import InputField from '@/components/input-field';
import {
  CreateGithubInfosForm,
  useCreateGithubInfosMutation,
} from '@/models/github-infos/create';
import { errorMessages, successMessages } from '@/utils/errorMessages';
import { ApolloError } from '@apollo/client';

const Unauthorized: FC = () => {
  const [saveInfos] = useCreateGithubInfosMutation();
  const [modalOn, setModalOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (): void => setModalOn(true);
  const closeModal = (): void => setModalOn(false);

  const handleSubmit = async (
    event: FormEvent<CreateGithubInfosForm>
  ): Promise<void> => {
    event.preventDefault();

    const {
      accessTokenInput: { value: accessToken },
    } = event.currentTarget;

    if (!accessToken) {
      toast.error(errorMessages.emptyFields);

      return;
    }

    setLoading(true);

    try {
      await saveInfos({ variables: { input: { access_token: accessToken } } });

      toast.success(successMessages.githubInfosCreated);

      closeModal();
    } catch (e) {
      (e as ApolloError).graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={2}>
      <Head>
        <title>Incluir com Github</title>
      </Head>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="h4">
            Para esse ação você precisa conectar ao Github.
          </Typography>
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Button
            variant="outlined"
            type="button"
            component="a"
            href={authorizeLink}
          >
            Conectar com o GitHub
          </Button>
        </Grid>
        <Grid item xs={12} />
        <Grid item onClick={openModal}>
          <Button variant="text">Ou gere manualmente um Github Token</Button>
        </Grid>
      </Grid>
      <Modal open={modalOn} sx={{ display: 'flex' }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid
            item
            xs={4}
            container
            component={Paper}
            sx={{ padding: 2 }}
            spacing={1}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h5">Salvar token</Typography>
            </Grid>
            <Grid item xs={12}>
              <InputField name="accessTokenInput" label="Access Token" />
            </Grid>
            <Grid item xs={12} />
            <Grid item>
              <Button
                variant="outlined"
                type="button"
                color="error"
                onClick={closeModal}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" type="submit" disabled={loading}>
                Salvar token
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
};

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

  if (!githubManager().logged) return <Unauthorized />;

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
