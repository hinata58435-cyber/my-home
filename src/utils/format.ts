export function formatSAR(value: number): string {
  return new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatSARWithCurrency(value: number): string {
  return `${formatSAR(value)} ر.س`;
}
