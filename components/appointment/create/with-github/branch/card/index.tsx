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

import Branch from '@/components/appointment/create/with-github/branch/types';

const BranchCard: Branch.Card = ({ branch, handleClick }) => {
  const theme = useTheme();

  const handler = (): void =>
    handleClick({ name: branch.name, sha: branch.commit.sha });

  return (
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{ height: '100%', borderColor: theme.palette.primary.main }}
      >
        <CardActionArea onClick={handler}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
            <Typography variant="h5">{branch.name}</Typography>
            <KeyboardArrowRight sx={{ marginLeft: 'auto' }} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default BranchCard;
