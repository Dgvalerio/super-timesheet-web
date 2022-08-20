import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import CommitCard from '@/components/appointment/create/with-github/commit/card';
import getBranchCommits from '@/components/appointment/create/with-github/commit/controller';
import SelectCommitSkeleton from '@/components/appointment/create/with-github/commit/select/skeleton';
import { commitTheme } from '@/components/appointment/create/with-github/commit/style';
import Commit from '@/components/appointment/create/with-github/commit/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';

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
    getBranchCommits(repository, branchSha)
      .then((response) => setCommits(response))
      .finally(() => setLoading(false));
  }, [branchSha, repository]);

  const handleReset = (): void => handleSelect([]);

  const hasSelected = (id: string): boolean =>
    !!selected.find((item) => item.node_id === id);

  if (!repository || !branchSha) {
    if (selected.length > 0) handleReset();

    return <></>;
  }

  const footerText =
    selected.length +
    (selected.length > 1 ? ' foram selecionados' : ' foi selecionado');

  return (
    <ThemeProvider theme={commitTheme}>
      <Grid item xs={12}>
        <SectionTitle title="Commits" />
        {loading ? (
          <SelectCommitSkeleton />
        ) : (
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            {commits.map((item) => (
              <CommitCard
                key={item.node_id}
                commit={item}
                selected={hasSelected(item.node_id)}
                handleSelect={handleSelect}
              />
            ))}
          </Grid>
        )}
        {selected.length > 0 && <SectionTitle title={footerText} />}
      </Grid>
    </ThemeProvider>
  );
};

export default SelectCommits;
