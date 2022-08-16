import React, { FC, useEffect, useState } from 'react';

import RepositoryCard from '@/components/appointment/create/with-github/repository/card';
import getUserRepositories from '@/components/appointment/create/with-github/repository/controller';
import SelectRepositorySkeleton from '@/components/appointment/create/with-github/repository/select/skeleton';
import { repositoryColor } from '@/components/appointment/create/with-github/repository/style';
import Repository from '@/components/appointment/create/with-github/repository/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';
import SelectedCard from '@/components/appointment/create/with-github/selected-card';
import { Collapse, Grid } from '@mui/material';

// todo: pegar com o login
const userName = 'Dgvalerio';

const SelectRepository: FC<{
  selected: string | null;
  handleSelect(name: string | null): void;
}> = ({ selected, handleSelect }) => {
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository.List>([]);

  useEffect(() => {
    if (!userName) return setLoading(false);

    setLoading(true);
    getUserRepositories(userName)
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
            {repositories.map((item) => (
              <RepositoryCard
                key={item.id}
                repository={item}
                handleClick={handleSelect}
              />
            ))}
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
