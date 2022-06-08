import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useTheme } from '@mui/material';

import { ChartData } from 'chart.js';
import { differenceInBusinessDays } from 'date-fns';
import { mix } from 'polished';

interface ControllerReturn {
  toWork: number;
  worked: number;
  data: ChartData<any, any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  const dailyWorkload = 8;
  const [toWork, setToWork] = useState<number>(calcToWork(dailyWorkload));
  const [worked, setWorked] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const loadMonthHours = useCallback(async () => {
    setLoading(true);

    try {
      setWorked(0);
    } catch (e) {
      toast.error('Falha ao carregar a carga horária mensal!');
    } finally {
      setLoading(false);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: ChartData<any, any, any> = {
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
    setToWork(calcToWork(dailyWorkload));

    void loadMonthHours();
  }, [dailyWorkload, loadMonthHours]);

  return { toWork, worked, data, loading };
};

export default useDashboardController;
