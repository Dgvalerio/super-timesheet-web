import React, { useEffect, useState } from 'react';

import { Search as SearchIcon } from '@mui/icons-material';
import { Collapse, Grid, Pagination, Typography } from '@mui/material';
import { PaginationProps } from '@mui/material/Pagination/Pagination';
import { ThemeProvider } from '@mui/material/styles';

import BranchCard from '@/components/appointment/create/with-github/branch/card';
import SelectBranchSkeleton from '@/components/appointment/create/with-github/branch/select/skeleton';
import { branchTheme } from '@/components/appointment/create/with-github/branch/style';
import Branch from '@/components/appointment/create/with-github/branch/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';
import SelectedCard from '@/components/appointment/create/with-github/selected-card';
import InputField from '@/components/input-field';
import useGithubStore from '@/store/github';

const SelectBranch: Branch.Select = ({
  repository,
  selected,
  handleSelect,
}) => {
  const { getRepositoryBranches } = useGithubStore();

  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<Branch.List>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredBranches =
    search.length > 0
      ? branches.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase())
        )
      : branches;

  const perPage = 10;

  const last = page * perPage;
  const first = last - perPage;
  const totalPages = Math.ceil(filteredBranches.length / perPage);

  const handlePaginate: PaginationProps['onChange'] = (_, value) =>
    setPage(value);

  const handleReset = (): void => handleSelect(null);

  useEffect(() => {
    if (!repository) return setLoading(false);

    setLoading(true);
    getRepositoryBranches(repository)
      .then((response) => setBranches(response))
      .finally(() => setLoading(false));
  }, [getRepositoryBranches, repository]);

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
          <>
            <Grid
              container
              spacing={2}
              minHeight={
                selected || filteredBranches.length === 0 || totalPages === 1
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
              {filteredBranches.slice(first, last).map((item) => (
                <BranchCard
                  key={item.name}
                  branch={item}
                  handleClick={handleSelect}
                />
              ))}
              {filteredBranches.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="overline" align="center">
                    Não há branches a serem exibidas.
                  </Typography>
                </Grid>
              )}
            </Grid>
            {filteredBranches.length > 0 && totalPages > 1 && (
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
        text="Branch:"
        name={selected?.name || null}
        handleReset={handleReset}
      />
    </ThemeProvider>
  );
};

export default SelectBranch;
