import { format, parseISO } from "date-fns";

export function convertDateString(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy");
}
