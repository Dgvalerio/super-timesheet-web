import React, { FC, ReactNode } from 'react';

import { Done, ErrorOutline, Pending, SaveAlt } from '@mui/icons-material';
import {
  CircularProgress,
  Grid,
  LinearProgress,
  Modal,
  Paper,
  Typography,
} from '@mui/material';

import {
  SendAppointments,
  useSendAppointmentsSubscription,
} from '@/models/appointment/send';

import SaveAppointmentsStatus = SendAppointments.SaveAppointmentsStatus;

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

const Wrapper: FC<{
  open: boolean;
  children: ReactNode;
  load?: { saved: number; updated: number };
}> = ({ open, children, load }) => (
  <Modal open={open} sx={{ display: 'flex' }}>
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        item
        xs={5}
        container
        component={Paper}
        sx={{ padding: 3 }}
        justifyContent="space-between"
        alignItems="center"
      >
        {children}
        <Grid item xs={12} mt={3}>
          {load ? (
            <LinearProgress
              variant="buffer"
              value={load.updated}
              valueBuffer={load.saved}
            />
          ) : (
            <LinearProgress />
          )}
        </Grid>
      </Grid>
    </Grid>
  </Modal>
);

const Line: FC<{
  title: string;
  text: string;
  state: SaveAppointmentsStatus;
}> = ({ title, text, state }) => (
  <>
    <Grid item>
      <Typography variant="body1">
        <Typography component="small" variant="overline">
          {title}
        </Typography>{' '}
        {text}
      </Typography>
    </Grid>
    <Grid item>
      <GetIcon state={state} />
    </Grid>
    <Grid item xs={12} />
  </>
);

const WatchSendAppointmentsModal: FC<{
  open: boolean;
}> = ({ open }) => {
  const { data } = useSendAppointmentsSubscription();

  if (!data?.watchSaveAppointments) return <></>;

  const watch = data.watchSaveAppointments;

  if (watch.page !== SaveAppointmentsStatus.Ok) {
    return (
      <Wrapper open={open}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Carregando a página
          </Typography>
        </Grid>
      </Wrapper>
    );
  } else if (watch.loadAppointments !== SaveAppointmentsStatus.Ok) {
    return (
      <Wrapper open={open}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Carregando apontamentos
          </Typography>
        </Grid>
      </Wrapper>
    );
  } else if (watch.auth !== SaveAppointmentsStatus.Ok) {
    return (
      <Wrapper open={open}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Autenticando
          </Typography>
        </Grid>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      open={open}
      load={{
        saved: (watch.saved / watch.saving) * 100,
        updated: (watch.updated / watch.saving) * 100,
      }}
    >
      <Grid item xs={12} mb={3}>
        <Typography variant="h4" align="center">
          Apontando (
          <small>
            {watch.saved} de {watch.saving}
          </small>
          )
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body1">Adaptando para o scrapper</Typography>
      </Grid>
      <Grid item>
        <GetIcon state={watch.appointment.adapteToAzure} />
      </Grid>
      <Grid item xs={12} />

      <Line
        title="cliente:"
        text={watch.appointment._client}
        state={watch.appointment.client}
      />
      <Line
        title="projeto:"
        text={watch.appointment._project}
        state={watch.appointment.project}
      />
      <Line
        title="categoria:"
        text={watch.appointment._category}
        state={watch.appointment.category}
      />
      <Line
        title="descrição:"
        text={watch.appointment._description}
        state={watch.appointment.description}
      />
      <Line
        title="data:"
        text={watch.appointment._date}
        state={watch.appointment.date}
      />
      {watch.appointment._commit && (
        <Line
          title="Link do commit:"
          text={watch.appointment._commit}
          state={watch.appointment.commit}
        />
      )}
      <Line
        title="Não Contabilizado?"
        text={watch.appointment._notMonetize ? 'Sim' : 'Não'}
        state={watch.appointment.notMonetize}
      />
      <Line
        title="Hora Inicial:"
        text={watch.appointment._startTime}
        state={watch.appointment.startTime}
      />
      <Line
        title="Hora Final:"
        text={watch.appointment._endTime}
        state={watch.appointment.endTime}
      />

      <Grid item>
        <Typography variant="body1">Verificando apontamento</Typography>
      </Grid>
      <Grid item>
        <GetIcon state={watch.appointment.search} />
      </Grid>
      <Grid item xs={12} />
      <Grid item>
        <Typography variant="body1">Obtendo mais informações</Typography>
      </Grid>
      <Grid item>
        <GetIcon state={watch.appointment.getMoreData} />
      </Grid>
      <Grid item xs={12} />
      <Grid item>
        <Typography variant="body1">Atualizando estado local</Typography>
      </Grid>
      <Grid item>
        <GetIcon state={watch.appointment.update} />
      </Grid>
      <Grid item xs={12} />
    </Wrapper>
  );
};

export default WatchSendAppointmentsModal;
