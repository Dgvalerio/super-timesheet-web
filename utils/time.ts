import { compareAsc, differenceInMinutes, format } from 'date-fns';

export const getDifferenceInMinutes = (
  date: string,
  startTime: string,
  endTime: string
): number => {
  const simpleDate = format(new Date(date), 'yyyy-MM-dd');

  return differenceInMinutes(
    new Date(`${simpleDate}T${endTime}`),
    new Date(`${simpleDate}T${startTime}`)
  );
};

export const formatMinutesToTime = (totalMinutes: number): string => {
  const aux = {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };

  const hours = String(aux.hours).padStart(2, '0');
  const minutes = String(aux.minutes).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const getTimeDifference = (
  date: string,
  startTime: string,
  endTime: string
): string =>
  formatMinutesToTime(getDifferenceInMinutes(date, startTime, endTime));

interface ValidateDateTimeProps {
  date: string;
  startTime: string;
  endTime: string;
}

interface ValidateDateTimeReturn {
  dateError?: string;
  startTimeError?: string;
  endTimeError?: string;
}

type ValidateDateTime = (
  props: ValidateDateTimeProps
) => ValidateDateTimeReturn;

export const validateDateTime: ValidateDateTime = ({
  date,
  startTime,
  endTime,
}) => {
  const errors: ValidateDateTimeReturn = {};

  const today = new Date();
  const todayZeroDate = new Date(`${format(today, 'yyyy-MM-dd')}T00:00`);
  const appointmentStartTime = new Date(`${date}T${startTime}`);
  const appointmentEndTime = new Date(`${date}T${endTime}`);

  if (compareAsc(new Date(`${date}T00:00`), todayZeroDate) > 0) {
    errors.dateError = 'O dia escolhido não pode ser maior que o atual!';
  }

  if (compareAsc(appointmentStartTime, today) > 0) {
    errors.startTimeError = 'O horário inicial não pode ser maior que o atual!';
  }

  if (compareAsc(appointmentEndTime, today) > 0) {
    errors.endTimeError = 'O horário final não pode ser maior que o atual!';
  }

  if (compareAsc(appointmentStartTime, appointmentEndTime) > 0) {
    errors.startTimeError = 'O horário final deve ser maior que o inicial!';
    errors.endTimeError = 'O horário final deve ser maior que o inicial!';
  }

  return errors;
};
