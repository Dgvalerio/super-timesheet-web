import React, { FC } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { InputField } from '@/components/input-field';
import AppointmentsListSkeleton from '@/views/appointment/create/components/list/skeleton';
import AppointmentCard from '@/views/appointment/list/components/appointment-card';
import useController from '@/views/appointment/list/controller';
import { Box, Divider, Grid, Tooltip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const Empty: FC = () => (
  <Grid item xs={12}>
    <Typography variant="overline" sx={{ color: 'text.secondary' }}>
      Não há apontamentos para esse dia.
    </Typography>
  </Grid>
);

const ListAppointmentsView: NextPage = () => {
  const { date, setDate, loading, appointments, workedTime, toWorkTime } =
    useController();

  return (
    <Box p={2}>
      <Head>
        <title>Visualizar apontamentos</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Visualizar apontamentos</Typography>
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
                onChange={(newValue): null | void =>
                  newValue && setDate(newValue)
                }
                renderInput={(params): JSX.Element => (
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
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ListAppointmentsView;
