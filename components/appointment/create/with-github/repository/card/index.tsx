import React, { FC } from 'react';

import { repositoryColor } from '@/components/appointment/create/with-github/repository/style';
import Repository from '@/components/appointment/create/with-github/repository/types';
import { KeyboardArrowRight } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
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
        sx={{
          display: 'flex',
          paddingRight: 1,
          height: '100%',
          alignItems: 'center',
          borderColor: repositoryColor,
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5">{repository.name}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleClick.bind(null, repository.name)}>
            <KeyboardArrowRight />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default RepositoryCard;
