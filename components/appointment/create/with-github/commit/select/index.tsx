import React, { useEffect, useState } from 'react';

import { Search as SearchIcon } from '@mui/icons-material';
import { Timeline } from '@mui/lab';
import { Collapse, Grid, Pagination, Typography } from '@mui/material';
import { PaginationProps } from '@mui/material/Pagination/Pagination';
import { ThemeProvider } from '@mui/material/styles';

import AppointmentSelectedCard from '@/components/appointment/create/with-github/appointment/selected-card';
import CommitCard from '@/components/appointment/create/with-github/commit/card';
import getBranchCommits from '@/components/appointment/create/with-github/commit/controller';
import SelectCommitSkeleton from '@/components/appointment/create/with-github/commit/select/skeleton';
import { commitTheme } from '@/components/appointment/create/with-github/commit/style';
import Commit from '@/components/appointment/create/with-github/commit/types';
import SectionTitle from '@/components/appointment/create/with-github/section-title';
import InputField from '@/components/input-field';

import { differenceInMinutes } from 'date-fns';

const itsFirstOfDay = (actual: Commit.Model, prev: Commit.Model): boolean => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const actualDate = new Date(`${actual.commit.committer?.date}`);
  const prevDate = new Date(`${prev?.commit.committer?.date}`);

  return (
    actualDate.toLocaleString('pt-BR', options) !==
    prevDate.toLocaleString('pt-BR', options)
  );
};

const commitFactory = (
  actual: Commit.Model,
  prev: Commit.Model
): Commit.Simple => {
  const commitSimple: Commit.Simple = {
    id: actual.node_id,
    last: prev?.commit.committer?.date,
    date: actual.commit.committer?.date,
    stipulatedMinutes: 0,
    message: actual.commit.message,
    url: actual.html_url,
  };

  if (commitSimple.last && commitSimple.date) {
    commitSimple.stipulatedMinutes = differenceInMinutes(
      new Date(commitSimple.last),
      new Date(commitSimple.date)
    );
  }

  return commitSimple;
};

const SelectCommits: Commit.Select = ({
  repository,
  branchSha,
  selected,
  handleSelect,
  completed,
}) => {
  const [loading, setLoading] = useState(true);
  const [commits, setCommits] = useState<Commit.List>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredCommits =
    search.length > 0
      ? commits.filter(({ commit: { message } }) => message.includes(search))
      : commits;

  const perPage = 10;

  const last = page * perPage;
  const first = last - perPage;
  const totalPages = Math.ceil(filteredCommits.length / perPage);

  const handlePaginate: PaginationProps['onChange'] = (_, value) =>
    setPage(value);

  const handleReset = (): void => handleSelect([]);

  const hasSelected = (id: string): boolean =>
    !!selected.find((item) => item.id === id);

  useEffect(() => {
    if (!repository || !branchSha) return setLoading(false);

    setLoading(true);
    getBranchCommits(repository, branchSha)
      .then((response) => setCommits(response))
      .finally(() => setLoading(false));
  }, [branchSha, repository]);

  if (!repository || !branchSha) {
    if (selected.length > 0) handleReset();

    return <></>;
  }

  return (
    <ThemeProvider theme={commitTheme}>
      <Grid
        item
        xs={12}
        component={Collapse}
        in={!completed}
        sx={completed ? { padding: '0 !important' } : undefined}
      >
        <SectionTitle title="Commits" />
        {loading ? (
          <SelectCommitSkeleton />
        ) : (
          <>
            <Grid
              container
              spacing={2}
              sx={{ marginBottom: 2 }}
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
              <Grid item xs={12}>
                <Timeline>
                  {filteredCommits
                    .slice(first, last)
                    .map((item, index, array) => (
                      <CommitCard
                        key={item.node_id}
                        commit={item}
                        selected={hasSelected(item.node_id)}
                        handleSelect={handleSelect.bind(
                          null,
                          commitFactory(item, array[index - 1])
                        )}
                        firstOfDay={itsFirstOfDay(item, array[index - 1])}
                      />
                    ))}
                </Timeline>
              </Grid>
              {filteredCommits.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="overline" align="center">
                    Não há commits a serem exibidos.
                  </Typography>
                </Grid>
              )}
            </Grid>
            {filteredCommits.length > 0 && totalPages > 1 && (
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
      <AppointmentSelectedCard commits={selected} handleReset={handleReset} />
    </ThemeProvider>
  );
};

export default SelectCommits;
