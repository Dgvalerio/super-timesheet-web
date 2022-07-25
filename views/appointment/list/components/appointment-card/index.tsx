import React, { FC } from 'react';

import { AppointmentModel } from '@/models/appointment';
import { getTimeDifference } from '@/utils/time';
import AppointmentFooter from '@/views/appointment/list/components/appointment-footer';
import styled from '@emotion/styled';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';

const Content = styled(CardContent)`
  padding-bottom: 0 !important;
`;

const AppointmentCard: FC<{ appointment: AppointmentModel }> = ({
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
              {new Date(date.split('.')[0]).toLocaleString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="text.secondary">
              Duração de{' '}
              {getTimeDifference(
                new Date(date.split('.')[0]),
                startTime,
                endTime
              )}
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

export default AppointmentCard;
