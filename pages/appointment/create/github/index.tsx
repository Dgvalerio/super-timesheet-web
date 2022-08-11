import React, { FC, useEffect, useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import octokit from '@/api/github';
import { KeyboardArrowRight, Edit } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { blue, orange } from '@mui/material/colors';
import { Endpoints } from '@octokit/types';

import { transparentize } from 'polished';

namespace Repository {
  export type Endpoint = Endpoints['GET /users/{username}/repos'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];
}

namespace Branch {
  export type Endpoint = Endpoints['GET /repos/{owner}/{repo}/branches'];
  export type Response = Endpoint['response'];
  export type List = Response['data'];
  export type Model = List[number];
}

const repositoryColor = transparentize(0.3, blue['900']);
const branchColor = transparentize(0.3, orange['900']);

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

const getRepositoryBranches = async (
  owner: string,
  repo: string
): Promise<Branch.List> => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
    owner,
    repo,
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
          borderColor: repositoryColor,
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

const BranchCard: FC<{
  branch: Branch.Model;
  handleClick: (name: string) => void;
}> = ({ branch, handleClick }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          paddingRight: 1,
          height: '100%',
          alignItems: 'center',
          borderColor: branchColor,
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5">{branch.name}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleClick.bind(null, branch.name)}>
            <KeyboardArrowRight />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

const SectionTitle: FC<{ title: string; color: string }> = ({
  title,
  color,
}) => (
  <Divider
    sx={{
      marginBottom: 2,
      ':before': { borderColor: color },
      ':after': { borderColor: color },
    }}
  >
    <Typography variant="h6">{title}</Typography>
  </Divider>
);

const CreateAppointmentWithGithubPage: NextPage = () => {
  const [repositories, setRepositories] = useState<Repository.List>([]);
  const [selectedRepository, setSelectedRepository] = useState<string | null>(
    null
  );
  const [branches, setBranches] = useState<Branch.List>([]);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  useEffect(() => {
    getUserRepositories().then((response) => setRepositories(response));
  }, []);

  const handleSelectRepository = (repositoryName: string): void => {
    getRepositoryBranches('Dgvalerio', repositoryName).then((response) =>
      setBranches(response)
    );
    setSelectedRepository(repositoryName);
  };

  const resetRepository = (): void => {
    resetBranch();
    setSelectedRepository(null);
  };

  const handleSelectBranch = (branchName: string): void => {
    setSelectedBranch(branchName);
  };

  const resetBranch = (): void => {
    setSelectedBranch(null);
  };

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
        <Grid
          item
          xs={12}
          component={Collapse}
          in={!selectedRepository}
          sx={selectedRepository ? { padding: '0 !important' } : undefined}
        >
          <SectionTitle title="Repositórios" color={repositoryColor} />
          <Grid container spacing={2} mt={2}>
            {repositories.map((item) => (
              <RepositoryCard
                key={item.id}
                repository={item}
                handleClick={handleSelectRepository}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} component={Collapse} in={!!selectedRepository}>
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              paddingRight: 1,
              height: '100%',
              alignItems: 'center',
              borderColor: repositoryColor,
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">
                Repositório:
                <Typography variant="body1" component="span" ml={1}>
                  {selectedRepository}
                </Typography>
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={resetRepository}>
                <Edit />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        {selectedRepository && (
          <>
            <Grid
              item
              xs={12}
              component={Collapse}
              in={!selectedBranch}
              sx={selectedBranch ? { padding: '0 !important' } : undefined}
            >
              <SectionTitle title="Branches" color={branchColor} />
              <Grid container spacing={2}>
                {branches.map((item) => (
                  <BranchCard
                    key={item.name}
                    branch={item}
                    handleClick={handleSelectBranch}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} component={Collapse} in={!!selectedBranch}>
              <Card
                variant="outlined"
                sx={{
                  display: 'flex',
                  paddingRight: 1,
                  height: '100%',
                  alignItems: 'center',
                  borderColor: branchColor,
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">
                    Branch:
                    <Typography variant="body1" component="span" ml={1}>
                      {selectedBranch}
                    </Typography>
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={resetBranch}>
                    <Edit />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default CreateAppointmentWithGithubPage;
