import { format, parseISO } from 'date-fns';

export function convertDateString(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'dd/MM/yyyy');
}

export function convertToReadableDate(
  dateString: string | null | undefined,
): string {
  if (!dateString) return 'Invalid date';
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM dd, yyyy');
    // biome-ignore lint: error
  } catch (error) {
    return 'Invalid date';
  }
}
