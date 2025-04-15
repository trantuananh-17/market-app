export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
