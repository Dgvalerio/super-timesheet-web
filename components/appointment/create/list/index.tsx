import React, { FC } from 'react';

import useController from '@/components/appointment/create/list/controller';
import AppointmentsListSkeleton from '@/components/appointment/create/list/skeleton';
import { InputField } from '@/components/input-field';
import { AppointmentModel } from '@/models/appointment';
import { getTimeDifference } from '@/utils/time';
import {
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
  Tooltip,
} from '@mui/material';

const Empty: FC = () => (
  <Grid item xs={12}>
    <Typography variant="overline" sx={{ color: 'text.secondary' }}>
      Não há apontamentos para esse dia.
    </Typography>
  </Grid>
);

const Appointment: FC<{ appointment: AppointmentModel }> = ({
  appointment: { project, category, date, startTime, endTime, description },
}) => (
  <Grid item xs={12}>
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle1" color="text.secondary">
              Das {startTime} às {endTime}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="text.secondary">
              Duração de {getTimeDifference(date, startTime, endTime)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Cliente
            </Typography>
            <Typography variant="subtitle1">{project.client.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" color="text.secondary">
              Projeto
            </Typography>
            <Typography variant="subtitle1">{project.name}</Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle2"
              align="right"
              color="text.secondary"
            >
              Categoria
            </Typography>
            <Typography variant="subtitle1" align="right">
              {category.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Descrição
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre' }}>
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

const AppointmentsList: FC = () => {
  const { date, setDate, loading, appointments, workedTime, toWorkTime } =
    useController();

  return loading ? (
    <AppointmentsListSkeleton />
  ) : (
    <Grid
      item
      xs={12}
      container
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item xs={10}>
        <InputField
          label="Dia"
          variant="standard"
          type="date"
          name="date"
          value={date}
          onChange={({ target }): void => setDate(target.value)}
        />
      </Grid>
      <Grid item xs={2} container>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            align="right"
            sx={{ color: 'text.secondary', float: 'right' }}
          >
            {workedTime} trabalhadas
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Calculado com base nas 8 horas de trabalho previstas.">
            <Typography
              variant="subtitle2"
              align="right"
              sx={{ color: 'text.secondary', float: 'right' }}
            >
              {toWorkTime}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {appointments.length === 0 && <Empty />}
      {appointments.map((appointment) => (
        <Appointment key={appointment.id} appointment={appointment} />
      ))}
    </Grid>
  );
};

export default AppointmentsList;
