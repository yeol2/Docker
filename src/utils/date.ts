import { addHours, formatDate, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const dateYYYYMMDD = (date: string) => formatDate(date, 'yyyy.MM.dd');

export const dateDistance = (date: string) => {
  const distance = formatDistanceToNow(addHours(new Date(date), 9), {
    locale: ko,
    addSuffix: true,
  });

  return distance.includes('1분 미만') ? '방금 전' : distance;
};
