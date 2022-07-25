import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AppointmentModel } from '@/models/appointment';
import { useGetAllAppointmentsQuery } from '@/models/appointment/get';
import { useAppSelector } from '@/store/hooks';
import { formatMinutesToTime, getDifferenceInMinutes } from '@/utils/time';

import { differenceInBusinessDays, endOfMonth, parseISO, set } from 'date-fns';

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
              previousValue +
              getDifferenceInMinutes(parseISO(date), startTime, endTime),
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

    error.graphQLErrors.forEach(({ message }) => toast.error(message));
  }, [error]);

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
