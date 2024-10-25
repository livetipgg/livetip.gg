interface IFormatPayment {
  type: "BRL" | "BTC";
  amount: number;
}

export const formatPayment = ({ type, amount }: IFormatPayment) => {
  if (type === "BRL") {
    if (typeof amount === "number") {
      return amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    return parseFloat(amount).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  if (type === "BTC") {
    const formattedAmount = amount.toString().split(".")[0] + " SATS";
    return formattedAmount;
  }
};
