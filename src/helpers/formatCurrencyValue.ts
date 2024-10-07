export const formatCurrencyValue = (value: number | string) => {
  if (!value) return "R$ 0,00";

  if (typeof value === "number") {
    value = value.toString();
  }

  return parseFloat(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
