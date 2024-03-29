import React, { useEffect, useState } from 'react';

import { Search as SearchIcon } from '@mui/icons-material';
import { Collapse, Grid, Pagination, Typography } from '@mui/material';
import { PaginationProps } from '@mui/material/Pagination/Pagination';
import { ThemeProvider } from '@mui/material/styles';

import RepositoryCard from '@/components/appointment/create/with-github/repository/card';
import SelectRepositorySkeleton from '@/components/appointment/create/with-github/repository/select/skeleton';
import { repositoryTheme } from '@/components/appointment/create/with-github/repository/style';
import Repository from '@/components/appointment/create/with-github/repository/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';
import SelectedCard from '@/components/appointment/create/with-github/selected-card';
import InputField from '@/components/input-field';
import useGithubStore from '@/store/github';

const perPage = 10;

const SelectRepository: Repository.Select = ({ selected, handleSelect }) => {
  const { getOrganizationRepositories } = useGithubStore();
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository.List>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredRepositories =
    search.length > 0
      ? repositories.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase())
        )
      : repositories;

  const last = page * perPage;
  const first = last - perPage;
  const totalPages = Math.ceil(filteredRepositories.length / perPage);

  const handlePaginate: PaginationProps['onChange'] = (_, value) =>
    setPage(value);

  const handleReset = (): void => handleSelect(null);

  useEffect(() => {
    setLoading(true);
    getOrganizationRepositories()
      .then((response) => setRepositories(response))
      .finally(() => setLoading(false));
  }, [getOrganizationRepositories]);

  return (
    <ThemeProvider theme={repositoryTheme}>
      <Grid
        item
        xs={12}
        component={Collapse}
        in={!selected}
        sx={selected ? { padding: '0 !important' } : undefined}
      >
        <SectionTitle title="Repositórios" />
        {loading ? (
          <SelectRepositorySkeleton />
        ) : (
          <>
            <Grid
              container
              spacing={2}
              minHeight={
                selected ||
                filteredRepositories.length === 0 ||
                totalPages === 1
                  ? undefined
                  : 416
              }
              alignContent="start"
            >
              <Grid item xs={12}>
                <InputField
                  variant="outlined"
                  value={search}
                  onChange={({ target }): void => setSearch(target.value)}
                  color="primary"
                  colored
                  InputProps={{ endAdornment: <SearchIcon /> }}
                />
              </Grid>
              {filteredRepositories.slice(first, last).map((item) => (
                <RepositoryCard
                  key={item.id}
                  repository={item}
                  handleClick={handleSelect}
                />
              ))}
              {filteredRepositories.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="overline" align="center">
                    Não há projetos a serem exibidos.
                  </Typography>
                </Grid>
              )}
            </Grid>
            {filteredRepositories.length > 0 && totalPages > 1 && (
              <Grid container justifyContent="center">
                <Grid item>
                  <Pagination
                    color="primary"
                    count={totalPages}
                    page={page}
                    onChange={handlePaginate}
                  />
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Grid>
      <SelectedCard
        text="Repositório:"
        name={selected}
        handleReset={handleReset}
      />
    </ThemeProvider>
  );
};

export default SelectRepository;
