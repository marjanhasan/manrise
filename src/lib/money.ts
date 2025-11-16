export const formatMoneyBDT = (value: number, locale = "en-BD") =>
  new Intl.NumberFormat(locale, { style: "currency", currency: "BDT" }).format(
    value,
  );

export const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));
