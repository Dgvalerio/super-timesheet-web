import React, { useEffect, useState } from 'react';

import CommitCard from '@/components/appointment/create/with-github/commit/card';
import getBranchCommits from '@/components/appointment/create/with-github/commit/controller';
import SelectCommitSkeleton from '@/components/appointment/create/with-github/commit/select/skeleton';
import { commitColor } from '@/components/appointment/create/with-github/commit/style';
import Commit from '@/components/appointment/create/with-github/commit/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';
import { Collapse, Grid } from '@mui/material';

// todo: pegar com o login
const userName = 'Dgvalerio';

const SelectCommits: Commit.Select = ({
  repository,
  branchSha,
  selected,
  handleSelect,
}) => {
  const [loading, setLoading] = useState(true);
  const [commits, setCommits] = useState<Commit.List>([]);

  useEffect(() => {
    if (!repository || !branchSha) return setLoading(false);

    setLoading(true);
    getBranchCommits(userName, repository, branchSha)
      .then((response) => setCommits(response))
      .finally(() => setLoading(false));
  }, [branchSha, repository]);

  const handleReset = (): void => handleSelect([]);

  if (!repository || !branchSha) {
    if (selected.length > 0) handleReset();

    return <></>;
  }

  return (
    <>
      <Grid
        item
        xs={12}
        component={Collapse}
        in={selected.length === 0}
        sx={selected.length > 0 ? { padding: '0 !important' } : undefined}
      >
        <SectionTitle title="Commits" color={commitColor} />
        {loading ? (
          <SelectCommitSkeleton />
        ) : (
          <Grid container spacing={2}>
            {commits.map((item) => (
              <CommitCard key={item.node_id} commit={item} />
            ))}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SelectCommits;