import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AppointmentModel } from '@/models/appointment';
import { useGetAllAppointmentsQuery } from '@/models/appointment/get';
import { formatMinutesToTime, getDifferenceInMinutes } from '@/utils/time';

import { format } from 'date-fns';

interface ControllerReturn {
  appointments: AppointmentModel[];
  loading: boolean;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  workedTime: string;
  toWorkTime: string;
}

export type Controller = () => ControllerReturn;

const useAppointmentsListController: Controller = () => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { data, loading, error } = useGetAllAppointmentsQuery({
    date: new Date(date),
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

    const notWorkedMinutes = 8 * 60 - workedMinutes;

    setWorkedTime(formatMinutesToTime(workedMinutes));

    if (notWorkedMinutes > 0)
      return setToWorkTime(`Faltam ${formatMinutesToTime(notWorkedMinutes)}`);
    if (notWorkedMinutes === 0) return setToWorkTime(`Dia completo`);
    else
      return setToWorkTime(
        `${formatMinutesToTime(Math.abs(notWorkedMinutes))} extras`
      );
  }, [data]);

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

export default useAppointmentsListController;
