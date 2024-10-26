import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatTextMaxCaracters } from "@/helpers/formatTextMaxCaracters";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { Label } from "@/components/ui/label";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IPaymentDonateState } from "@/features/carteira/contracts/IRecoilState";
import QRCode from "react-qr-code";
import socket from "@/socket";
import { useEffect } from "react";
import PaymentIcon from "@/components/payment-icon";

import bitcoinLogo from "@/assets/bitcoin-logo.png";

const PaymentStep = () => {
  const setPaymentDonateState = useSetRecoilState(paymentDonateState);
  const { controller, content } = useRecoilValue(paymentDonateState);
  const { successSonner } = useCustomSonner();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Conectado ao servidor WebSocket");
    });

    socket.emit("join_room", {
      room: `payment-confirmation-${content.sender}`,
    });
    socket.on("joined_room", (room) => {
      console.log(`Joined room: ${room}`);
    });
    socket.on("connect_error", (err) => {
      console.error("Erro de conexão:", err);
    });

    socket.on("message", () => {
      setPaymentDonateState((prev: IPaymentDonateState) => ({
        ...prev,
        content: {
          amount: "",
          content: "",
          currency: "BRL",
          sender: "",
        },
        controller: {
          ...prev.controller,
          currentStep: "SUCCESS",
        },
      }));
    });

    return () => {
      socket.off("message");
      socket.off("connect_error");
      socket.off("connect");
      socket.disconnect();
      console.log("Disconnect");
    };
  }, [content.sender, controller.currentStep, setPaymentDonateState]);
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="flex items-center mb-2 gap-2">
          <PaymentIcon currency={content.currency} className="w-6 h-6" />
          <span className="text-lg">
            {content.currency === "BRL" ? "Pix" : "Satoshi"}
          </span>
        </div>
        <QRCode value={controller.qrCode} imageRendering={bitcoinLogo} />
        {content.currency === "BRL" ? (
          <Label className="text-center my-4">Pix Copia e Cola</Label>
        ) : (
          <Label className="text-center my-4">Fatura Lightining</Label>
        )}

        <Input
          type="text"
          value={formatTextMaxCaracters(controller.qrCode, 46)}
        />
        <Button
          className="mt-4 w-full"
          onClick={() => {
            navigator.clipboard.writeText(controller.qrCode);
            successSonner("Código copiado com sucesso!");
          }}
        >
          COPIAR CÓDIGO
        </Button>
      </div>
      <Button
        variant="link"
        className="mt-4 w-full rounded-xl"
        onClick={() => {
          setPaymentDonateState((prev: IPaymentDonateState) => ({
            ...prev,
            content: {
              amount: "",
              content: "",
              currency: "BRL",
              sender: "",
            },
            controller: {
              ...prev.controller,
              currentStep: "MESSAGE",
            },
          }));
        }}
      >
        VOLTAR
      </Button>
    </>
  );
};

export default PaymentStep;
