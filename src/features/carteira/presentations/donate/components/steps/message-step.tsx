/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RefreshCcw, Circle, CircleCheck, LoaderCircle } from "lucide-react";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";
import { IPaymentDonateState } from "@/features/carteira/contracts/IRecoilState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { useSendMessageAndCreateQRCode } from "@/features/carteira/useCases/useSendMessageAndCreateQRCode";
import CurrencyInput from "react-currency-input-field";

const MessageStep = () => {
  const setPaymentDonateState = useSetRecoilState(paymentDonateState);
  const { content, controller } = useRecoilValue(paymentDonateState);
  const { loadingCreateQRCode } = controller;
  const { sendMessageAndCreateQRCode } = useSendMessageAndCreateQRCode();
  const MAX_LENGTH = 300;
  const [dialogPaymentMethodsOpen, setDialogPaymentMethodsOpen] =
    useState(false);

  const handleInputChange = (e: any) => {
    const textarea = e.target;

    setPaymentDonateState((prev: IPaymentDonateState) => ({
      ...prev,
      content: {
        ...prev.content,
        content: e.target.value,
      },
    }));

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Label className="mb-2 text-muted-foreground text-xs">
          Seu nome de usuário
        </Label>
        <Input
          placeholder="Digite seu nome de usuário"
          className="rounded-xl"
          value={content.sender}
          onChange={(e) => {
            setPaymentDonateState((prev: IPaymentDonateState) => ({
              ...prev,
              content: {
                ...prev.content,
                sender: e.target.value,
              },
            }));
          }}
        />
      </div>
      <div className="flex flex-col w-full mt-2">
        <Label className="mb-2 text-muted-foreground text-xs">Mensagem</Label>
        <Textarea
          style={{ resize: "none", overflow: "hidden" }}
          placeholder="Type your message here."
          maxLength={MAX_LENGTH}
          onChange={handleInputChange}
          className="h-auto rounded-xl max-h-60"
          value={content.content}
        />
        <span className="text-muted-foreground text-xs text-right mt-2">
          {content.content.length}/{MAX_LENGTH} caracteres restantes
        </span>
      </div>
      <div className="flex flex-col w-full mt-2">
        <Label className="mb-2 text-muted-foreground text-xs">
          Método de pagamento
        </Label>
        <Dialog
          open={dialogPaymentMethodsOpen}
          onOpenChange={setDialogPaymentMethodsOpen}
        >
          <DialogTrigger asChild>
            <div className="w-full rounded-xl border">
              <div className="flex items-center w-full p-2 justify-between border rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <img
                    className="h-6 w-6 mr-2"
                    src={content.currency === "BRL" ? pixLogo : bitcoinLogo}
                    alt="Payment method logo"
                  />
                  <strong className="text-sm">
                    {
                      controller.paymentMethods.find(
                        (item) => item.id === content.currency
                      )?.name
                    }
                  </strong>
                </div>
                <Button variant="ghost" size="icon">
                  <RefreshCcw size={16} />
                </Button>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Escolha a forma de pagamento:</DialogTitle>
              <DialogDescription>
                Você pode escolher entre PIX ou Bitcoin
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col w-full mt-2 gap-3">
              {controller.paymentMethods.map((paymentMethod) => (
                <div
                  key={paymentMethod.id}
                  onClick={() => {
                    setPaymentDonateState((prev: IPaymentDonateState) => ({
                      ...prev,
                      content: {
                        ...prev.content,
                        currency: paymentMethod.id,
                      },
                    }));
                  }}
                  className={`flex items-center w-full p-2 border-2 justify-between ${
                    paymentMethod.id === content.currency
                      ? "border-success"
                      : "border"
                  } rounded-xl cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    {paymentMethod.id === content.currency ? (
                      <CircleCheck size={24} className="text-success" />
                    ) : (
                      <Circle size={24} />
                    )}
                    <div className="flex flex-col ">
                      <strong>{paymentMethod.name}</strong>
                      <span className="text-muted-foreground text-xs">
                        {paymentMethod.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      className="h-6 w-6 mr-2"
                      src={paymentMethod.icon}
                      alt="Payment method logo"
                    />
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col w-full mt-2">
        <Label className="mb-2 text-muted-foreground text-xs">Valor</Label>
        <CurrencyInput
          className="rounded-xl"
          customInput={Input}
          id="input-example"
          name="input-name"
          placeholder="Please enter a number"
          defaultValue={0.0}
          decimalScale={2}
          decimalsLimit={2}
          value={content.amount}
          intlConfig={{
            locale: "pt-BR",
            currency: "BRL",
          }}
          onValueChange={(e) => {
            setPaymentDonateState((prev: IPaymentDonateState) => ({
              ...prev,
              content: {
                ...prev.content,
                amount: e || "0",
              },
            }));
          }}
        />

        {content.currency === "BRL" && (
          <span className="text-primary font-semibold text-xs text-right mt-2">
            O valor mínimo é de R$ 0,01
          </span>
        )}
        {content.currency === "BTC" && (
          <span className="text-primary font-semibold text-xs text-right mt-2">
            O valor mínimo é de R$ 1,00
          </span>
        )}
      </div>
      <Button
        className="mt-4 w-full rounded-xl"
        onClick={() => sendMessageAndCreateQRCode()}
      >
        {loadingCreateQRCode ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "CONTINUAR"
        )}
      </Button>
    </>
  );
};

export default MessageStep;
