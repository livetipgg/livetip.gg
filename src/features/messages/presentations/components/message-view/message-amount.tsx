import PaymentIcon from "@/components/payment-icon";
import { formatPayment } from "@/helpers/formatPayment";

interface MessageAmountProps {
  currency: "BRL" | "BTC";
  amount: number;
}

const MessageAmount = ({ currency, amount }: MessageAmountProps) => {
  return (
    <span className="text-success text-2xl font-semibold min-w-fit flex items-center gap-2">
      <PaymentIcon currency={currency} className="h-5 w-5" />
      {formatPayment({ amount, type: currency })}
    </span>
  );
};

export default MessageAmount;
