export const omit = (obj: any, key: string) => {
  const copy = { ...obj };
  [].concat(key).forEach(k => {
    delete copy[k];
  });
  return copy;
}

const nameDayShort = {
  0: 'San',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

const nameDay = {
  0: 'Sanday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const getNameDay = (date: number, { shortDate = false }: { shortDate?: boolean }): string => {
  const dt = new Date(date * 1000);
  const day = dt.getDate();
  const numDay = dt.getDay();
  return shortDate ? nameDayShort[numDay] : nameDay[numDay];
}

export const getNameMonth = (date: number): string => {
  const dt = new Date(date * 1000);
  const day = dt.getDate();
  const numMonth = dt.getMonth();
  return `${monthNames[numMonth]}, ${day}`;
}