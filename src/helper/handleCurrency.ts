export const handleCurrency = (price: number) => {
  const formattedCurrency = new Intl.NumberFormat("id-TD", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  const withoutTrailingZeros = formattedCurrency.replace(/(\.|,)00$/, "");

  return withoutTrailingZeros;
};
