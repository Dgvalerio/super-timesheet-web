import React from 'react';

import Repository from '@/components/appointment/create/with-github/repository/types';
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

const SelectedCard: Repository.Selected = ({ name, handleReset, text }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} component={Collapse} in={!!name}>
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
          <Typography variant="h6">
            {text}
            <Typography variant="body1" component="span" ml={1}>
              {name}
            </Typography>
          </Typography>
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

export default SelectedCard;
