import { useState, useEffect, ReactNode } from 'react';

export const Countdown = ({
  timeFrom,
  timeTell,
  children,
}: {
  timeFrom: number;
  timeTell: number;
  children?: ReactNode;
}) => {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    let newDiff =
      timeFrom > timeTell ? timeFrom - timeTell : timeTell - timeFrom;

    if (newDiff < 0) {
      newDiff = 0;
    }

    setDiff(newDiff);
  }, [timeFrom, timeTell]);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const hours = Math.floor(diff / (60 * 60 * 1000));

    const divisor_for_minutes = diff % (60 * 60 * 1000);
    const minutes = Math.floor(divisor_for_minutes / (60 * 1000));

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, [diff]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(myInterval);
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      {hours === 0 && minutes === 0 && seconds === 0
        ? children
        : `${hours > 0 ? `${hours}:` : ''}${
            minutes < 10 ? `0${minutes}` : minutes
          }:${seconds < 10 ? `0${seconds}` : seconds}`}
    </>
  );
};

export default Countdown;
