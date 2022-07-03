import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { apolloClient } from '@/api/apollo';
import { useAppSelector } from '@/hooks/store';
import { UserModel } from '@/models/user/create';
import { gql } from '@apollo/client';
import { useTheme } from '@mui/material';

import { ChartData } from 'chart.js';
import { differenceInBusinessDays } from 'date-fns';
import { mix } from 'polished';

interface ControllerReturn {
  toWork: number;
  worked: number;
  data: ChartData<'doughnut', number[], string>;
  loading: boolean;
}

const calcToWork = (dailyWorkload: number): number => {
  const now = new Date();
  const [year, month] = now.toISOString().split('-');

  const diff = differenceInBusinessDays(
    new Date(+year, +month, 1),
    new Date(+year, +month - 1, 1)
  );

  return diff * dailyWorkload;
};

const useDashboardController = (): ControllerReturn => {
  const theme = useTheme();
  const { email, dailyHours } = useAppSelector(({ user }) => user);
  const [toWork, setToWork] = useState<number>(calcToWork(dailyHours || 0));
  const [worked, setWorked] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const loadMonthHours = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await apolloClient.query<{
        getUser: UserModel;
      }>({
        query: gql`
          query {
            getUser(input: { email: "${email}" }) {
              azureInfos {
               currentMonthWorkedTime
              }
            }
          }
        `,
      });

      if (data && data.getUser.azureInfos) {
        const [hours] =
          data.getUser.azureInfos.currentMonthWorkedTime.split(':');

        setWorked(Number(hours));
      }
    } catch (e) {
      toast.error('Falha ao carregar a carga horária mensal!');
    } finally {
      setLoading(false);
    }
  }, [email]);

  const data: ChartData<'doughnut', number[], string> = {
    labels: ['Horas não trabalhadas', 'Horas trabalhadas'],
    datasets: [
      {
        label: 'Horas trabalhadas',
        data: [toWork - worked, worked],
        backgroundColor: [
          mix(
            0.8,
            theme.palette.background.default,
            theme.palette.primary.dark
          ),
          theme.palette.primary.dark,
        ],
        borderColor: [
          mix(
            0.8,
            theme.palette.background.default,
            theme.palette.primary.dark
          ),
          theme.palette.primary.dark,
        ],
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setToWork(calcToWork(dailyHours || 0));

    void loadMonthHours();
  }, [dailyHours, loadMonthHours]);

  return { toWork, worked, data, loading };
};

export default useDashboardController;
