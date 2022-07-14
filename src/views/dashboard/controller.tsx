import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { useAppSelector } from '@/hooks/store';
import { useGetCurrentMonthWorkedTimeQuery } from '@/models/appointment/get';
import { useGetUserAzureInfosQuery } from '@/models/user/get';
import { routes } from '@/utils/pages';
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
  const router = useRouter();
  const theme = useTheme();
  const { email, dailyHours } = useAppSelector(({ user }) => user);
  const [toWork, setToWork] = useState<number>(calcToWork(dailyHours || 0));
  const [worked, setWorked] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const {
    data: getUserAzureInfosData,
    loading: getUserAzureInfosLoading,
    error: getUserAzureInfosError,
  } = useGetUserAzureInfosQuery(email);
  const {
    data: getCurrentMonthWorkedTimeData,
    loading: getCurrentMonthWorkedTimeLoading,
    error: getCurrentMonthWorkedTimeError,
  } = useGetCurrentMonthWorkedTimeQuery();

  const goCreateAzureInfos = useCallback(() => {
    setLoading(true);
    void router.push(routes.azureInfos.create());
  }, [router]);

  useEffect(() => {
    if (!getUserAzureInfosData) return;

    const { azureInfos } = getUserAzureInfosData.getUser;

    if (!azureInfos.login) {
      goCreateAzureInfos();
      toast.error('Você não tem uma conta da azure configurada!');
    }
  }, [getUserAzureInfosData, goCreateAzureInfos]);

  useEffect(() => {
    if (!getCurrentMonthWorkedTimeData) return;

    const { getCurrentMonthWorkedTime } = getCurrentMonthWorkedTimeData;

    if (getCurrentMonthWorkedTime) {
      const [hours] = getCurrentMonthWorkedTime.split(':');

      setWorked(Number(hours));
    } else {
      toast.error('Não foi possível carregar o !');
    }
  }, [getCurrentMonthWorkedTimeData]);

  useEffect(() => {
    if (getUserAzureInfosError) {
      getUserAzureInfosError.graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    }

    if (getCurrentMonthWorkedTimeError) {
      getCurrentMonthWorkedTimeError.graphQLErrors.forEach(({ message }) =>
        toast.error(message)
      );
    }
  }, [getCurrentMonthWorkedTimeError, getUserAzureInfosError]);

  const data: ChartData<'doughnut', number[], string> = useMemo(
    () => ({
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
    }),
    [
      theme.palette.background.default,
      theme.palette.primary.dark,
      toWork,
      worked,
    ]
  );

  useEffect(() => {
    setLoading(getUserAzureInfosLoading || getCurrentMonthWorkedTimeLoading);
  }, [getCurrentMonthWorkedTimeLoading, getUserAzureInfosLoading]);

  useEffect(() => {
    setToWork(calcToWork(dailyHours || 0));
  }, [dailyHours]);

  return { toWork, worked, data, loading };
};

export default useDashboardController;
