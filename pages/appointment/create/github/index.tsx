import React, { FC, useEffect, useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import octokit from '@/api/github';
import { KeyboardArrowRight } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Endpoints } from '@octokit/types';

namespace Repository {
  export type Endpoint = Endpoints['GET /users/{username}/repos'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];
}

const getUserRepositories = async (): Promise<Repository.List> => {
  const {
    data: { public_repos: publicRepos, total_private_repos: totalPrivateRepos },
  } = await octokit.request('GET /user');

  const response = await octokit.request('GET /users/{username}/repos', {
    username: 'Dgvalerio',
    per_page: publicRepos + (totalPrivateRepos || 0),
  });

  return response.data;
};

const RepositoryCard: FC<{
  repository: Repository.Model;
  handleClick: (name: string) => void;
}> = ({ repository, handleClick }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          paddingRight: 1,
          height: '100%',
          alignItems: 'center',
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5">{repository.name}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleClick.bind(null, repository.name)}>
            <KeyboardArrowRight />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

const CreateAppointmentWithGithubPage: NextPage = () => {
  const [repositories, setRepositories] = useState<Repository.List>([]);
  const [selectedRepository, setSelectedRepository] = useState<string | null>(
    null
  );

  useEffect(() => {
    getUserRepositories().then((response) => setRepositories(response));
  }, []);

  return (
    <Box p={2}>
      <Head>
        <title>Incluir com Github</title>
      </Head>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12}>
          <Typography variant="h6">
            Novo apontamento com base no Github
          </Typography>
        </Grid>
        {selectedRepository && (
          <Grid item xs={12}>
            <Typography variant="h6">
              Repositório: {selectedRepository}
            </Typography>
          </Grid>
        )}
        {repositories.map((item) => (
          <RepositoryCard
            key={item.id}
            repository={item}
            handleClick={setSelectedRepository}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default CreateAppointmentWithGithubPage;
