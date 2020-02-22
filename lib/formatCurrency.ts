const { format } = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const formatCurrency = (n: number) => {
  const formatted = format(n);
  // get rid of .00
  return formatted.slice(0, formatted.length - 3);
};

export default formatCurrency;
