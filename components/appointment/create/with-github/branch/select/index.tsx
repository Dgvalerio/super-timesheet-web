import React, { useEffect, useState } from 'react';

import { Collapse, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import BranchCard from '@/components/appointment/create/with-github/branch/card';
import getRepositoryBranches from '@/components/appointment/create/with-github/branch/controller';
import SelectBranchSkeleton from '@/components/appointment/create/with-github/branch/select/skeleton';
import { branchTheme } from '@/components/appointment/create/with-github/branch/style';
import Branch from '@/components/appointment/create/with-github/branch/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';
import SelectedCard from '@/components/appointment/create/with-github/selected-card';

const SelectBranch: Branch.Select = ({
  repository,
  selected,
  handleSelect,
}) => {
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<Branch.List>([]);

  useEffect(() => {
    if (!repository) return setLoading(false);

    setLoading(true);
    getRepositoryBranches(repository)
      .then((response) => setBranches(response))
      .finally(() => setLoading(false));
  }, [repository]);

  const handleReset = (): void => handleSelect(null);

  if (!repository) {
    if (selected) handleReset();

    return <></>;
  }

  return (
    <ThemeProvider theme={branchTheme}>
      <Grid
        item
        xs={12}
        component={Collapse}
        in={!selected}
        sx={selected ? { padding: '0 !important' } : undefined}
      >
        <SectionTitle title="Branches" />
        {loading ? (
          <SelectBranchSkeleton />
        ) : (
          <Grid container spacing={2}>
            {branches.map((item) => (
              <BranchCard
                key={item.name}
                branch={item}
                handleClick={handleSelect}
              />
            ))}
          </Grid>
        )}
      </Grid>
      <SelectedCard
        text="Branch:"
        name={selected?.name || null}
        handleReset={handleReset}
      />
    </ThemeProvider>
  );
};

export default SelectBranch;
