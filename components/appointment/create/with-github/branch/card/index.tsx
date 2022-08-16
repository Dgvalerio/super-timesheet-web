import React, { FC } from 'react';

import { branchColor } from '@/components/appointment/create/with-github/branch/style';
import Branch from '@/components/appointment/create/with-github/branch/types';
import { KeyboardArrowRight } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

const BranchCard: FC<{
  branch: Branch.Model;
  handleClick: (data: Branch.Simple) => void;
}> = ({ branch, handleClick }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          paddingRight: 1,
          height: '100%',
          alignItems: 'center',
          borderColor: branchColor,
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5">{branch.name}</Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={handleClick.bind(null, {
              name: branch.name,
              sha: branch.commit.sha,
            })}
          >
            <KeyboardArrowRight />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BranchCard;
