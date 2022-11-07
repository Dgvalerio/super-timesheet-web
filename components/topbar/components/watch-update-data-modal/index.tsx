import React, { FC } from 'react';

import { Done, ErrorOutline, Pending, SaveAlt } from '@mui/icons-material';
import {
  CircularProgress,
  Grid,
  Modal,
  Paper,
  Typography,
} from '@mui/material';

import {
  UpdateData,
  useUpdateDataSubscription,
} from '@/models/scrapper/update';

const GetIcon: FC<{ state: UpdateData.SeedStatus }> = ({ state }) => {
  const fontSize = 24;

  switch (state) {
    case UpdateData.SeedStatus.Wait:
      return <Pending sx={{ fontSize }} color="disabled" />;
    case UpdateData.SeedStatus.Load:
      return <CircularProgress size={fontSize} color="info" />;
    case UpdateData.SeedStatus.Save:
      return <SaveAlt sx={{ fontSize }} color="action" />;
    case UpdateData.SeedStatus.Ok:
      return <Done sx={{ fontSize }} color="success" />;
    case UpdateData.SeedStatus.Fail:
      return <ErrorOutline sx={{ fontSize }} color="error" />;
    default:
      return <Pending sx={{ fontSize }} color="disabled" />;
  }
};

const WatchUpdateDataModal: FC<{
  open: boolean;
}> = ({ open }) => {
  const { data } = useUpdateDataSubscription();

  if (!data?.watchImportData) return <></>;

  const watch = data.watchImportData;

  return (
    <Modal open={open} sx={{ display: 'flex' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={4}
          container
          component={Paper}
          sx={{ padding: 2 }}
          spacing={1}
          justifyContent="space-between"
        >
          <Grid item>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid item>
            <GetIcon state={watch.login} />
          </Grid>
          <Grid item xs={12} />
          <Grid item>
            <Typography variant="h5">Clients</Typography>
          </Grid>
          <Grid item>
            <GetIcon state={watch.clients} />
          </Grid>
          <Grid item xs={12} />
          <Grid item>
            <Typography variant="h5">Projetos</Typography>
          </Grid>
          <Grid item>
            <GetIcon state={watch.projects} />
          </Grid>
          <Grid item xs={12} />
          <Grid item>
            <Typography variant="h5">Categorias</Typography>
          </Grid>
          <Grid item>
            <GetIcon state={watch.categories} />
          </Grid>
          <Grid item xs={12} />
          <Grid item>
            <Typography variant="h5">Apontamentos</Typography>
          </Grid>
          <Grid item>
            <GetIcon state={watch.appointments} />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default WatchUpdateDataModal;
