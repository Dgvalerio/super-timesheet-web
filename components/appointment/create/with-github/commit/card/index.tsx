import React from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import Commit from '@/components/appointment/create/with-github/commit/types';

import { transparentize } from 'polished';

const CommitCard: Commit.Card = ({ commit, selected, handleSelect }) => {
  const theme = useTheme();
  const color = theme.palette.primary.main;

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
          backgroundColor: transparentize(selected ? 0.6 : 1, color),
          borderColor: color,
        }}
      >
        <CardActionArea
          sx={{ height: '100%' }}
          onClick={handleSelect.bind(null, commit)}
        >
          <CardContent>
            <Typography variant="overline">Descrição:</Typography>
            <Typography variant="body1">{commit.commit.message}</Typography>
            <Typography variant="overline">Data:</Typography>
            <Typography variant="body1">{dayText}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CommitCard;
