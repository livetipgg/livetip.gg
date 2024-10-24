import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatTextMaxCaracters } from "@/helpers/formatTextMaxCaracters";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { Label } from "@/components/ui/label";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IPaymentDonateState } from "@/features/carteira/contracts/IRecoilState";
import QRCode from "react-qr-code";
import socket from "@/socket";
import { useEffect } from "react";

const PaymentStep = () => {
  const setPaymentDonateState = useSetRecoilState(paymentDonateState);
  const { controller, content } = useRecoilValue(paymentDonateState);
  const { successSonner } = useCustomSonner();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Conectado ao servidor WebSocket");

      socket.emit(
        "join_room",
        {
          room: `payment-confirmation-${content.sender}`,
        },
        () => {
          console.log("Room joined successfully");
        }
      );
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
      socket.off(`payment-confirmation-${content.sender}`);
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        {/* Valor */}
        <Label className="text-primary text-xl   font-bold mb-5">
          {content.amount}
        </Label>
        <QRCode value={controller.qrCode} />
        <Label className="text-center my-4">Pix Copia e Cola</Label>
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
        <span className="flex gap-2 items-center mt-4 text-xs text-muted-foreground">
          <InfoCircledIcon />
          Um recibo será exibido após o pagamento.
        </span>
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
