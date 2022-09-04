import React from 'react';

import { Check } from '@mui/icons-material';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { Typography, useTheme } from '@mui/material';

import Commit from '@/components/appointment/create/with-github/commit/types';

import { transparentize } from 'polished';

const CommitCard: Commit.Card = ({
  commit,
  selected,
  handleSelect,
  firstOfDay,
}) => {
  const theme = useTheme();
  const color = theme.palette.primary.main;

  let day = '';
  let time = '';
  const date = commit.commit.committer?.date;

  if (date) {
    const aux = new Date(date);

    day = aux.toLocaleString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    time = aux.toLocaleString('pt-BR', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  return (
    <>
      {firstOfDay && (
        <Typography variant="overline" color="text.secondary" align="center">
          {day}
        </Typography>
      )}
      <TimelineItem>
        <TimelineOppositeContent sx={{ margin: 'auto' }}>
          <Typography variant="overline" color="text.secondary">
            {time}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
          <TimelineDot
            variant="outlined"
            color="primary"
            onClick={handleSelect}
            sx={{
              cursor: 'pointer',
              bgcolor: selected ? 'primary.main' : 'transparent',
              ':hover': { bgcolor: transparentize(0.3, color) },
            }}
          >
            <Check
              sx={{ color: selected ? 'black' : transparentize(0.4, color) }}
            />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ margin: 'auto' }}>
          <Typography variant="subtitle1">{commit.commit.message}</Typography>
        </TimelineContent>
      </TimelineItem>
    </>
  );
};

export default CommitCard;
