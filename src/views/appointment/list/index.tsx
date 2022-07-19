import React, { FC } from 'react';

import { NextPage } from 'next';

import { InputField } from '@/components/input-field';
import MainWrapper from '@/components/main-wrapper';
import { AppointmentModel } from '@/models/appointment';
import Styles from '@/styles/dashboard';
import { getTimeDifference } from '@/utils/time';
import AppointmentsListSkeleton from '@/views/appointment/create/components/list/skeleton';
import AppointmentFooter from '@/views/appointment/list/components/appointment-footer';
import useController from '@/views/appointment/list/controller';
import styled from '@emotion/styled';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const Empty = () => (
  <Grid item xs={12}>
    <Typography variant="overline" sx={{ color: 'text.secondary' }}>
      Não há apontamentos para esse dia.
    </Typography>
  </Grid>
);

const Content = styled(CardContent)`
  padding-bottom: 0 !important;
`;

const Appointment: FC<{ appointment: AppointmentModel }> = ({
  appointment: {
    project,
    category,
    date,
    startTime,
    endTime,
    description,
    status,
  },
}) => (
  <Grid item xs={12}>
    <Card variant="outlined">
      <Content>
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
          <AppointmentFooter status={status} />
        </Grid>
      </Content>
    </Card>
  </Grid>
);

const ListAppointmentsView: NextPage = () => {
  const { date, setDate, loading, appointments, workedTime, toWorkTime } =
    useController();

  return (
    <MainWrapper title="Dashboard">
      <Styles.Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Seus apontamentos</Typography>
          </Grid>
          {loading ? (
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
                <DatePicker
                  views={['year', 'month']}
                  label="Mês"
                  value={date}
                  onChange={(newValue) => newValue && setDate(newValue)}
                  renderInput={(params) => (
                    <InputField {...params} helperText={null} />
                  )}
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
          )}
        </Grid>
      </Styles.Container>
    </MainWrapper>
  );
};

export default ListAppointmentsView;
