import React, { FC, useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { toast } from 'react-toastify';

import {
  Card,
  CardContent,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';

import { useGetCurrentMonthWorkedTimeQuery } from '@/models/appointment/get';
import { useAppSelector } from '@/store/hooks';
import graphQLErrorsHandler from '@/utils/graphQLErrorsHandler';

import { ArcElement, Chart as ChartJS, ChartData, Tooltip } from 'chart.js';
import { differenceInBusinessDays } from 'date-fns';
import { mix } from 'polished';

ChartJS.register(ArcElement, Tooltip);

const calcToWork = (dailyWorkload?: number): number => {
  const now = new Date();
  const [year, month] = now.toISOString().split('-');

  const diff = differenceInBusinessDays(
    new Date(+year, +month, 1),
    new Date(+year, +month - 1, 1)
  );

  return diff * (dailyWorkload || 0);
};

const WorkedHoursCard: FC = () => {
  const { dailyHours } = useAppSelector(({ user }) => user);
  const [toWork, setToWork] = useState<number>(calcToWork(dailyHours));
  const [worked, setWorked] = useState<number>(0);

  const {
    palette: {
      background: { default: primaryColor },
      primary: { dark: secondaryColor },
    },
  } = useTheme();

  const color = useMemo(
    () => [mix(0.8, primaryColor, secondaryColor), secondaryColor],
    [primaryColor, secondaryColor]
  );

  const {
    data: currentWorkedTime,
    loading,
    error,
  } = useGetCurrentMonthWorkedTimeQuery();

  const chartData: ChartData<'doughnut', number[], string> = useMemo(
    () => ({
      labels: ['Horas não trabalhadas', 'Horas trabalhadas'],
      datasets: [
        {
          label: 'Horas trabalhadas',
          data: [toWork - worked, worked],
          backgroundColor: color,
          borderColor: color,
          borderWidth: 0,
        },
      ],
    }),
    [color, toWork, worked]
  );

  useEffect(() => setToWork(calcToWork(dailyHours)), [dailyHours]);

  useEffect(() => graphQLErrorsHandler(error), [error]);

  useEffect(() => {
    if (!currentWorkedTime) return;

    if (!currentWorkedTime.getCurrentMonthWorkedTime) {
      toast.error('Não foi possível carregar o tempo trabalhado!');

      return;
    }

    const [hours] = currentWorkedTime.getCurrentMonthWorkedTime.split(':');

    setWorked(Number(hours));
  }, [currentWorkedTime]);

  return loading ? (
    <Skeleton width="100%" height={490} sx={{ transform: 'none' }} />
  ) : (
    <Card variant="outlined">
      <CardContent style={{ paddingBottom: 8 }}>
        <Doughnut data={chartData} />
        <br />
        <Typography gutterBottom variant="h5" component="div">
          Horas trabalhadas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No mês atual devem ser trabalhadas <b>{toWork} horas</b>, das quais
          você já trabalhou <b>{worked} horas</b>.
        </Typography>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ fontSize: 10 }}
        >
          Calculado com base nos dias úteis do mês
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WorkedHoursCard;
