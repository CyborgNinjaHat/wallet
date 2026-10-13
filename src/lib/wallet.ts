import type { TransactionType } from '../types';

const millisecondsPerDay = 86_400_000;

const calendarDayNumber = (date: Date): number =>
  Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / millisecondsPerDay;

export const getSeasonDay = (today: Date): number => {
  const currentMonth = today.getMonth();
  const seasonStartMonth = currentMonth < 2 ? 11 : Math.floor((currentMonth - 2) / 3) * 3 + 2;
  const seasonStartYear = today.getFullYear() - (currentMonth < 2 ? 1 : 0);
  const seasonStart = new Date(seasonStartYear, seasonStartMonth, 1);

  return calendarDayNumber(today) - calendarDayNumber(seasonStart) + 1;
};

export const calculateDailyPoints = (seasonDay: number): number => {
  if (!Number.isInteger(seasonDay) || seasonDay < 1 || seasonDay > 92) {
    throw new RangeError('Season day must be a whole number between 1 and 92.');
  }
  if (seasonDay === 1) return 2;
  if (seasonDay === 2) return 3;

  let pointsTwoDaysAgo = 2;
  let previousDayPoints = 3;

  for (let currentDay = 3; currentDay <= seasonDay; currentDay += 1) {
    const currentPoints = Math.round(pointsTwoDaysAgo + previousDayPoints * 0.6);
    pointsTwoDaysAgo = previousDayPoints;
    previousDayPoints = currentPoints;
  }

  return previousDayPoints;
};

export const formatPoints = (points: number): string =>
  points > 1000 ? `${Math.round(points / 1000)}K` : `${Math.round(points)}`;

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amountCents: number): string =>
  currencyFormatter.format(amountCents / 100);

export const formatTransactionAmount = (amountCents: number, type: TransactionType): string =>
  `${type === 'Payment' ? '+' : ''}${formatCurrency(amountCents)}`;

export const getAvailableCredit = (cardLimitCents: number, balanceCents: number): number =>
  cardLimitCents - balanceCents;

export const generateCardBalance = (cardLimitCents: number): number =>
  Math.floor(Math.random() * (cardLimitCents + 1));

export const formatTransactionDate = (timestamp: string, today: Date): string => {
  const transactionDate = new Date(timestamp);
  const daysAgo = calendarDayNumber(today) - calendarDayNumber(transactionDate);

  if (daysAgo >= 0 && daysAgo < 7) {
    return transactionDate.toLocaleDateString('en-US', { weekday: 'long' });
  }

  return transactionDate.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  });
};

export const formatTransactionTimestamp = (timestamp: string): string => {
  const transactionDate = new Date(timestamp);
  const formattedDate = transactionDate.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  });
  const formattedTime = transactionDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${formattedDate}, ${formattedTime}`;
};

export const getPreviousMonth = (today: Date): string =>
  new Date(today.getFullYear(), today.getMonth() - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
  });
