import React, { FC, useEffect, useState } from 'react';

import BranchCard from '@/components/appointment/create/with-github/branch/card';
import getRepositoryBranches from '@/components/appointment/create/with-github/branch/controller';
import SelectBranchSkeleton from '@/components/appointment/create/with-github/branch/select/skeleton';
import { branchColor } from '@/components/appointment/create/with-github/branch/style';
import Branch from '@/components/appointment/create/with-github/branch/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';
import SelectedCard from '@/components/appointment/create/with-github/selected-card';
import { Collapse, Grid } from '@mui/material';

const SelectBranch: FC<{
  repository: string | null;
  selected: Branch.Simple | null;
  handleSelect(name: Branch.Simple | null): void;
}> = ({ repository, selected, handleSelect }) => {
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
    <>
      <Grid
        item
        xs={12}
        component={Collapse}
        in={!selected}
        sx={selected ? { padding: '0 !important' } : undefined}
      >
        <SectionTitle title="Branches" color={branchColor} />
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
        color={branchColor}
        name={selected?.name || null}
        handleReset={handleReset}
      />
    </>
  );
};

export default SelectBranch;
