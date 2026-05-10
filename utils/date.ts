/**
 * Safely parses a date string in various formats (YYYY-MM-DD or DD/MM/YY or DD/MM/YYYY)
 * to a JS Date object.
 */
const parseDate = (dateStr: string | Date): Date | null => {
  if (dateStr instanceof Date) return dateStr;
  if (!dateStr) return null;

  // 1. Try ISO format (YYYY-MM-DD)
  if (dateStr.includes('-')) {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }

  // 2. Try slash format (DD/MM/YY or DD/MM/YYYY)
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // 0-indexed
      let year = parseInt(parts[2], 10);
      
      // Handle 2-digit years
      if (year < 100) {
          year += year > 50 ? 1900 : 2000;
      }
      
      const d = new Date(year, month, day);
      return isNaN(d.getTime()) ? null : d;
    }
  }

  // Fallback to default constructor
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * Formats a Date object or string to DD/MM/YYYY
 */
export const formatDate = (date: string | Date | undefined): string | null => {
  if (!date) return null;
  const d = parseDate(date);
  if (!d) return null;

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Calculates expiration date by adding PAO (months) to the opened date.
 * Returns string in DD/MM/YYYY format.
 */
export const calculateExpirationDate = (openedDate: string | Date | undefined, pao: number | string | undefined): string | null => {
  const d = getExpirationDateObject(openedDate, pao);
  return d ? formatDate(d) : null;
};

/**
 * Calculates expiration date and returns a Date object for comparisons.
 */
export const getExpirationDateObject = (openedDate: string | Date | undefined, pao: number | string | undefined): Date | null => {
  if (!openedDate || !pao) return null;

  const date = parseDate(openedDate);
  if (!date) return null;

  // Clean PAO (remove 'm' if present, convert to number)
  const paoStr = String(pao).replace('m', '');
  const paoMonths = parseInt(paoStr, 10);
  
  if (isNaN(paoMonths)) return null;

  const expirationDate = new Date(date);
  // Strictly add to MONTHS
  expirationDate.setMonth(expirationDate.getMonth() + paoMonths);
  
  return expirationDate;
};
