export function formatNumber(number: number): string {
  const { format } = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return format(number);
}
