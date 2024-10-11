import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";

interface PaymentIconProps {
  currency: "BRL" | "BTC";
  className?: string;
}

const PaymentIcon = ({ currency, className }: PaymentIconProps) => {
  const icons = {
    BRL: pixLogo,
    BTC: bitcoinLogo,
  };

  const altText = {
    BRL: "brl",
    BTC: "bitcoin",
  };

  if (!icons[currency]) return null;

  return (
    <img src={icons[currency]} alt={altText[currency]} className={className} />
  );
};

export default PaymentIcon;
