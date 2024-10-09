import PaymentIcon from "@/components/payment-icon";
import { formatPayment } from "@/helpers/formatPayment";

interface MessageAmountProps {
  paymentType: "PIX" | "BTC";
  amount: number;
}

const MessageAmount = ({ paymentType, amount }: MessageAmountProps) => {
  return (
    <span className="text-success text-2xl font-semibold min-w-fit flex items-center gap-2">
      <PaymentIcon paymentType={paymentType} className="h-5 w-5" />
      {formatPayment({ amount, type: paymentType })}
    </span>
  );
};

export default MessageAmount;
