import React, { FC } from 'react';

import { commitColor } from '@/components/appointment/create/with-github/commit/style';
import Commit from '@/components/appointment/create/with-github/commit/types';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const CommitCard: FC<{
  commit: Commit.Model;
}> = ({ commit }) => {
  let dayText = '';
  const date = commit.commit.committer?.date;

  if (date) {
    const aux = new Date(date);

    const day = aux.toLocaleString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const time = aux.toLocaleString('pt-BR', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });

    dayText = `${day} às ${time}`;
  }

  return (
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          borderColor: commitColor,
        }}
      >
        <CardContent>
          <Typography variant="overline">Descrição:</Typography>
          <Typography variant="body1">{commit.commit.message}</Typography>
          <Typography variant="overline">Data:</Typography>
          <Typography variant="body1">{dayText}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CommitCard;
