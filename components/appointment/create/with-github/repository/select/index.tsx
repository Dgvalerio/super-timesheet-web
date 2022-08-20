import React, { useEffect, useState } from 'react';

import RepositoryCard from '@/components/appointment/create/with-github/repository/card';
import { getOrgRepositories } from '@/components/appointment/create/with-github/repository/controller';
import SelectRepositorySkeleton from '@/components/appointment/create/with-github/repository/select/skeleton';
import RepositoryStyles, {
  repositoryColor,
} from '@/components/appointment/create/with-github/repository/style';
import Repository from '@/components/appointment/create/with-github/repository/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';
import SelectedCard from '@/components/appointment/create/with-github/selected-card';
import InputField from '@/components/input-field';
import { Search as SearchIcon } from '@mui/icons-material';
import { Collapse, Grid, Typography } from '@mui/material';
import { PaginationProps } from '@mui/material/Pagination/Pagination';

const { Pagination } = RepositoryStyles;

const SelectRepository: Repository.Select = ({ selected, handleSelect }) => {
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository.List>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredRepositories =
    search.length > 0
      ? repositories.filter(({ name }) => name.includes(search))
      : repositories;

  const perPage = 10;

  const last = page * perPage;
  const first = last - perPage;
  const totalPages = Math.ceil(filteredRepositories.length / perPage);

  const handlePaginate: PaginationProps['onChange'] = (_, value) =>
    setPage(value);

  const handleReset = (): void => handleSelect(null);

  useEffect(() => {
    setLoading(true);
    getOrgRepositories()
      .then((response) => setRepositories(response))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Grid
        item
        xs={12}
        component={Collapse}
        in={!selected}
        sx={selected ? { padding: '0 !important' } : undefined}
      >
        <SectionTitle title="Repositórios" color={repositoryColor} />
        {loading ? (
          <SelectRepositorySkeleton />
        ) : (
          <>
            <Grid
              container
              spacing={2}
              minHeight={
                selected || filteredRepositories.length === 0 ? undefined : 496
              }
              alignContent="start"
            >
              <Grid item xs={12}>
                <InputField
                  variant="outlined"
                  value={search}
                  onChange={({ target }): void => setSearch(target.value)}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: `${repositoryColor} !important`,
                    },
                  }}
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
            {filteredRepositories.length > 0 && (
              <Grid container justifyContent="center">
                <Grid item>
                  <Pagination
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
        color={repositoryColor}
        name={selected}
        handleReset={handleReset}
      />
    </>
  );
};

export default SelectRepository;
