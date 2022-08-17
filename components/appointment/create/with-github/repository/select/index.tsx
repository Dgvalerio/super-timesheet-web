import React, { FC, useEffect, useState } from 'react';

import RepositoryCard from '@/components/appointment/create/with-github/repository/card';
import { getOrgRepositories } from '@/components/appointment/create/with-github/repository/controller';
import SelectRepositorySkeleton from '@/components/appointment/create/with-github/repository/select/skeleton';
import RepositoryStyles, {
  repositoryColor,
} from '@/components/appointment/create/with-github/repository/style';
import Repository from '@/components/appointment/create/with-github/repository/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';
import SelectedCard from '@/components/appointment/create/with-github/selected-card';
import { Collapse, Grid } from '@mui/material';
import { PaginationProps } from '@mui/material/Pagination/Pagination';

const { Pagination } = RepositoryStyles;

const SelectRepository: FC<{
  selected: string | null;
  handleSelect(name: string | null): void;
}> = ({ selected, handleSelect }) => {
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository.List>([]);
  const [page, setPage] = useState(1);

  const perPage = 10;

  const last = page * perPage;
  const first = last - perPage;
  const totalPages = Math.ceil(repositories.length / perPage);

  const handlePaginate: PaginationProps['onChange'] = (_, value) =>
    setPage(value);

  useEffect(() => {
    setLoading(true);
    getOrgRepositories()
      .then((response) => setRepositories(response))
      .finally(() => setLoading(false));
  }, []);

  const handleReset = (): void => handleSelect(null);

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
          <Grid container spacing={2}>
            {repositories.slice(first, last).map((item) => (
              <RepositoryCard
                key={item.id}
                repository={item}
                handleClick={handleSelect}
              />
            ))}
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginate}
              />
            </Grid>
          </Grid>
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
