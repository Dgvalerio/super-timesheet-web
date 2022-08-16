import React, { FC } from 'react';

import { repositoryColor } from '@/components/appointment/create/with-github/repository/style';
import Repository from '@/components/appointment/create/with-github/repository/types';
import { KeyboardArrowRight } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

const RepositoryCard: FC<{
  repository: Repository.Model;
  handleClick: (name: string) => void;
}> = ({ repository, handleClick }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{ height: '100%', borderColor: repositoryColor }}
      >
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
