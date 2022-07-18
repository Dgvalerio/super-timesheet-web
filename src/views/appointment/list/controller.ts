import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { AppointmentModel } from '@/models/appointment';
import { useGetAllAppointmentsQuery } from '@/models/appointment/get';
import { wipeUser } from '@/store/user/actions';
import { routes } from '@/utils/pages';
import { formatMinutesToTime, getDifferenceInMinutes } from '@/utils/time';

import { differenceInBusinessDays, endOfMonth, set } from 'date-fns';

interface ControllerReturn {
  appointments: AppointmentModel[];
  loading: boolean;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  workedTime: string;
  toWorkTime: string;
}

export type Controller = () => ControllerReturn;

const useListAppointmentsController: Controller = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { dailyHours } = useAppSelector(({ user }) => user);
  const [date, setDate] = useState<Date>(new Date());
  const { data, loading, error } = useGetAllAppointmentsQuery({ month: date });
  const [workedTime, setWorkedTime] = useState('00:00');
  const [toWorkTime, setToWorkTime] = useState('00:00');

  const handleSignOut = useCallback(async () => {
    dispatch(wipeUser());

    await router.push(routes.auth.login());
  }, [dispatch, router]);

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

  useEffect(() => {
    if (!error) return;

    error.graphQLErrors.forEach(({ message, extensions: { code } }) => {
      toast.error(message);

      if (code === 'UNAUTHENTICATED') void handleSignOut();
    });
  }, [error, handleSignOut]);

  return {
    appointments: data ? data.getAllAppointments : [],
    date,
    setDate,
    loading,
    toWorkTime,
    workedTime,
  };
};

export default useListAppointmentsController;
