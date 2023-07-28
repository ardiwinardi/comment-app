import { formatDistanceToNow } from "date-fns";

export const convertDateToHumanReadable = (date: Date) => {
  try {
    const humanReadableDate = formatDistanceToNow(date, { addSuffix: true });
    return humanReadableDate;
  } catch (error) {
    return null;
  }
};
