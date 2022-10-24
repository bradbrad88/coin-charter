export const formatCurrency = (
  number: number,
  locale = "en-au",
  currency = "AUD",
) =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(number);

export const formatPercentage = (number: string | number, decimals = 2) => {
  return parseFloat(number.toString()).toFixed(decimals) + "%";
};
