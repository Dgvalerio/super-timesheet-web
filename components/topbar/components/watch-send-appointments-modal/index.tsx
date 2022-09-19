import React, { FC } from 'react';

import { Done, ErrorOutline, Pending, SaveAlt } from '@mui/icons-material';
import {
  CircularProgress,
  Grid,
  Modal,
  Paper,
  Typography,
} from '@mui/material';

import { SendAppointments } from '@/models/appointment/send';

const GetIcon: FC<{ state: SendAppointments.SaveAppointmentsStatus }> = ({
  state,
}) => {
  const fontSize = 24;

  switch (state) {
    case SendAppointments.SaveAppointmentsStatus.Wait:
      return <Pending sx={{ fontSize }} color="disabled" />;
    case SendAppointments.SaveAppointmentsStatus.Load:
      return <CircularProgress size={fontSize} color="info" />;
    case SendAppointments.SaveAppointmentsStatus.Process:
      return <SaveAlt sx={{ fontSize }} color="action" />;
    case SendAppointments.SaveAppointmentsStatus.Ok:
      return <Done sx={{ fontSize }} color="success" />;
    case SendAppointments.SaveAppointmentsStatus.Fail:
      return <ErrorOutline sx={{ fontSize }} color="error" />;
    default:
      return <Pending sx={{ fontSize }} color="disabled" />;
  }
};

const WatchSendAppointmentsModal: FC<{
  open: boolean;
  watchSendAppointments: SendAppointments.Subscription;
}> = ({ open, watchSendAppointments: { watchSaveAppointments } }) => (
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
          <Typography variant="h5">Page</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.page} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="h5">loadAppointments</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.loadAppointments} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="h5">auth</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.auth} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="h5">saving</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.saving} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="h5">appointment</Typography>
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">page</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.page} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">saveInAzure</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.saveInAzure} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">id</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {watchSaveAppointments.appointment.id}
          </Typography>
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">client</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.client} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">project</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.project} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">category</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.category} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">description</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.description} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">date</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.date} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">commit</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.commit} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">notMonetize</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.notMonetize} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">startTime</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.startTime} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">endTime</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.endTime} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">adapteToAzure</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.adapteToAzure} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">search</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.search} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">getMoreData</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.getMoreData} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="body1">update</Typography>
        </Grid>
        <Grid item>
          <GetIcon state={watchSaveAppointments.appointment.update} />
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="h5">saved</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">{watchSaveAppointments.saved}</Typography>
        </Grid>
        <Grid item xs={12} />
        <Grid item>
          <Typography variant="h5">updated</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">{watchSaveAppointments.updated}</Typography>
        </Grid>
        <Grid item xs={12} />
      </Grid>
    </Grid>
  </Modal>
);

export default WatchSendAppointmentsModal;
