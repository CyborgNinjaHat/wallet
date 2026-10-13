import { useEffect, useState } from 'react';

export const useCurrentDate = (): Date => {
  const [today, setToday] = useState(() => new Date());

  useEffect(() => {
    let midnightTimeout: number | undefined;

    const refreshDate = () => {
      window.clearTimeout(midnightTimeout);
      const currentDate = new Date();
      setToday((previousDate) =>
        previousDate.toDateString() === currentDate.toDateString() ? previousDate : currentDate,
      );

      const nextMidnight = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
      );
      midnightTimeout = window.setTimeout(
        refreshDate,
        nextMidnight.getTime() - currentDate.getTime(),
      );
    };

    const refreshVisibleDate = () => {
      if (document.visibilityState === 'visible') refreshDate();
    };

    refreshDate();
    window.addEventListener('focus', refreshDate);
    document.addEventListener('visibilitychange', refreshVisibleDate);

    return () => {
      window.clearTimeout(midnightTimeout);
      window.removeEventListener('focus', refreshDate);
      document.removeEventListener('visibilitychange', refreshVisibleDate);
    };
  }, []);

  return today;
};
