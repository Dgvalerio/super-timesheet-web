import React, { FC } from 'react';

import { Edit } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';

import Commit from '@/components/appointment/create/with-github/commit/types';

import { lighten, transparentize } from 'polished';
import styled from 'styled-components';

interface ISelectedCard {
  commits: Commit.Simple[];
  handleReset(): void;
}

const CleanedLink = styled.a<{ textColor: string }>`
  text-decoration: none;
  color: ${({ textColor }): string => lighten(0.4, textColor)} !important;

  & > small {
    color: ${({ textColor }): string =>
      transparentize(0.3, lighten(0.4, textColor))} !important;
  }
`;

const minutesToTime = (total: number): string => {
  if (total <= 0) return '';

  let hours = Math.floor(total / 60);
  const days = Math.floor(hours / 24);
  const minutes = total - hours * 60;

  hours -= days * 24;

  const texts = [];

  if (days > 0) texts.push(`${days} ${days > 1 ? 'dias' : 'dia'}`);
  if (hours > 0) texts.push(`${hours} ${hours > 1 ? 'horas' : 'hora'}`);
  if (minutes > 0)
    texts.push(`${minutes} ${minutes > 1 ? 'minutos' : 'minuto'}`);

  const tTime =
    texts.length === 3
      ? `${texts[0]}, ${texts[1]} e ${texts[2]}`
      : texts.join(' e ');

  return `(~ ${tTime})`;
};

const AppointmentSelectedCard: FC<ISelectedCard> = ({
  commits,
  handleReset,
}) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} component={Collapse} in={commits.length > 0}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          paddingRight: 1,
          height: '100%',
          alignItems: 'center',
          borderColor: theme.palette.primary.main,
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">Commits</Typography>
          {commits.map((commit) => (
            <Typography
              key={commit.id}
              variant="body1"
              style={{ color: '#aaa' }}
            >
              <CleanedLink
                href={commit.url}
                target="_blank"
                rel="noreferrer"
                textColor={`${theme.palette.primary.main}`}
              >
                {commit.message}{' '}
                <small>{minutesToTime(commit.stipulatedMinutes)}</small>
              </CleanedLink>
            </Typography>
          ))}
        </CardContent>
        <CardActions>
          <IconButton onClick={handleReset}>
            <Edit />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AppointmentSelectedCard;
