export const calculateExpirationDate = (openedDate: string | Date | undefined, pao: number | undefined): string | null => {
  if (!openedDate || !pao) return null;

  const date = new Date(openedDate);
  if (isNaN(date.getTime())) return null;

  const expirationDate = new Date(date);
  expirationDate.setMonth(expirationDate.getMonth() + pao);
  
  return expirationDate.toLocaleDateString();
};

export const formatDate = (date: string | Date | undefined): string | null => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString();
};
