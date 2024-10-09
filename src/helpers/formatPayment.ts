interface IFormatPayment {
  type: "PIX" | "BTC";
  amount: number;
}

export const formatPayment = ({ type, amount }: IFormatPayment) => {
  if (type === "PIX") {
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  if (type === "BTC") {
    const btc = Math.random() * 0.0001;

    return btc
      .toLocaleString("en-US", {
        style: "currency",
        currency: "BTC",
      })
      .replace("BTC", "");
  }
};
