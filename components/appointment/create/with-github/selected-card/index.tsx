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
} from '@mui/material';

namespace SelectedBranchCardTypes {
  export interface Interface {
    text: string;
    name: string | null;
    color: string;
    handleReset(): void;
  }

  export type Component = FC<Interface>;
}

const SelectedCard: SelectedBranchCardTypes.Component = ({
  name,
  handleReset,
  color,
  text,
}) => (
  <Grid item xs={12} component={Collapse} in={!!name}>
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        paddingRight: 1,
        height: '100%',
        alignItems: 'center',
        borderColor: color,
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

export default SelectedCard;
