import React, { FC, useEffect, useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import AppointmentCard from '@/components/appointment/list/appointment-card';
import { InputField } from '@/components/input-field';
import { useGetAllAppointmentsQuery } from '@/models/appointment/get';
import { useAppSelector } from '@/store/hooks';
import graphQLErrorsHandler from '@/utils/graphQLErrorsHandler';
import { formatMinutesToTime, getDifferenceInMinutes } from '@/utils/time';
import AppointmentsListSkeleton from '@/views/appointment/create/components/list/skeleton';
import { Box, Divider, Grid, Tooltip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { differenceInBusinessDays, endOfMonth, set } from 'date-fns';

const Empty: FC = () => (
  <Grid item xs={12}>
    <Typography variant="overline" sx={{ color: 'text.secondary' }}>
      Não há apontamentos para esse dia.
    </Typography>
  </Grid>
);

const ListAppointmentsPage: NextPage = () => {
  const { dailyHours } = useAppSelector(({ user }) => user);
  const [date, setDate] = useState<Date>(new Date());
  const { data, loading, error } = useGetAllAppointmentsQuery({
    month: date.toISOString(),
  });
  const [workedTime, setWorkedTime] = useState('00:00');
  const [toWorkTime, setToWorkTime] = useState('00:00');

  useEffect(() => {
    const workedMinutes =
      data && data.getAllAppointments.length > 0
        ? data.getAllAppointments.reduce(
            (previousValue, { date, startTime, endTime }) =>
              previousValue + getDifferenceInMinutes(date, startTime, endTime),
            0
          )
        : 0;

    const notWorkedMinutes =
      differenceInBusinessDays(
        endOfMonth(date),
        set(date, {
          date: 1,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        })
      ) *
        (dailyHours || 8) *
        60 -
      workedMinutes;

    setWorkedTime(formatMinutesToTime(workedMinutes));

    if (notWorkedMinutes > 0)
      return setToWorkTime(`Faltam ${formatMinutesToTime(notWorkedMinutes)}`);
    if (notWorkedMinutes === 0) return setToWorkTime(`Mês completo`);
    else
      return setToWorkTime(
        `${formatMinutesToTime(Math.abs(notWorkedMinutes))} extras`
      );
  }, [dailyHours, data, date]);

  useEffect(() => graphQLErrorsHandler(error), [error]);

  const appointments = data ? data.getAllAppointments : [];

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

export default ListAppointmentsPage;
