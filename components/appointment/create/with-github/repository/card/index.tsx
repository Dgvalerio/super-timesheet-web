import React from 'react';

import { KeyboardArrowRight } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import Repository from '@/components/appointment/create/with-github/repository/types';

const RepositoryCard: Repository.Card = ({ repository, handleClick }) => {
  const theme = useTheme();

  const borderColor = theme.palette.primary.main;

  return (
    <Grid item xs={12} sm={6}>
      <Card variant="outlined" sx={{ height: '100%', borderColor }}>
        <CardActionArea onClick={(): void => handleClick(repository.name)}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5">{repository.name}</Typography>
            <KeyboardArrowRight sx={{ marginLeft: 'auto' }} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default RepositoryCard;
