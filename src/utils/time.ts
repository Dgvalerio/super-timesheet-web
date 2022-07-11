import { differenceInMinutes, format } from 'date-fns';

export const getDifferenceInMinutes = (
  date: Date,
  startTime: string,
  endTime: string
) => {
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
  date: Date,
  startTime: string,
  endTime: string
) => formatMinutesToTime(getDifferenceInMinutes(date, startTime, endTime));
