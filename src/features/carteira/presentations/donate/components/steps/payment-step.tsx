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

const PaymentStep = () => {
  const setPaymentDonateState = useSetRecoilState(paymentDonateState);
  const { controller } = useRecoilValue(paymentDonateState);
  const { successSonner } = useCustomSonner();

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
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
