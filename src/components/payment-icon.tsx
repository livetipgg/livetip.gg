import React from "react";

import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";

interface PaymentIconProps {
  paymentType: "PIX" | "BTC";
  className?: string;
}

const PaymentIcon = ({ paymentType, className }: PaymentIconProps) => {
  const icons = {
    PIX: pixLogo,
    BTC: bitcoinLogo,
  };

  const altText = {
    PIX: "pix",
    BTC: "bitcoin",
  };

  if (!icons[paymentType]) return null;

  return (
    <img
      src={icons[paymentType]}
      alt={altText[paymentType]}
      className={className}
    />
  );
};

export default PaymentIcon;
